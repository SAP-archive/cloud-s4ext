sap.ui.define([
	"com/acme/s4ext/equipmentscanner/model/formatter",
	"sap/m/MessageBox",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(formatter, MessageBox, Controller, JSONModel) {
	"use strict";

	return Controller.extend("com.acme.s4ext.equipmentscanner.controller.Overview", {

		formatter: formatter,

		onInit : function() {
			var oJsonViewModel = new JSONModel({
					panelTitle : "Scanner Mode",
					scanModeIsActive : true,
					searchFieldState: {
						selSoIdValue: "",
						selSoNodeKeyValue: "",
						displayErrorMsg: false,
						isInitialFocus: true
					}
				}
			);
			this.getView().setModel(oJsonViewModel, "jsonViewModel");
		},

		onPressActionSheetBtn: function(oEvent) {
			var oButton = oEvent.getSource();

			// create action sheet only once
			if (!this._actionSheet) {
				this._actionSheet = sap.ui.xmlfragment(
					"com.acme.s4ext.equipmentscanner.view.ActionSheet",
					this
				);
				this.getView().addDependent(this._actionSheet);
			}

			this._actionSheet.openBy(oButton);
		},

		onPressCheckBtn : function() {
			var oJsonViewModel = this.getView().getModel("jsonViewModel");
			var sSearchField = oJsonViewModel.getProperty("/searchFieldState/selSoNodeKeyValue");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo( "detail", {
					equipmentKey : sSearchField
				}
			);
		},

		onPressScanModeBtn : function () {
			var oJsonViewModel = this.getView().getModel("jsonViewModel");
			oJsonViewModel.setProperty("/panelTitle", "Scanner Mode");
			oJsonViewModel.setProperty("/scanModeIsActive", true);
		},

		onPressManualModeBtn : function () {
			var oJsonViewModel = this.getView().getModel("jsonViewModel");
			oJsonViewModel.setProperty("/panelTitle", "Manual Mode");
			oJsonViewModel.setProperty("/scanModeIsActive", false);
		},

		onPressScanBtn : function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			try {
				cordova.plugins.barcodeScanner.scan(
					function(oResult) {
						var sScanResult = oResult.text.substring(0,32);

						if (oResult.cancelled) {
							MessageBox.alert("Scanning canceled by User");
							return;
						}
						oRouter.navTo( "detail", {
								equipmentKey : sScanResult
							}
						);

					}, function (oError) {
						MessageBox.error("Barcode scanning failed");
					}
				);
			} catch (e) {
				MessageBox.error("Cordova plugin is not available.");
			}
		},

		/* =========================================================== */
		/*  wizard step 1 methods                                         */
		/* ============================================================== */
		onSearch: function (oEvent) {
			var oSource = oEvent.getSource();
			var inputValue = oSource.getValue();
			var item = oEvent.getParameter("suggestionItem");
			var bValidItemSelected =  false;
			var itemKeyValue = "";
			
			if(item !== undefined){
				bValidItemSelected = true;
				itemKeyValue = item.getProperty("key");
				this._updateSearchFieldState( bValidItemSelected, inputValue, itemKeyValue);
			} else{
				this._updateSearchFieldStateViaItems(oSource.getSuggestionItems(), oSource.getValue());
			}

		},

		onSearchLiveChange: function (oEvent) {
			var oSource = oEvent.getSource();
			this._updateSearchFieldStateViaItems(oSource.getSuggestionItems(), oSource.getValue());
		},

		onSearchSuggest: function (oEvent) {
			var that = this;
			var oSource = oEvent.getSource();
			var value = oEvent.getParameter("suggestValue");
			var aFilters = [];

			if(value){
				aFilters.push(
					new sap.ui.model.Filter({
						filters:[
							new sap.ui.model.Filter("EquipmentKey", sap.ui.model.FilterOperator.Contains, value.toUpperCase())
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
				that._updateSearchFieldStateViaItems(suggestionItems, liveInputValue);
			});
		},

		_updateSearchFieldStateViaItems: function( oSuggestionItems, sInputValue){
			var bValidItemSelected = false;
			var itemKeyValue = "";
			if( oSuggestionItems.length === 1 && 
				sInputValue === oSuggestionItems[0].getProperty("text")){
				bValidItemSelected = true;
				itemKeyValue = oSuggestionItems[0].getProperty("key");
			} else{
				for (var i = 0; i < oSuggestionItems.length; i++) {
					if(oSuggestionItems[i].getProperty("text") === sInputValue){
						bValidItemSelected = true;
						itemKeyValue = oSuggestionItems[i].getProperty("key");
						break;
					}	
				}
			}
			this._updateSearchFieldState(bValidItemSelected, sInputValue, itemKeyValue);
		},

		_updateSearchFieldState: function( bValidItemSelected, sInputValue, sItemKeyValue){
			var oJsonViewModel = this.getView().getModel("jsonViewModel");
			var isInitialFocus = oJsonViewModel.getProperty("/searchFieldState/isInitialFocus");
			if(isInitialFocus){
				oJsonViewModel.setProperty("/searchFieldState/displayErrorMsg", false);
				oJsonViewModel.setProperty("/searchFieldState/isInitialFocus", false);
			}
			if(bValidItemSelected){
				oJsonViewModel.setProperty("/searchFieldState/displayErrorMsg", false);
				oJsonViewModel.setProperty("/searchFieldState/selSoNodeKeyValue", sItemKeyValue);
			} else{
				oJsonViewModel.setProperty("/searchFieldState/displayErrorMsg", true);
				oJsonViewModel.setProperty("/searchFieldState/selSoNodeKeyValue", "");
			}
			oJsonViewModel.setProperty("/searchFieldState/selSoIdValue", sInputValue);
		}

	});

});