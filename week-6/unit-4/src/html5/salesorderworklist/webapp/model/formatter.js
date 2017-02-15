sap.ui.define([
	] , function () {
		"use strict";

		return {

			/*
			 * Rounds the number unit value to 2 digits
			 */
			numberUnit : function (sValue) {
				if (!sValue) {
					return "";
				}
				return parseFloat(sValue).toFixed(2);
			},

			/*
			 * Formats a equipment key id to a static barcode image
			 */
			formatBarCodeUrl : function(sEquipmentKey) {
				return "https://" + "chart.googleapis.com/chart?cht=qr&chs=170x170&chl=" + sEquipmentKey;
			},

			getDateString : function (sDateValue) {
				// sDateValue is of format yyyymmddhhmmssnnnnnnn (n==mileseconds)
				var year = sDateValue.slice(0,4);
				var month = sDateValue.slice(4,6);
				var day = sDateValue.slice(6,8);
				return (day + "/" + month + "/" + year);
			},

			getLifecycleStatusText: function (lifecycleStatus, deliveryStatus) {
				switch (lifecycleStatus) {
					case "N":
						return (deliveryStatus === "D") ? "Undefined" : "New";
					case "P":
						return (deliveryStatus === "D") ? "Undefined" : "In Process";
					case "C":
						return (deliveryStatus === "D") ? "Delivered" : "Undefined";
					case "X":
						return "Undefined";
					default:
						return "Undefined";
				}
			},

			getLifecycleStatusState: function (lifecycleStatus, deliveryStatus) {
				var formatter = this.getView().getController().formatter;
				var statusText = formatter.getLifecycleStatusText(lifecycleStatus, deliveryStatus);

				switch (statusText) {
					case "New":
						return "Error";
					case "In Process":
						return "Warning";
					case "Delivered":
						return "Success";
					case "Undefined":
						return "None";
					default:
						return "None";
				}
			},

			isinProcessActionActive: function(lifecycleStatus, deliveryStatus) {
				var formatter = this.getView().getController().formatter;
				return (formatter.getLifecycleStatusText(lifecycleStatus, deliveryStatus) === "New");
			},

			isinProcessActionNotActive: function(lifecycleStatus, deliveryStatus) {
				var formatter = this.getView().getController().formatter;
				return (formatter.getLifecycleStatusText(lifecycleStatus, deliveryStatus) !== "New");
			},

			isDeliveredActionActive: function(lifecycleStatus, deliveryStatus, numberOfRegisteredEquipment) {
				var formatter = this.getView().getController().formatter;
				return (numberOfRegisteredEquipment > 0 && formatter.getLifecycleStatusText(lifecycleStatus, deliveryStatus) === "In Process");
			},

			isDeliveredActionNotActive: function(lifecycleStatus, deliveryStatus, numberOfRegisteredEquipment) {
				var formatter = this.getView().getController().formatter;
				return (!(numberOfRegisteredEquipment > 0 && formatter.getLifecycleStatusText(lifecycleStatus, deliveryStatus) === "In Process"));
			},

			isRegisterActionActive: function(lifecycleStatus, deliveryStatus, numberOfRegisteredEquipment, numberOfOrderedEquipment) {
				var formatter = this.getView().getController().formatter;
				return (numberOfRegisteredEquipment < numberOfOrderedEquipment && formatter.getLifecycleStatusText(lifecycleStatus, deliveryStatus) === "In Process");
			},

			isRegisterActionNotActive: function(lifecycleStatus, deliveryStatus, numberOfRegisteredEquipment, numberOfOrderedEquipment) {
				var formatter = this.getView().getController().formatter;
				return (!(numberOfRegisteredEquipment < numberOfOrderedEquipment && formatter.getLifecycleStatusText(lifecycleStatus, deliveryStatus) === "In Process"));
			}
		};

	}
);