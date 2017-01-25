/*
 * Copyright (C) 2009-2015 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([
		"sap/ui/core/UIComponent",
		"./controller/Application",
		"./model/models",
		"sap/ui/Device"
	], function(UIComponent, Application, models, Device) {
	"use strict";

	var mRoutenames = {
		MASTER: "Products",
		DETAIL: "ProductDetails"
	};

	return UIComponent.extend("nw.epm.refapps.ext.prod.manage.Component", {
		metadata: {
			name: "xtit.shellTitle",
			version: "${project.version}",
			includes: ["css/manageProductStyle.css"],
			dependencies: {
				libs: ["sap.m", "sap.ushell"],
				components: []
			},
			rootView: "nw.epm.refapps.ext.prod.manage.view.App",
			config: {
				resourceBundle: "i18n/i18n.properties",
				titleResource: "xtit.shellTitle",
				icon: "sap-icon://Fiori7/F1373",
				favIcon: "icon/F0865_Manage_Products.ico",
				phone: "icon/launchicon/57_iPhone_Desktop_Launch.png",
				"phone@2": "icon/launchicon/114_iPhone-Retina_Web_Clip.png",
				tablet: "icon/launchicon/72_iPad_Desktop_Launch.png",
				"tablet@2": "icon/launchicon/144_iPad_Retina_Web_Clip.png",
				serviceConfig: {
					name: "EPM_REF_APPS_PROD_MAN_SRV",
					serviceUrl: "/sap/opu/odata/sap/EPM_REF_APPS_PROD_MAN_SRV"
				}
			},

			routing: {
				config: {
					routerClass: "sap.m.routing.Router",
					viewType: "XML",
					viewPath: "nw.epm.refapps.ext.prod.manage.view", // common prefix
					controlId: "fioriContent",
					bypassed: {
						target: ["master", "empty"]
					}
				},
				routes: [
					{
						pattern: "",
						name: mRoutenames.MASTER,
						target: ["object", "master"]
					},
					{
						pattern: "Product/{productID}",
						name: mRoutenames.DETAIL,
						target: ["master", "object"]
					}
				],
				targets: {
					master: {
						viewName: "S2_ProductMaster",
						viewLevel: 1,
						controlAggregation: "masterPages"
					},
					object: {
						viewName: "S3_ProductDetail",
						viewLevel: 2,
						controlAggregation: "detailPages"
					},
					empty: {
						viewName: "EmptyPage",
						viewLevel: 3,
						controlAggregation: "detailPages"
					}
				}
			}
		},

		init: function() {
			/*
			<!--                                                                                -->
			<!-- Extending S/4HANA with HCP                                                     -->
			<!-- * COLLABORATIVE Extension: Creating/Diplaying SAP Jam Group(s) for products    -->
			<!-- begin                                                                          -->
			*/
			// SAP Jam ODataModel
			var componentName = "manageproducts";
			var modulePath = (window.location.host.indexOf("flpportal-") === -1) ? "" : "/sap/fiori/" + componentName;
			var oSapJamModel = models.createODataModel({
				url: modulePath + "/jam-internet-http/api/v1/OData",
				config: {
					json: true,
					defaultBindingMode: "TwoWay",
					loadMetadataAsync: true
				}
			});
			this.setModel( oSapJamModel, "SapJamModel" );
			/*
			//<!-- end                                                                            -->
			*/

			var mConfig = this.getMetadata().getConfig();

			// create and set the ODataModel
			var oModel = models.createODataModel({
				urlParametersForEveryRequest: [
						"sap-server",
						"sap-client",
						"sap-language"
					],
				url: this.getMetadata().getConfig().serviceConfig.serviceUrl,
				config: {
					metadataUrlParams: {
						"sap-documentation": "heading"
					},
					json: true,
					defaultBindingMode: "TwoWay",
					useBatch: true,
					defaultCountMode: "Inline",
					loadMetadataAsync: true
				}
			});

			// Note: Batch groups must be defined globally. Therefore, we do it here, although they are only used in the edit view.
			oModel.setDeferredBatchGroups(["editproduct", "BatchDelete"]);
			oModel.setChangeBatchGroups({
				"ProductDraft": {
					batchGroupId: "editproduct"
				}
			});

			this.setModel(oModel);
			// set the i18n model

			// always use absolute paths relative to our own component
			// (relative paths will fail if running in the Fiori Launchpad)
			var sRootPath = jQuery.sap.getModulePath("nw.epm.refapps.ext.prod.manage");

			// set i18n model
			this.setModel(models.createResourceModel(sRootPath, mConfig.resourceBundle), "i18n");

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			this._oApplicationController = new Application(this, mRoutenames);
			this._oApplicationController.init(this.getMetadata().getConfig().serviceConfig.serviceUrl);

			// create the views based on the url/hash
			this.getRouter().initialize();
		},

		/**
		 * The component is destroyed by UI5 automatically.
		 * In this method, the ErrorHandler are destroyed.
		 * @public
		 * @override
		 */
		destroy: function() {
			this.getModel().destroy();
			this.getModel("i18n").destroy();
			this.getModel("device").destroy();

			// call the base component's destroy function
			UIComponent.prototype.destroy.apply(this, arguments);
		}
	});

});