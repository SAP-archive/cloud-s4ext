sap.ui.define([
		"com/acme/s4ext/salesorderworklist/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("com.acme.s4ext.salesorderworklist.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("worklist");
			}

		});

	}
);