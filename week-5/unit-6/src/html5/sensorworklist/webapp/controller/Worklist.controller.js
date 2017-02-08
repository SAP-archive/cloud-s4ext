sap.ui.define(
	[
		"com/acme/s4ext/sensorworklist/controller/BaseController",
		"com/acme/s4ext/sensorworklist/model/formatter",
		"sap/m/MessageBox",
		"sap/m/MessageToast",
		"sap/ui/core/routing/History",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"sap/ui/model/json/JSONModel",
		"sap/ui/model/Sorter"
	], 
	function (
		BaseController, 
		formatter, 
		MessageBox, 
		MessageToast, 
		History, 
		Filter, 
		FilterOperator, 
		JSONModel, 
		Sorter) {
		"use strict";

		return BaseController.extend("com.acme.s4ext.sensorworklist.controller.Worklist", {

			formatter: formatter,

			/* =========================================================== */
			/* lifecycle methods                                           */
			/* =========================================================== */

			/**
			 * Called when the worklist controller is instantiated.
			 * @public
			 */
			onInit : function () {
				var oViewModel,
					iOriginalBusyDelay,
					oTable = this.byId("table-id");

				// Put down worklist table's original value for busy indicator delay,
				// so it can be restored later on. Busy handling on the table is
				// taken care of by the table itself.
				iOriginalBusyDelay = oTable.getBusyIndicatorDelay();

				// Model used to manipulate control states
				oViewModel = new JSONModel({
					worklistTableTitle : this.getResourceBundle().getText("worklistTableTitle"),
					saveAsTileTitle: this.getResourceBundle().getText("worklistViewTitle"),
					shareOnJamTitle: this.getResourceBundle().getText("worklistViewTitle"),
					tableNoDataText : this.getResourceBundle().getText("tableNoDataText"),
					tableBusyDelay : 0
				});
				this.setModel(oViewModel, "worklistView");

				// Make sure, busy indication is showing immediately so there is no
				// break after the busy indication for loading the view's meta data is
				// ended (see promise 'oWhenMetadataIsLoaded' in AppController)
				oTable.attachEventOnce("updateFinished", function(){
					// Restore original busy indicator delay for worklist's table
					oViewModel.setProperty("/tableBusyDelay", iOriginalBusyDelay);
				});
			},

			/* =========================================================== */
			/* event handlers                                              */
			/* =========================================================== */

			/**
			 * Triggered by the table's 'updateFinished' event: after new table
			 * data is available, this handler method updates the table counter.
			 * This should only happen if the update was successful, which is
			 * why this handler is attached to 'updateFinished' and not to the
			 * table's list binding's 'dataReceived' method.
			 * @param {sap.ui.base.Event} oEvent the update finished event
			 * @public
			 */
			onUpdateFinished : function (oEvent) {
				// update the worklist's object counter after the table update
				var sTitle;
				var oTable = oEvent.getSource();
				var iTotalItems = oEvent.getParameter("total");
				var oViewModel = this.getModel("worklistView");

				// only update the counter if the length is final and
				// the table is not empty
				if (iTotalItems && oTable.getBinding("items").isLengthFinal()) {
					sTitle = this.getResourceBundle().getText("worklistTableTitleCount", [iTotalItems]);
				} else {
					sTitle = this.getResourceBundle().getText("worklistTableTitle");
				}
				oViewModel.setProperty("/worklistTableTitle", sTitle);
			},

			/**
			 * Event handler when a table item gets pressed
			 * @param {sap.ui.base.Event} oEvent the table selectionChange event
			 * @public
			 */
			onPressColumnListItem : function (oEvent) {
				// The source is the list item that got pressed
				this._showObject(oEvent.getSource());
			},


			/**
			 * Event handler for navigating back.
			 * We navigate back in the browser history
			 * @public
			 */
			onNavBack: function () {
				var oHistory = History.getInstance();
				var sPreviousHash = oHistory.getPreviousHash();

				if (sPreviousHash !== undefined) {
					window.history.go(-1);
				} else {
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("worklist", true);
				}
			},

			onSearch : function (oEvent) {
				if (oEvent.getParameters().refreshButtonPressed) {
					// Search field's 'refresh' button has been pressed.
					// This is visible if you select any master list item.
					// In this case no new search is triggered, we only
					// refresh the list binding.
					this.onRefresh();
				} else {
					var oTableSearchState = [new Filter("IsRegistered", FilterOperator.EQ, 1)];
					var sQuery = oEvent.getParameter("query");

					if (sQuery && sQuery.length > 0) {
						oTableSearchState.push(new Filter([	new Filter("GDeviceName", FilterOperator.Contains, sQuery),
															new Filter("EquipmentKey", FilterOperator.Contains, sQuery),
															new Filter("ProductName", FilterOperator.Contains, sQuery), 
															new Filter("SoId", FilterOperator.Contains, sQuery)],
															false)
														);
					}
					this._applySearch(oTableSearchState);
				}

			},

			onPressRefreshBtn : function(){
				var that = this;
				var oViewModel = this.getModel();
				var oFilters = [
						new Filter({
							path : "IsRegistered",
							operator : FilterOperator.EQ,
							value1 : "1",
							and : true
						})
					];

				this.getView().setBusy(true);
				oViewModel.read( 
					"/Equipments", 
					{
						success: function (oData) {
							that.getView().setBusy(false);
							oViewModel.refresh(true);
							MessageToast.show("Successfully refreshed data and updated worklist");
						},
						error: function(oError) {
							jQuery.sap.log.error(oError.message + " " + oError.statusCode + " " + oError.statusText + ": ", oError.responseText);
							MessageBox.alert("Error occured while retrieving backend data. Check web browser console for details", {
								onClose : function() {
									that.getView().setBusy(false);
								}
							});
						},
						filters: oFilters
					}
				);
			},

			/**
			 * Event handler for refresh event. Keeps filter, sort
			 * and group settings and refreshes the list binding.
			 * @public
			 */
			onRefresh : function () {
				var oTable = this.byId("table-id");
				oTable.getBinding("items").refresh();
			},

			/**
			* Opens the QR code popover at the sales order id
			* @public
			* @param {sap.ui.base.Event} oEvent the title press event
			*/
			onTitlePressOpenQRCodePopover: function(oEvent) {
				var oPopover = this._getPopover(),
					oOpener = oEvent.getParameter("domRef");
				
					oPopover.bindElement(oEvent.getSource().getBindingContext().getPath());
					oPopover.openBy(oOpener);
			},

			/* =========================================================== */
			/* internal methods                                            */
			/* =========================================================== */
			/**
			 * Get the instance of the popover
			 */
			_getPopover : function() {
				if(!this._oPopover) {
					this._oPopover = sap.ui.xmlfragment("com.acme.s4ext.sensorworklist.view.QrCodePopover", this);
					this.getView().addDependent(this._oPopover);
				}
				return this._oPopover;
			},
			
			/**
			 * Shows the selected item on the object page
			 * On phones a additional history entry is created
			 * @param {sap.m.ObjectListItem} oItem selected Item
			 * @private
			 */
			_showObject : function (oItem) {
				this.getRouter().navTo("object", {
					objectId: oItem.getBindingContext().getProperty("EquipmentKey")
				});
			},

			/**
			 * Internal helper method to apply both filter and search state together on the list binding
			 * @param {object} oTableSearchState an array of filters for the search
			 * @private
			 */
			_applySearch: function(oTableSearchState) {
				var oViewModel = this.getModel("worklistView");
				var oTable = this.byId("table-id");
				oTable.getBinding("items").filter(oTableSearchState, "Application");
				// changes the noDataText of the list in case there are no filter results
				if (oTableSearchState.length !== 0) {
					oViewModel.setProperty("/tableNoDataText", this.getResourceBundle().getText("worklistNoDataWithSearchText"));
				}
			},

			onAddDeviceSensorRegistration : function () {
				this._initializeWizardViewJsonModel("", "");
				var oDialog = this._getRegDlg();
				oDialog.open();
			},

			beforeOpenRegDlg : function(){
				//
				// registration wizard part
				//
				this._wizard = sap.ui.getCore().byId("wiz-id");//this.getView().byId("wiz-id");
				this._oNavContainer = sap.ui.getCore().byId("wiz-nav-container-id");
				this._oWizardContentPage = sap.ui.getCore().byId("wiz-page-id");
				this._oWizardReviewPage = sap.ui.xmlfragment("com.acme.s4ext.sensorworklist.view.RegistrationDlgWizReviewPage", this);

				this._oNavContainer.addPage(this._oWizardReviewPage);
			},

			afterOpenRegDlg : function(){
				this._updateWizardStep1State( 
					false, 
					this.wizardViewJsonModel.getProperty("/wizStep1/selSoIdValue"),
					this.wizardViewJsonModel.getProperty("/wizStep1/selSoNodeKeyValue")
				);
			},

			afterCloseRegDlg: function(oEvent){
				oEvent.getSource().destroy();
				if (this._oRegDlg) {
					this._oRegDlg = null;
				}
			},

			/* internal methods                                            */
			_initializeWizardViewJsonModel : function (initSelSoId, initSelNodeKey) {
				// wizard view json model
				this.wizardViewJsonModel = new sap.ui.model.json.JSONModel();
				this.wizardViewJsonModel.setData({
					html5AppHost: this._getHtml5AppHostFromUrl(),
					wizStep1: {
						selSoIdValue: initSelSoId,
						selSoNodeKeyValue: initSelNodeKey,
						displayErrorMsg: false
					},
					wizStep2: {
						selProductName: "",
						selProductId: "",
						selProductEquipmentKey: ""
					},
					wizStep3: {
						selItemId: "",
						selSensorName: "",
						selSensorKey: ""
					},
					wizReview: {
						isReviewPageDisplayed: false
					}
				});
				this.getView().setModel(this.wizardViewJsonModel, "wizardViewJsonModel");
			},

			_getHtml5AppHostFromUrl : function(){
				var host = window.location.host;
				if(host.indexOf("-") !== -1){
					var appUrlWithDispatcher = host.substring(host.indexOf("-"));
					var splitArr = appUrlWithDispatcher.split(".dispatcher");
					return(splitArr[0] + splitArr[1]);
				} else{
					return("-p1234567890trial.hanatrial.ondemand.com")
				}
			},

			_getRegDlg : function () {
				if (!this._oRegDlg) {
					this._oRegDlg = sap.ui.xmlfragment("com.acme.s4ext.sensorworklist.view.RegistrationDlg", this);
					this.getView().addDependent(this._oRegDlg);
				}
				return this._oRegDlg;
			},

			/* =========================================================== */
			/*  registration wizard part                                   */
			/* =========================================================== */
			/*  wizard step 1 methods                                         */
			/* ============================================================== */
			onSearchWizStep1: function (oEvent) {
				var inputValue = oEvent.getSource().getValue();
				var item = oEvent.getParameter("suggestionItem");
				var bValidItemSelected =  false;
				var itemKeyValue = "";
				
				if(item !== undefined){
					bValidItemSelected = true;
					itemKeyValue = item.getProperty("key");
				}

				this._updateWizardStep1State( bValidItemSelected, inputValue, itemKeyValue);
			},
 
			onSearchLiveChangeWizStep1: function (oEvent) {
				var oSource = oEvent.getSource();
				this._updateWizardStep1StateViaItems(oSource.getSuggestionItems(), oSource.getValue());
			},

			onSearchSuggestWizStep1: function (oEvent) {
				var that = this;
				var oSource = oEvent.getSource();
				var value = oEvent.getParameter("suggestValue");
				var aFilters = [];

				if(value){
					aFilters.push(
						new sap.ui.model.Filter({
							filters:[
								new sap.ui.model.Filter("SoId", sap.ui.model.FilterOperator.Contains, value.toUpperCase())
							],
							and: false
						})
					);
				}

				// keep suggested items list not too long
				this.getView().getModel().setSizeLimit(100);

				var oBinding =  oSource.getBinding("suggestionItems");
				oBinding.filter(aFilters);
				oBinding.attachEventOnce("dataReceived", function() {
					// now activate suggestion popup
					oSource.suggest();

					var liveInputValue = oSource.getValue();
					var suggestionItems = oSource.getSuggestionItems();
					that._updateWizardStep1StateViaItems(suggestionItems, liveInputValue);
				});
			},

			_updateWizardStep1StateViaItems: function( oSuggestionItems, sInputValue){
				var bValidItemSelected = false;
				var itemKeyValue = "";
				if( oSuggestionItems.length === 1 && 
					sInputValue === oSuggestionItems[0].getProperty("text")){
					bValidItemSelected = true;
					itemKeyValue = oSuggestionItems[0].getProperty("key");
				}
				this._updateWizardStep1State(bValidItemSelected, sInputValue, itemKeyValue);
			},

			_updateWizardStep1State: function( bValidItemSelected, sInputValue, sItemKeyValue){
				var oWizardStep1Ctrl = sap.ui.getCore().byId("wiz-step1-id");
				if(bValidItemSelected){
					this._wizard.validateStep(oWizardStep1Ctrl);
					this.wizardViewJsonModel.setProperty("/wizStep1/displayErrorMsg", false);
					this._bindSoItems(sItemKeyValue);
				} else{
					var bIsValuesInitial = (sInputValue=== "" && sItemKeyValue === "");
					this.wizardViewJsonModel.setProperty("/wizStep1/displayErrorMsg", !bIsValuesInitial);
					this._wizard.invalidateStep(oWizardStep1Ctrl);
				}
				this.wizardViewJsonModel.setProperty("/wizStep1/selSoIdValue", sInputValue);
				this.wizardViewJsonModel.setProperty("/wizStep1/selSoNodeKeyValue", sItemKeyValue);
			},

			_bindSoItems: function(sSelSalesOrderNodeKey){
				var wizStep2SoItemSelectCtrl = sap.ui.getCore().byId("so-item-select-wiz-step2-id");
				var soItemsBindingPath = "/SalesOrders('" + sSelSalesOrderNodeKey + "')/EquipmentDetails";
				// soItems select ctrl
				wizStep2SoItemSelectCtrl.bindAggregation("items", {
					path: soItemsBindingPath,
					factory: function(sId){
						return ( 
							new sap.ui.core.Item(sId, {
								key: "{EquipmentKey}",
								text: "{ProductName} (ID: {ProductId})",
								tooltip: "EquipmentKey - {EquipmentKey}",
								customData: [
									new sap.ui.core.CustomData({
										key: "Id",
										value: "{ProductId}"
									}),
									new sap.ui.core.CustomData({
										key: "Name",
										value: "{ProductName}"
									})
								]
							})
						);
					},
					sorter: new Sorter("ProductId", false),
					filters: new Filter("IsRegistered", "EQ", "0")
				});
			},

			/* ============================================================== */
			/*  wizard step 2 methods                                         */
			/* ============================================================== */
			validateWizStep2 : function () {
				this._updateWizardStep2State();
			},

			_updateWizardStep2State: function(){
				var oWizardStep2Ctrl = sap.ui.getCore().byId("wiz-step2-id");
				this._wizard.validateStep(oWizardStep2Ctrl);
			},

			/* ============================================================== */
			/*  wizard step 3 methods                                         */
			/* ============================================================== */
			onDevicesListRefresh : function () {
				this.getModel().read("/FreeDevices");
				this.getModel().refresh(true);
//				var oBindings = this.getModel().bindList("/FreeDevices");
/*
				var objArr = this.getModel().getProperty("/");
				for(var key in objArr){
					console.log(key);
				}
*/
//				var count = oBindings.getLength();
			},

			/* ============================================================== */
			/*  wizard review page related methods                            */
			/* ============================================================== */
			onSubmitRegistrationRegDgl : function () {
				var oDataModel = this.getModel();

				var oContext = oDataModel.createEntry("Equipment2Devices", {
					success: this._fnRegistrationEntityCreated.bind(this),
					error: this._fnRegistrationCreationFailed.bind(this)
				});

				var reviewedEquipmentKey = this.wizardViewJsonModel.getProperty("/wizStep2/selProductEquipmentKey");
				var reviewedDeviceId = this.wizardViewJsonModel.getProperty("/wizStep3/selSensorKey");
				var reviewedDeviceName = this.wizardViewJsonModel.getProperty("/wizStep3/selSensorName");

				// EquipmentKey
				this.getModel().setProperty(
					oContext.sPath + "/EquipmentKey",
					reviewedEquipmentKey
				);
				// GDevice
				this.getModel().setProperty(
					oContext.sPath + "/GDevice",
					reviewedDeviceId
				);
				// GDeviceName
				this.getModel().setProperty(
					oContext.sPath + "/GDeviceName",
					reviewedDeviceName
				);

				this.getModel().submitChanges();

				// TODO: make a single function of these three > see discardProgress
				this._handleNavigationToStep(0);
				this._wizard.discardProgress(this._wizard.getSteps()[0]);
				this._getRegDlg().close();
			},

			/**
			 * Handles the success of creating an object in SoItem2Devices table
			 * @param {object} oData the response of the registration action
			 * @private
			 */
			_fnRegistrationEntityCreated: function(oData) {
				this.getModel().refresh();
				MessageToast.show("Successfully registered Device Sensor.");
			},

			/**
			 * Handles the failure of creating an object in SoItem2Devices table
			 * @private
			 */
			_fnRegistrationCreationFailed: function(oError) {
				// TODO: handle error message
				var debuggerDummy = "debuggerDummy";
			},

			wizardCompletedHandler : function () {
				// TODO: Not the correct place here, but currently the best way to do it
				// The values should be filled earlier, but I did not yet find a corresponding event 
				// trigger to do this properly
				// WizStep 2
				var wizStep2EquipmentSelectCtrl = sap.ui.getCore().byId("so-item-select-wiz-step2-id");
				var oSelEquipment = wizStep2EquipmentSelectCtrl.getSelectedItem();
				
				this.wizardViewJsonModel.setProperty("/wizStep2/selProductName", oSelEquipment.getCustomData()[1].getValue());
				this.wizardViewJsonModel.setProperty("/wizStep2/selProductId", oSelEquipment.getCustomData()[0].getValue());
				this.wizardViewJsonModel.setProperty("/wizStep2/selProductEquipmentKey", oSelEquipment.getKey());

				// WizStep 3
				var wizStep3DevicesSelectCtrl = sap.ui.getCore().byId("devices-select-wiz-step3-id");
				var oSelDeviceItem = wizStep3DevicesSelectCtrl.getSelectedItem();

				this.wizardViewJsonModel.setProperty("/wizStep3/selSensorName", oSelDeviceItem.getText());
				this.wizardViewJsonModel.setProperty("/wizStep3/selSensorKey", oSelDeviceItem.getKey());

				this._oNavContainer.to(this._oWizardReviewPage);
				this.wizardViewJsonModel.setProperty("/wizReview/isReviewPageDisplayed", true);
			},

			backToWizardPage : function () {
				this.wizardViewJsonModel.setProperty("/wizReview/isReviewPageDisplayed", false);
				this._oNavContainer.backToPage(this._oWizardContentPage.getId());
			},

			editWizardStep1 : function () {
				this._handleNavigationToStep(0);
			},

			editWizardStep2 : function () {
				this._handleNavigationToStep(1);
			},

			editWizardStep3 : function () {
				this._handleNavigationToStep(2);
			},

			_handleNavigationToStep : function (iStepNumber) {
				var that = this;
				function fnAfterNavigate () {
					that._wizard.goToStep(that._wizard.getSteps()[iStepNumber]);
					that._oNavContainer.detachAfterNavigate(fnAfterNavigate);
				}

				this._oNavContainer.attachAfterNavigate(fnAfterNavigate);
				this.backToWizardPage();
			},

			onCancelRegDlg : function () {
				this._handleMessageBoxOpen(
					"Are you sure you want to cancel the registration?", 
					"warning"
				);
			},

			_handleMessageBoxOpen : function (sMessage, sMessageBoxType) {
				var that = this;
				MessageBox[sMessageBoxType](
					sMessage, {
						actions: [
							MessageBox.Action.YES, 
							MessageBox.Action.NO
						],
						onClose: function (oAction) {
							if (oAction === MessageBox.Action.YES) {
								that._handleNavigationToStep(0);
								that._wizard.discardProgress(that._wizard.getSteps()[0]);
								that._getRegDlg().close();
							}
						}
					}
				);
			},

			// TODO: what is this exactly good for?
			discardProgress: function () {
				this._wizard.discardProgress(sap.ui.getCore().byId("wiz-step1-id"));

				var clearContent = function (content) {
					for (var i = 0; i < content.length; i++) {
						if (content[i].setValue) {
							content[i].setValue("");
						}

						if (content[i].getContent) {
							clearContent(content[i].getContent());
						}
					}
				};
				clearContent(this._wizard.getSteps());
			}

		});
	}
);