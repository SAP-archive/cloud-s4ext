/*global location*/
sap.ui.define([
		"com/acme/s4ext/salesorderworklist/controller/BaseController",
		"com/acme/s4ext/salesorderworklist/model/formatter",
		"sap/ui/core/routing/History",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"sap/ui/model/json/JSONModel"
	], function (
		BaseController,
		formatter,
		History,
		Filter,
		FilterOperator,
		JSONModel
	) {
		"use strict";

		return BaseController.extend("com.acme.s4ext.salesorderworklist.controller.Object", {

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
			},

			/* =========================================================== */
			/* event handlers                                              */
			/* =========================================================== */

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
					var sObjectPath = this.getModel().createKey("SalesOrders", {
						NodeKey :  sObjectId
					});
					this._bindView("/" + sObjectPath);
					this._filterTable(sObjectId);
				}.bind(this));
			},

			_filterTable : function(sSoNodeKey){
				var oFilter = [
						new Filter({
							path : "SoNodeKey",
							operator : FilterOperator.EQ,
							value1 : sSoNodeKey,
							and : true
						})
/*						,
						new Filter({
							path : "IsRegistered",
							operator : FilterOperator.EQ,
							value1 : "1",
							and : true
						})
*/
					];
				var oTable = this.getView().byId("so-items-table-id");
				var oBinding = oTable.getBinding("items");
				oBinding.filter(oFilter);
			},

			onTitlePressQRCodePopover: function(oEvent) {
				var oPopover = this._getPopover();
				var oOpener = oEvent.getParameter("domRef");

				oPopover.bindElement(oEvent.getSource().getBindingContext().getPath());
				oPopover.openBy(oOpener);
			},

			/**
			 * Get the instance of the popover
			 */
			_getPopover : function() {
				if(!this._oPopover) {
					this._oPopover = sap.ui.xmlfragment("com.acme.s4ext.salesorderworklist.view.QrCodePopover", this);
					this.getView().addDependent(this._oPopover);
				}
				return this._oPopover;
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
					sObjectId = oObject.NodeKey,
					sObjectName = oObject.SoId;

				// Everything went fine.
				oViewModel.setProperty("/busy", false);
			}

		});

	}
);