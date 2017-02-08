/*global location*/
sap.ui.define([
		"com/acme/s4ext/sensorworklist/controller/BaseController",
		"com/acme/s4ext/sensorworklist/model/formatter",
		"sap/m/MessageToast",
		"sap/m/MessageBox",
		"sap/ui/core/routing/History",
		"sap/ui/model/json/JSONModel",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"sap/ui/model/Sorter"
	], function (
		BaseController,
		formatter,
		MessageToast,
		MessageBox,
		History,
		JSONModel,
		Filter,
		FilterOperator,
		Sorter
	) {
		"use strict";

		return BaseController.extend("com.acme.s4ext.sensorworklist.controller.Object", {

			formatter: formatter,

			/* =========================================================== */
			/* lifecycle methods                                           */
			/* =========================================================== */

			/**
			 * Called when the worklist controller is instantiated.
			 * @public
			 */
			onInit : function () {
				// Model used to manipulate control states. The chosen values make sure,
				// detail page is busy indication immediately so there is no break in
				// between the busy indication for loading the view's meta data
				var iOriginalBusyDelay,
					oViewModel = new JSONModel({
						busy : true,
						delay : 0
					});

				this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);

				// Store original busy indicator delay, so it can be restored later on
				iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();
				this.setModel(oViewModel, "objectView");
				this.getOwnerComponent().getModel().metadataLoaded().then(function () {
						// Restore original busy indicator delay for the object view
						oViewModel.setProperty("/delay", iOriginalBusyDelay);
					}
				);

				// viz chart 
				var oResBundle = this.getResourceBundle();

				// set view settings model
				// why i18n via JsonModel? -> in UI5 VizFrame control the i18n resource model does not work
				var oViewSettingsJsonModel = new JSONModel({
					switchCtrls : {
						displayPlotTitle : {
							defaultState : true
						}
					},
					i18n :{
						vizFrameXaxisTitle: oResBundle.getText("vizFrameXaxisTitle"),
						vizFrameYaxisTitle: oResBundle.getText("vizFrameYaxisTitle")
					}
				});
				oViewSettingsJsonModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
				this.getView().setModel(oViewSettingsJsonModel, "viewSettingsJsonModel");

				var oVizFrame = this.getView().byId("viz-frame-id");
				oVizFrame.setVizProperties({
					title : {
						visible : true,
						text : oResBundle.getText("vizFrameTitle")
					}
				});

				// TODO: not yet clear what this popover is good for
				// only with this connect a click on certain data reveals a (standard) popover dialog
				
				//Set popover here to avoid duplicate id
				//var oPopOver = this.getView().byId("viz-popover-id");
				var oPopOver = new sap.viz.ui5.controls.Popover();
				oPopOver.connect(oVizFrame.getVizUid());
			},

			/* =========================================================== */
			/* event handlers                                              */
			/* =========================================================== */
			onPressRefreshBtn : function(){
				var that = this;
				var oViewModel = this.getModel();

				this.getView().setBusy(true);
				oViewModel.read( 
					"/DamageDatas", 
					{
						success: function (oData) {
							that.getView().setBusy(false);
							oViewModel.refresh(true);
							MessageToast.show("Successfully retrieved data and updated chart");
						},
						error: function(oError) {
							jQuery.sap.log.error(oError.message + " " + oError.statusCode + " " + oError.statusText + ": ", oError.responseText);
							MessageBox.alert("Error occured while retrieving backend data. Check web browser console for details", {
								onClose : function() {
									that.getView().setBusy(false);
								}
							});
						}
					}
				);
			},

			/**
			 * Event handler  for navigating back.
			 * It there is a history entry we go one step back in the browser history
			 * If not, it will replace the current entry of the browser history with the worklist route.
			 * @public
			 */
			onNavBack : function() {
				var sPreviousHash = History.getInstance().getPreviousHash();

				if (sPreviousHash !== undefined) {
					history.go(-1);
				} else {
					this.getRouter().navTo("worklist", {}, true);
				}
			},

			/* =========================================================== */
			/* internal methods                                            */
			/* =========================================================== */

			/**
			 * Binds the view to the object path.
			 * @function
			 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
			 * @private
			 */
			_onObjectMatched : function (oEvent) {
				var sObjectId =  oEvent.getParameter("arguments").objectId;
				this.getModel().metadataLoaded().then( function() {
					var sObjectPath = this.getModel().createKey("Equipments", {
						EquipmentKey :  sObjectId
					});
					this._bindView("/" + sObjectPath);
				}.bind(this));
			},

			/**
			 * Binds the view to the object path.
			 * @function
			 * @param {string} sObjectPath path to the object to be bound
			 * @private
			 */
			_bindView : function (sObjectPath) {
				var oViewModel = this.getModel("objectView"),
					oDataModel = this.getModel();

				this.getView().bindElement({
					path: sObjectPath,
					events: {
						change: this._onBindingChange.bind(this),
						dataRequested: function () {
							oDataModel.metadataLoaded().then(function () {
								// Busy indicator on view should only be set if metadata is loaded,
								// otherwise there may be two busy indications next to each other on the
								// screen. This happens because route matched handler already calls '_bindView'
								// while metadata is loaded.
								oViewModel.setProperty("/busy", true);
							});
						},
						dataReceived: function () {
							oViewModel.setProperty("/busy", false);
						}
					}
				});
			},

			_onBindingChange : function () {
				var oView = this.getView(),
					oViewModel = this.getModel("objectView"),
					oElementBinding = oView.getElementBinding();

				// No data for the binding
				if (!oElementBinding.getBoundContext()) {
					this.getRouter().getTargets().display("objectNotFound");
					return;
				}

				var oResourceBundle = this.getResourceBundle(),
					oObject = oView.getBindingContext().getObject(),
					sObjectId = oObject.EquipmentKey,
					sObjectName = oObject.EquipmentKey;

				// Everything went fine.
				oViewModel.setProperty("/busy", false);

				var oVizDataSet = this.getView().byId("viz-dataset-id");
				var oBinding =  oVizDataSet.getBinding("data");
				var aFilters = [];

				aFilters.push(
					new sap.ui.model.Filter({
						filters:[
							new sap.ui.model.Filter("EquipmentKey", sap.ui.model.FilterOperator.EQ, sObjectId)
						],
						and: false
					})
				);
				oBinding.filter(aFilters);
				oBinding.sort(new Sorter("CTimestamp",false));

			}

		});

	}
);