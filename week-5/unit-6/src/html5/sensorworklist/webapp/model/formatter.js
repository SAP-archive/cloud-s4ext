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

			formatDate : function (sValue) {
				var splittedDateArr = (new Date(parseInt(sValue))).toString().split(" ");
				return ( splittedDateArr[1] + " " + splittedDateArr[2] + "," + splittedDateArr[4]);
			},

			isDamaged: function (damageCnt) {
				return (damageCnt > 0);
			},

			isNotDamaged: function (damageCnt) {
				return (damageCnt === 0);
			},

			getDamageStatusState: function (damageCnt) {
				if(damageCnt > 0){
					return "Error";
				} else{
					return "Success";
				}
			},

			getDamageIconUrl: function (damageCnt) {
				if(damageCnt > 0){
					return "sap-icon://error";
				} else{
					return "sap-icon://accept";
				}
			}

		};

	}
);