/*
 * Copyright (C) 2009-2015 SAP SE or an SAP affiliate company. All rights reserved.
 */
// Note that this view is hosted by nw.epm.refapps.ext.prod.manage.view.S3_ProductDetail. Thus, it implements the lifecycle methods show and leave
// defined by this view.

/*
<!--                                                                                -->
<!-- Extending S/4HANA with HCP                                                     -->
<!-- * COLLABORATIVE Extension: Creating/Diplaying SAP Jam Group(s) for products    -->
<!-- begin (added MessageBox, Dialog, Button, Text, HBox, Link)                     -->
*/
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"./SubControllerForShare",
	"./messages",
	"./utilities",
	"nw/epm/refapps/ext/prod/manage/model/formatter",
	"sap/m/MessageBox",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/Text",
	"sap/m/HBox",
	"sap/m/Link"
], function(Controller, JSONModel, SubControllerForShare, messages, utilities, formatter, MessageBox, Dialog, Button, Text, HBox, Link) {
/*
<!-- end                                                                            -->
*/
	"use strict";

	return Controller.extend("nw.epm.refapps.ext.prod.manage.controller.ProductDisplay", {
		formatter: formatter,
		// --- Helper attributes that are initialized during onInit and never changed afterwards

		// _oViewProperties: json model used to manipulate declarative attributes of the controls used in this view. Initialized in _initViewPropertiesModel.
		// Contains the attribute dataLoaded which is set to true, as soon as the product is loaded
		// _oView: this view
		// _oApplicationController: the controller of the App
		// _oApplicationProperties: json model containing the App state
		// _oResourceBundle: the resource bundle to retrieve texts from
		// _oHelper: singleton instance of nw.epm.refapps.ext.prod.manage.util.Products used to call backend services
		// _oSubControllerForShare: helper for the share dialog
		// _oShareDialog: dialog for the share button. Initialized on demand.

		// --- attributes describing the current state
		// _sContextPath: Stores the currently requested context path
		// _oProduct: product currently bound to the view, it could be null if the requested product cannot be found any more or we are in the process of loading it
		// _sOldId: Store last retrieved supplier id.  Needed in cases when supplier is shown in display mode, then new supplier in edit mode

		// --- Initialization

		onInit: function() {
			// Gets the application component and the data operation helper instance
			this._oView = this.getView();
			this._initViewPropertiesModel();
			var oComponent = this.getOwnerComponent();
			this._oApplicationProperties = oComponent.getModel("appProperties");
			this._oApplicationController = this._oApplicationProperties.getProperty("/applicationController");
			this._oResourceBundle = oComponent.getModel("i18n").getResourceBundle();
			this._oHelper = this._oApplicationController.getODataHelper();
			this._oSubControllerForShare = new SubControllerForShare(this._oView, this._oResourceBundle);
			this._sContextPath = "";
			this._mSupplierDatas = {};
		},

		_initViewPropertiesModel: function() {
			// The model created here is used to set values or view element properties that cannot be bound
			// directly to the OData service. Setting view element attributes by binding them to a model is preferable to the
			// alternative of getting each view element by its ID and setting the values directly because a JSon model is more
			// robust if the customer removes view elements (see extensibility).
			this._oViewProperties = new JSONModel({
				dataLoaded: false
			});
			this._oView.setModel(this._oViewProperties, "viewProperties");
		},

		// --- Lifecycle methods used by the hosting view

		show: function() {
			var sProductId = this._oApplicationProperties.getProperty("/productId");
			if (!sProductId) {
				return;
			}
			this._oApplicationController.whenMetadataLoaded(this._show.bind(this, sProductId));
			
			/*
			<!--                                                                                -->
			<!-- Extending S/4HANA with HCP                                                     -->
			<!-- * COLLABORATIVE Extension: Creating/Diplaying SAP Jam Group(s) for products    -->
			<!-- begin                                                                          -->
			*/
			// update jam groups info for selected product
			this.triggerGetJamGroupsInfo();
			/*
			<!-- end                                                                            -->
			*/			
		},

		// Note: This function must not be called before the metadata have been read successfully
		_show: function(sProductId) {
			this._sContextPath = this._oHelper.getPathForProductId(sProductId);
			this._oView.bindElement(this._sContextPath);

			// 1. Check whether data is already available locally in the model
			var bProductDataAlreadyRead = this._extractProduct();
			this._oViewProperties.setProperty("/dataLoaded", bProductDataAlreadyRead);
			// 2. If the binding is not set yet, register for the data for the binding are loaded asynchronously.
			if (!bProductDataAlreadyRead) {
				this._oView.getElementBinding().attachEventOnce("dataReceived", this._getBindingDataReceivedHandler(sProductId), this);
			}
		},

		_extractProduct: function() {
			// Helper function for reading the product from the binding context and making sure it is the requested one.
			// Return the information whether a binding context was available.
			var oBindingContext = this._oView.getBindingContext();
			this._oProduct = null;
			if (oBindingContext) {
				if (oBindingContext.getPath() === this._sContextPath) {
					this._oProduct = oBindingContext.getObject();
					this._oApplicationProperties.setProperty("/lastDisplay", this._oProduct.Id);
					this._oApplicationProperties.setProperty("/detailBusyIndicatorDelay", null);
					return true;
				}
			}
			return false; // The requested product is not available in backend
		},

		_getBindingDataReceivedHandler: function(sProductID) {
			return function() {
				if (sProductID !== this._oApplicationProperties.getProperty("/productId") || !this._oView.getElementBinding()) {
					return;
				}
				var bProductDataAlreadyRead = this._extractProduct();
				if (!bProductDataAlreadyRead) {
					// Handles the case that the product cannot be retrieved remotely (such as it was already deleted).
					var sText = this._oResourceBundle.getText("ymsg.productUnavailable", [sProductID]);
					this._oApplicationController.navToEmptyPage(sText);
				}
				this._oViewProperties.setProperty("/dataLoaded", true);
			};
		},

		leave: function() {
			this._oView.unbindElement();
		},

		// --- Event handlers attached declaratively
		// User wants to open the business card of the product supplier
		onSupplierPressed: function(oEvent) {
			if (!this._oSupplierCard) {
				this._initializeSupplierCard();
			}
			this._oSupplierCard.openBy(oEvent.getSource());
		},

		_initializeSupplierCard: function() {
			var oView = this.getView();
			this._oSupplierCard = sap.ui.xmlfragment(oView.getId(), "nw.epm.refapps.ext.prod.manage.view.SupplierCard");
			this._oSupplierCard.bindElement({
				path: "Supplier"
			});
			utilities.attachControlToView(oView, this._oSupplierCard);
		},

		onCopyPressed: function() {
			this._oHelper.copyProductToDraft(this._oApplicationProperties.getProperty("/productId"), this._oApplicationController.navToProductEditPage
				.bind(
					this._oApplicationController));
		},

		onEditPressed: function() {
			this._oHelper.getProductDraftFromProductId(this._oApplicationProperties.getProperty("/productId"), this._oApplicationController.navToProductEditPage
				.bind(this._oApplicationController));
		},

		onDeletePressed: function() {
			this._oHelper.deleteProduct(this._sContextPath);
		},

		onSharePressed: function(oEvent) {
			this._oSubControllerForShare.openDialog(oEvent);
		},

		onNavButtonPress: function() {
			// Handler for the nav button of the page. It is attached declaratively. Note that it is only available on phone
			this._oApplicationController.navBack(true);
			this._oView.unbindElement();
		}

		/*
		<!--                                                                                -->
		<!-- Extending S/4HANA with HCP                                                     -->
		<!-- * COLLABORATIVE Extension: Creating/Diplaying SAP Jam Group(s) for products    -->
		<!-- begin                                                                          -->
		*/
		//
		// Create Jam Groups based on the selected product
		//
		,
		_initJamConfig: function(){
			// config params to make use of SAP Jam OData APIs
			this._extApplicationName = "EpmRefAppsShopSrv";
			var accountName = window.location.host.split("-")[1].split(".")[0];
			this._epmRefShopServiceUrl = "https://" + "gwaas-" + accountName + ".hanatrial.ondemand.com/odata/SAP/EPM_REF_APPS_SHOP_SRV";
			this._epmRefShopServiceUrl443 = "https://" + "gwaas-" + accountName + ".hanatrial.ondemand.com:443/odata/SAP/EPM_REF_APPS_SHOP_SRV";
			this._sapjamOdataServiceBaseUrl = "https://" + "developer.sapjam.com/api/v1/OData";
			this._sapjamGroupOverviewBaseUrl = "https://" + "developer.sapjam.com/groups/about_page/";
		},

		_initCreateJamGroupDialogModel: function() {
			this._initJamConfig();
			// Jam JSON Model
			this._oDialogModel = new JSONModel({
				dialogBusy : true,
				error : {
					isVisible : false,
					msgText : ""
				},
				responseMsg : "",
				selProductId : "",
				selProductName : "",
				groupName : "",
				templates : [],
				selTemplateId : "",
				businessRecordName : "",
				businessRecordId : "",
				memberSelf : {},
				members : [],
				membersWarning : {
					isVisible : false,
					msgText : ""
				},
				membersSearchQueryCnt : 0,
				isInvitationSucceeded: false
			});
			this._oView.setModel(this._oDialogModel, "createJamGroupDialogModel");
		},

		openCreateJamGroupDialog: function () {
			// initialization
			this._membersSearchQueryCntMax = 26;
			this._initCreateJamGroupDialogModel();
			// create value help dialog
			if (!this._createJamGroupDialog) {
				this._createJamGroupDialog = sap.ui.xmlfragment(
					"nw.epm.refapps.ext.prod.manage.view.Dialog",
					this
				);
				this.getView().addDependent(this._createJamGroupDialog);
				this._createJamGroupDialog.setModel(this.getView().getModel("createJamGroupDialogModel"));
			}
			this._createJamGroupDialog.open();
		},

		afterOpenCreateJamGroupDialog: function(){
			this._getMembersList(true);
			// BusinessRecords (synonym for technical term 'External Application') name is passed
			this._getBusinessRecordId(this._extApplicationName);
		},

		closeJamGroupDialog: function(){
			this._initCreateJamGroupDialogModel();
			this._createJamGroupDialog.close();
		},

		//
		// members handling
		//
		_getMembersList: function (bUseCachedViewModelList) {
			var oDialogModel = this.getView().getModel("createJamGroupDialogModel");
			var oMembersArr = oDialogModel.getProperty("/members");
			if(bUseCachedViewModelList){
				if( oMembersArr.length<1){
					this._requestMembersList();
				}
			} else{
				if(oMembersArr.length>0){
					var data = oDialogModel.getData();
					data.members = [];
					oDialogModel.setData(data);
					oDialogModel.setProperty("/membersSearchQueryCnt", 0);
					this._requestMembersList();
				}
			}
		},

		_requestMembersList: function () {
			this._requestSelfMember();
		},

		_requestSelfMember: function(){
			var oSapJamModel = this.getView().getModel("SapJamModel");
			oSapJamModel.setUseBatch(false);
			oSapJamModel.read("/Self", {
				success: this._onRequestSelfMemberSuccess.bind(this),
				error: this._onRequestSelfMemberError.bind(this)
			});
		},

		_onRequestSelfMemberSuccess: function(oData){
			var oDialogModel = this.getView().getModel("createJamGroupDialogModel");
			var data = oDialogModel.getData();
			data.memberSelf = {
				id: oData.Id,
				email: oData.Email,
				dispName: oData.FullName,
				tooltip: oData.Email
			};
			oDialogModel.setData(data);
			// request non-self members
			this._requestNonSelfMembers();
		},

		_onRequestSelfMemberError: function(oError){
			var oDialogModel = this.getView().getModel("createJamGroupDialogModel");
			// error log
			try {
					jQuery.sap.log.error(
						"Error occured in _onRequestSelfMember(). Error message: " +
						JSON.parse(oError.message)
					);
			}
			catch (e) {
				jQuery.sap.log.error("JSON.parse(error.message) failed in _onRequestSelfMemberError");
			}
			// error ui
			var errorMsgText =
				"Error occured. More information has been logged in the browser console";
			oDialogModel.setProperty("/error/msgText", errorMsgText);
			oDialogModel.setProperty("/error/isVisible", true);
			oDialogModel.setProperty("/dialogBusy", false);
		},

		_requestNonSelfMembers: function(){
			var oSapJamModel = this.getView().getModel("SapJamModel");
			oSapJamModel.setUseBatch(false);
			for (var i = 0; i < this._membersSearchQueryCntMax; i++) {
				var query = "'" + String.fromCharCode(i+97) + "'";
				oSapJamModel.read("/Members_Autocomplete", {
					urlParameters: {
						Query: query
					},
					success: this._onRequestNonSelfMembersSuccess.bind(this),
					error: this._onRequestNonSelfMembersError.bind(this)
				});
			}
		},

		_onRequestNonSelfMembersSuccess: function (oData) {
			var oMembersArr = oData.results;
			var oDialogModel = this.getView().getModel("createJamGroupDialogModel");
			var data = oDialogModel.getData();
		 
			for (var i = 0; i < oMembersArr.length; i++) {
				if(!this._isDuplicateMember(oMembersArr[i].Id) && !(data.memberSelf.id === oMembersArr[i].Id) ){
					data.members.push({
						id: oMembersArr[i].Id,
						email: oMembersArr[i].Email,
						dispName: oMembersArr[i].FullName,
						tooltip: oMembersArr[i].Email
					});
				}
			}
			oDialogModel.setData(data);
			oDialogModel.setProperty("/membersSearchQueryCnt", parseInt(oDialogModel.getProperty("/membersSearchQueryCnt")) + 1);
			if(oDialogModel.getProperty("/membersSearchQueryCnt") === this._membersSearchQueryCntMax){
				// no members found info
				if(data.members.length === 0){
					var warningMsgText = "No Jam members found for invitation. Contact SAP Jam service owner if members should be available";
					oDialogModel.setProperty("/membersWarning/msgText", warningMsgText);
					oDialogModel.setProperty("/membersWarning/isVisible", true);
				}
				if(oDialogModel.getProperty("/selTemplateId") !== ""){
					oDialogModel.setProperty("/dialogBusy", false);
				}
			}
		},

		_isDuplicateMember: function (memberId) {
			var oDialogModel = this.getView().getModel("createJamGroupDialogModel");
			var oMembersArr = oDialogModel.getData().members;
			 
			for (var i = 0; i < oMembersArr.length; i++) {
				if(oMembersArr[i].id === memberId){
					return true;
				}
			}
			return false;
		},

		_onRequestNonSelfMembersError: function (oError) {
			var oDialogModel = this.getView().getModel("createJamGroupDialogModel");
			// error log
			try {
					jQuery.sap.log.error(
						"Error occured in _onRequestNonSelfMembers(). Error message: " +
						JSON.parse(oError.message)
					);
			}
			catch (e) {
				jQuery.sap.log.error("JSON.parse(error.message) failed in _onRequestNonSelfMembersError");
			}
			// error ui
			var errorMsgText =
				"Error occured. More information has been logged in the browser console";
			oDialogModel.setProperty("/error/msgText", errorMsgText);
			oDialogModel.setProperty("/error/isVisible", true);
			oDialogModel.setProperty("/dialogBusy", false);
		},

		//
		// templates handling
		// - 1. BusinessRecord  : get 'Id' for a given 'Name'
		// - 2. Custom Templates: get available templates for given Business Record Id
		//
		// 1. BusinessRecord
		//
		_getBusinessRecordId: function (sBusinessRecordName) {
			var oSapJamModel = this.getView().getModel("SapJamModel");
			var oDialogModel = this.getView().getModel("createJamGroupDialogModel");
			oDialogModel.setProperty("/businessRecordName", sBusinessRecordName);
			// get external applications (synonym for SAP Jam Business Records) to get an external application Id for a given name
			oSapJamModel.read("/ExternalApplications", {
				success: this._onGetBusinessRecordIdSuccess.bind(this),
				error: this._onGetBusinessRecordIdError.bind(this)
			});
		},

		_onGetBusinessRecordIdSuccess: function (oData) {
			var oDialogModel = this.getView().getModel("createJamGroupDialogModel");
			var oBusinessRecordsArr = oData.results;
			var sBusinessRecordName = oDialogModel.getProperty("/businessRecordName");
			var sBusinessRecordId = "";
			for (var i = 0; i < oBusinessRecordsArr.length; i++) {
				if(sBusinessRecordName === oBusinessRecordsArr[i].Name){
					sBusinessRecordId = oBusinessRecordsArr[i].Id;
					//oDialogModel.setProperty("/businessRecordId", oBusinessRecordsArr[i].Id);
					break;
				}
			}
			if(sBusinessRecordId!==""){
				var productId = this._oApplicationProperties.getProperty("/productId");
				var productName = this.getView().getModel().oData["Products('" + productId + "')"].Name;
				oDialogModel.setProperty("/selProductId", productId);
				oDialogModel.setProperty("/selProductName", productName);
				this._getCustomTemplates(sBusinessRecordId);
			} else{
				jQuery.sap.log.error("Error, no valid Id found for BusinessRecord Name '" + sBusinessRecordName + "'");
				this._onGetBusinessRecordIdError(null);
			}
		},

		_onGetBusinessRecordIdError: function (oError) {
			var oDialogModel = this.getView().getModel("createJamGroupDialogModel");
			// error log
			try {
					jQuery.sap.log.error(
						"Error occured in _onGetBusinessRecordId(). Error message: " +
						JSON.parse(oError.message)
					);
			}
			catch (e) {
				jQuery.sap.log.error("JSON.parse(error.message) failed in _onGetBusinessRecordIdError");
			}
			// error ui
			var errorMsgText =
				"Error occured while trying to access External Application '" + this._extApplicationName
				+ "' of your SAP Jam service instance." +
				"Please contact SAP Jam service owner and check if this external Application exists.";
			oDialogModel.setProperty("/error/msgText", errorMsgText);
			oDialogModel.setProperty("/error/isVisible", true);
			oDialogModel.setProperty("/dialogBusy", false);
		},

		//
		// 2. Custom Templates
		//
		_getCustomTemplates: function (sBusinessRecordId) {
			var oSapJamModel = this.getView().getModel("SapJamModel");
			oSapJamModel.read("/ExternalApplications('" + sBusinessRecordId + "')/ExternalObjectTypes", {
				urlParameters: {
					$expand: "Templates"
				},
				success: this._getCustomTemplatesSuccess.bind(this),
				error: this._getCustomTemplatesError.bind(this)
			});
		},

		_getCustomTemplatesSuccess: function (oData) {
			var oDialogModel = this.getView().getModel("createJamGroupDialogModel");
			var data = oDialogModel.getData();
			//data.templates.splice(0);
		 
			var oBusinessRecordsTypesArr = oData.results;
			var sBusinessRecordsTypeName = "Products";
			for (var i = 0; i < oBusinessRecordsTypesArr.length; i++) {
				if(sBusinessRecordsTypeName === oBusinessRecordsTypesArr[i].Name){
					var oTemplatesArr = oBusinessRecordsTypesArr[i].Templates.results;
					for (var j = 0; j < oTemplatesArr.length; j++) {
						data.templates.push({
							Id: oTemplatesArr[j].Id,
							Name: oTemplatesArr[j].Title
						});
						if(j === 0){
							oDialogModel.setProperty("/selTemplateId", oTemplatesArr[j].Id);
						}
					}
				}
			}
			oDialogModel.setData(data);
			// check if member calls have already been finished
			if(oDialogModel.getProperty("/membersSearchQueryCnt") === this._membersSearchQueryCntMax){
				oDialogModel.setProperty("/dialogBusy", false);
			}
			// handle empty templates error case
			if(oDialogModel.getProperty("/selTemplateId") === ""){
				var errorMsgText = "No group templates found.";
				//"\n\nTo enable or create a group template contact the SAP Jam service owner";
				oDialogModel.setProperty("/error/msgText", errorMsgText);
				oDialogModel.setProperty("/error/isVisible", true);
				oDialogModel.setProperty("/dialogBusy", false);
			}
		},

		_getCustomTemplatesError: function (oError) {
			var oDialogModel = this.getView().getModel("createJamGroupDialogModel");
			// error log
			try {
					jQuery.sap.log.error(
						"Error occured in _getCustomTemplates(). Error message: " +
						JSON.parse(oError.message)
					);
			}
			catch (e) {
				jQuery.sap.log.error("JSON.parse(error.message) failed in _getCustomTemplatesError");
			}
			// error ui
			var errorMsgText =
				"Error occured when retrieving custom templates for selected product.\n" +
				"Please contact SAP Jam service owner and check if custom templates for External Application Type Products exist";
			oDialogModel.setProperty("/error/msgText", errorMsgText);
			oDialogModel.setProperty("/error/isVisible", true);
			oDialogModel.setProperty("/dialogBusy", false);
		},

		onLiveChangeNameInput: function(oEvt){
			var oSource = oEvt.getSource();
			var oCreateBtn = sap.ui.getCore().byId("createBtnId");
			if(oSource.getValue()===""){
				oSource.setValueStateText("Group name must not be empty.").setValueState("Error");
				oCreateBtn.setEnabled(false);
			} else{
				oSource.setValueState("None");
				oCreateBtn.setEnabled(true);
			}
		},

		onPressCreateBtn: function(){
			var oSapJamModel = this.getView().getModel("SapJamModel");
			var oDialogModel = this.getView().getModel("createJamGroupDialogModel");
			oDialogModel.setProperty("/error/isVisible", false);
			oDialogModel.setProperty("/error/msgText", "");
			oDialogModel.setProperty("/dialogBusy", true);
			var groupName = oDialogModel.getProperty("/groupName");
			var selTemplateId = oDialogModel.getProperty("/selTemplateId");
			var productId = oDialogModel.getProperty("/selProductId");
			var productName = oDialogModel.getProperty("/selProductName");
 
			var oData = {
				"Name" : groupName,
				"Template" : {
					"__metadata" : {
						"uri" : this._sapjamOdataServiceBaseUrl + "/GroupTemplates(Id='" + selTemplateId + "',GroupTemplateType='custom')"
					}
				},
				"PrimaryExternalObject" : {
					"__metadata" : {
						"uri" : "Groups('0')/PrimaryExternalObject",
						"type": "SAPJam.ExternalObject"
					},
					"Exid" : this._epmRefShopServiceUrl + "/Products('" + productId + "')",
					"Name" : productName,
					"Summary" : null,
					"Permalink" : null,
					"ODataMetadata" : this._epmRefShopServiceUrl + "/$metadata#Products",
					"ODataLink" : this._epmRefShopServiceUrl + "/Products('" + productId + "')",
					"ObjectType" : this._epmRefShopServiceUrl + "/$metadata#Products"
				}
			};
			oSapJamModel.setUseBatch(false);
			oSapJamModel.create("/Groups", oData, {
				success: this._onCreateSuccess.bind(this),
				error: this._onCreateError.bind(this)
			});
		},

		_onCreateSuccess: function (oData) {
			var createdGroupId = oData.Id;
			var sEmailsStr = this._getSelUserEmailsString();
			// console.log(this._getSelUserEmailsString());
			// check if users were selected for e-mail invitation
			if(sEmailsStr!==""){
				// invite users
				var oSapJamModel = this.getView().getModel("SapJamModel");
				 
				var postBody = {
					Id: "'" + createdGroupId + "'",
					Email: sEmailsStr
				};
				oSapJamModel.setUseBatch(false);
				oSapJamModel.create("/Group_Invite", {}, {
					urlParameters: postBody,
					success: this._onUsersInviteSuccess.bind(this),
					error: this._onUsersInviteError.bind(this)
				});
			} else{
				this._triggerSuccessMsgWithLink();
			}
		},

		_onCreateError: function (oError) {
			var oDialogModel = this.getView().getModel("createJamGroupDialogModel");
			// error ui
			var msgBeginText = "Error occured while creating SAP Jam Group. ";
			try {
				// concrete error handling: group name already exists
				var sNameAlreadyExistsMsg = "Name has already been taken.";
				if( JSON.parse(oError.responseText).error.message.value === sNameAlreadyExistsMsg){
					oDialogModel.setProperty(
						"/error/msgText", sNameAlreadyExistsMsg
					);
					sap.ui.getCore().byId("groupNameInputId").setValueStateText("Choose another non-existing group name").setValueState("Error");
				}else{
					// general error handling
					oDialogModel.setProperty(
						"/error/msgText",
						msgBeginText + JSON.parse(oError.responseText)
					);
				}
			}
			catch (e) {
				// error log
				oDialogModel.setProperty(
					"/error/msgText",
					"Error occured while creating SAP Jam Group. Details logged to browser console");
				jQuery.sap.log.error("JSON.parse(oError.message) failed in _onCreateError");
			}
			oDialogModel.setProperty("/error/isVisible", true);
			oDialogModel.setProperty("/dialogBusy", false);
		},

		_getSelUserEmailsString: function (){
			var oInviteUsersList = sap.ui.getCore().byId("inviteUsersListId");
			var oSelUsersArr = oInviteUsersList.getSelectedItems();
			var sEmailsStr =  "";
			for (var i = 0; i < oSelUsersArr.length; i++) {
				if(sEmailsStr!==""){
					sEmailsStr += ",";
				}
				sEmailsStr += oSelUsersArr[i].getTooltip();
			}
			// escape non-empty email string
			sEmailsStr = (sEmailsStr==="")? "" : "'" + sEmailsStr + "'";
			return sEmailsStr;
		},

		_onUsersInviteSuccess: function () {
			// display creation and invitation success message
			var oDialogModel = this.getView().getModel("createJamGroupDialogModel");
			oDialogModel.setProperty("/isInvitationSucceeded", true);
			this._triggerSuccessMsgWithLink();
		},

		_onUsersInviteError: function (oError) {
			var oDialogModel = this.getView().getModel("createJamGroupDialogModel");
			oDialogModel.setProperty("/isInvitationSucceeded", false);
			// error log
			try {
					jQuery.sap.log.error(
						"Error occured in _onUsersInvite(). Error message: " +
						JSON.parse(oError.message)
					);
			}
			catch (e) {
				jQuery.sap.log.error("JSON.parse(oError.message) failed in _onUsersInviteError()");
			}
		},

		_triggerSuccessMsgWithLink: function(){
			var oSapJamModel = this.getView().getModel("SapJamModel");
			oSapJamModel.read("/Groups", {
				success: this._onGetGroupsSuccess.bind(this),
				error: this._onGetGroupsError.bind(this)
			});
		},

		_onGetGroupsSuccess: function (oData) {
			var oGroupsArr = oData.results;
			var oDialogModel = this.getView().getModel("createJamGroupDialogModel");
			var createdGroupName = oDialogModel.getProperty("/groupName");
			var createdGroupId = "";
			for (var i = 0; i < oGroupsArr.length; i++) {
				if(createdGroupName===oGroupsArr[i].Name){
					createdGroupId = oGroupsArr[i].Id;
					break;
				}
			}
			this._onJamGroupCreationSuccess(createdGroupName, createdGroupId);
		},

		_onGetGroupsError: function (oError) {
			// error log
			try {
					jQuery.sap.log.error(
						"Error occured in _onGetGroups(). Error message: " +
						JSON.parse(oError.message)
					);
			}
			catch (e) {
				jQuery.sap.log.error("JSON.parse(oError.message) failed in _onGetGroupsError()");
			}
		},
 
		_onJamGroupCreationSuccess: function( groupName, groupId ){
			// update jam groups info for selected product
			this.triggerGetJamGroupsInfo();

			var oDialogModel = this.getView().getModel("createJamGroupDialogModel");
			var bIsInvitationSucceeded = oDialogModel.getProperty("/isInvitationSucceeded");
			this.closeJamGroupDialog();
			//MessageBox.information("successMsg");
			var successBeginMsg =  "Successfully created ";
			var successLinkText = "SAP Jam Group '" + groupName + "'";
			var successEndMsg =  "";
			if(bIsInvitationSucceeded){
				successEndMsg =  " and invited the selected users by email.";
			}
			// dialog
			var dialog = new Dialog({
				title : "Information",
				icon : "sap-icon://message-information",
				content : new HBox({
					items :  [
						new Text({
							text: successBeginMsg
						}).addStyleClass("sapUiSmallMarginTopBottom")
						.addStyleClass("sapUiSmallMarginBegin")
						.addStyleClass("sapUiTinyMarginEnd"),
						new Link({
							text: successLinkText,
							target: "_blank",
							href: this._sapjamGroupOverviewBaseUrl + groupId
						}).addStyleClass("sapUiSmallMarginTopBottom")
						.addStyleClass("sapUiTinyMarginEnd"),
						new Text({
							text: successEndMsg
						}).addStyleClass("sapUiSmallMarginTopBottom")
						.addStyleClass("sapUiSmallMarginEnd")
					]
				}),
				beginButton: new Button({
					text: "OK",
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			}).addStyleClass("mysapUiIcon");

			//to get access to the global model
			this.getView().addDependent(dialog);
			dialog.open();
		},

		//
		// formatters
		//
		isMembersInfoMsgNotVisible: function(sMembersInfoMsgIsVisible) {
			return !sMembersInfoMsgIsVisible;
		},

		//
		// Display Jam Groups related to selected product
		//
		_initDisplayJamGroupsDialogModel: function() {
			this._initJamConfig();
			// Jam JSON Model
			this._oDisplayDialogModel = new JSONModel({
				dialogBusy : true,
				availGroups : [],
				info : {
					isVisible : false,
					msgText : "No SAP Jam Groups found for selected product. Use 'New Jam Group' button to create one"
				}
			});
			this._oView.setModel(this._oDisplayDialogModel, "displayJamGroupsDialogModel");
		},

		triggerGetJamGroupsInfo: function () {
			// update jam groups info for selected product
			this._initDisplayJamGroupsDialogModel();
			this._getJamGroupsOfSelProduct();
		},

		openDisplayJamGroupsDialog: function () {
			// initialization
			this._initDisplayJamGroupsDialogModel();
			// create value help dialog
			if (!this._displayJamGroupDialog) {
				this._displayJamGroupDialog = sap.ui.xmlfragment(
					"nw.epm.refapps.ext.prod.manage.view.DialogDisplayJamGroups",
					this
				);
				this.getView().addDependent(this._displayJamGroupDialog);
				this._displayJamGroupDialog.setModel(this.getView().getModel("displayJamGroupsDialogModel"));
			}
			this._displayJamGroupDialog.open();
		},

		afterOpenDisplayJamGroupsDialog: function(){
			this._getJamGroupsOfSelProduct();
		},

		closeDisplayJamGroupsDialog: function(){
			//this._initDisplayJamGroupsDialogModel();
			this._displayJamGroupDialog.close();
		},
 
		openCreateJamGroupAfterClose: function(){
			this.closeDisplayJamGroupsDialog();
			this.openCreateJamGroupDialog();
		},
 
		_getJamGroupsOfSelProduct: function(){
			var oSapJamModel = this.getView().getModel("SapJamModel");
			// input productId (e.g. HT-1001), output ExtObjId as used in SAP Jam (e.g. "8LCz3jsnC9ooOeNxdXNbDy")
			oSapJamModel.read("/Groups", {
				urlParameters: {
					$expand: "PrimaryExternalObject"
				},
				success: this._onGetJamGroupsSuccess.bind(this),
				error: this._onGetJamGroupsError.bind(this)
			});
		},

		_onGetJamGroupsSuccess: function (oData) {
			var oAvailGroupsArr = oData.results;
			var oDialogModel = this.getView().getModel("displayJamGroupsDialogModel");
			var data = oDialogModel.getData();

			var productId = this._oApplicationProperties.getProperty("/productId");
			var objectType =  this._epmRefShopServiceUrl + "/$metadata#Products";
			var exid = this._epmRefShopServiceUrl + "/Products('" + productId + "')";
			var exid443 = this._epmRefShopServiceUrl443 + "/Products('" + productId + "')"; // in jam instance created

			for (var i = 0; i < oAvailGroupsArr.length; i++) {
				if( oAvailGroupsArr[i].PrimaryExternalObject !== null && 
					oAvailGroupsArr[i].PrimaryExternalObject.ObjectType === objectType &&
					( oAvailGroupsArr[i].PrimaryExternalObject.Exid === exid || oAvailGroupsArr[i].PrimaryExternalObject.Exid === exid443 ) ){
					data.availGroups.push({
						id: oAvailGroupsArr[i].Id,
						name: oAvailGroupsArr[i].Name,
						type: oAvailGroupsArr[i].GroupType
					});
				}
			}
			oDialogModel.setData(data);
			if(data.availGroups.length === 0){
				oDialogModel.setProperty("/info/isVisible", true);
			}
			oDialogModel.setProperty("/dialogBusy", false);
		},

		_onGetJamGroupsError: function (oError) {
			var oDialogModel = this.getView().getModel("displayJamGroupsDialogModel");
			oDialogModel.setProperty("/info/isVisible", true);
			oDialogModel.setProperty("/dialogBusy", false);
			jQuery.sap.log.error(oError.message + " " + oError.statusCode + " " + oError.statusText + ": ", oError.responseText);
		},

		//
		// formatters
		//
		formatTest: function (sTestStr){
			return sTestStr;
		},

		isGroupAvaiableFormatter: function (availGroupsFirstId){
			return (availGroupsFirstId === undefined)? false : true;
		},

		isGroupNotAvaiableFormatter: function (availGroupsFirstId){
			return !this.isGroupAvaiableFormatter(availGroupsFirstId);
		},

		groupTypeIconFormatter: function(sType) {
			switch (sType) {
				case "private_internal":
					return "sap-icon://locked";
				case "private_external":
					return "sap-icon://visits";
				case "public_internal":
					return "sap-icon://globe";
				default:
					return "";
			}
		},

		groupTypeIconTooltipFormatter: function(sType) {
			switch (sType) {
				case "private_internal":
					return "Private Jam Group";
				case "private_external":
					return "Private Jam Group";
				case "public_internal":
					return "Public Jam Group";
				default:
					return "";
			}
		},

		groupUrlFormatter: function(sId) {
			return this._sapjamGroupOverviewBaseUrl + sId;
		},

		isInfoMsgVisible: function(sInfoMsgIsVisible) {
			return sInfoMsgIsVisible;
		},

		isInfoMsgNotVisible: function(sInfoMsgIsVisible) {
			return !sInfoMsgIsVisible;
		},

		getTextForLinkFormatter: function() {
			var oDialogModel = this.getView().getModel("displayJamGroupsDialogModel");
			return "(" + oDialogModel.getData().availGroups.length + ")";
		}

		/*
		<!-- end                                                                            -->
		*/

	});
});