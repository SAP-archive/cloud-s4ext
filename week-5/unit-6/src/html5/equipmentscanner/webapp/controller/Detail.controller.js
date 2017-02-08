sap.ui.define([
	"com/acme/s4ext/equipmentscanner/model/formatter",
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel"
], function (formatter, Controller, History, Filter, FilterOperator, JSONModel) {
	"use strict";

	return Controller.extend("com.acme.s4ext.equipmentscanner.controller.Detail", {

		formatter: formatter,

		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);

			var oJsonViewModel = new JSONModel(
				{
					damageDataCount : -1
				}
			);
			this.getView().setModel(oJsonViewModel, "jsonViewModel");

		},

		_onObjectMatched: function (oEvent) {
			var equipmentKey = oEvent.getParameter("arguments").equipmentKey;
			this.getView().bindElement({
				path: "/Equipments('" + equipmentKey + "')"
			});
			this._readDamageData();
		},

		_readDamageData: function(){

			var oView = this.getView();
			var equipmentKey = oView.getElementBinding().getPath().split("'")[1]; // "0AC2DF7BD1211EE693EBDE1ED7270AEB"
			var jsonViewModel = oView.getModel("jsonViewModel");
			var oFilter = 
				new Filter({
					path : "EquipmentKey",
					operator : FilterOperator.EQ,
					value1 : equipmentKey,
					and : true
				});

			// Get entities count for the 'new_' filter
			oView.getModel().read( "/DamageDatas", {
					success: function (oData) {
						var damageDataCount = oData.results.length;
						jsonViewModel.setProperty("/damageDataCount", damageDataCount);
						if(damageDataCount>0){
							var oTable = oView.byId("table-id");
							var oBinding = oTable.getBinding("items");
							oBinding.filter(oFilter);
							oTable.setVisible(true);
						}
					},
					error: function(oError) {
						jQuery.sap.log.error(oError.message + " " + oError.statusCode + " " + oError.statusText + ": ", oError.responseText);
						// TODO: ui error msg handling
					},
					filters: [oFilter]
				}
			);
		},

		onPressNavBackBtn: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			var jsonViewModel = this.getView().getModel("jsonViewModel");
			jsonViewModel.setProperty("/damageDataCount", -1);

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("overview", true);
			}
		}

	});
});