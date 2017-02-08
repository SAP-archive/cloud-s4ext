sap.ui.define([
	] , function () {
		"use strict";

		return {

			decimal2Digit : function (sValue) {
				if (sValue.indexOf(".") === -1) {
					return sValue;
				} else{
					return (sValue.substring(0, sValue.indexOf(".") + 3));
				}
			},

			formatDate : function (sValue) {
				var splittedDateArr = (new Date(parseInt(sValue))).toString().split(" ");
				return ( splittedDateArr[1] + " " + splittedDateArr[2] + "," + splittedDateArr[4]);
			},

			getScanModeIconUrl : function(isScanModeActive){
				return (isScanModeActive) ? "sap-icon://accept" : "";
			},

			getManualModeIconUrl : function(isScanModeActive){
				return (!isScanModeActive) ? "sap-icon://accept" : "";
			}
		};
	}
);