/*
<!--                                                                                -->
<!-- Extending S/4HANA with HCP                                                     -->
<!-- * ANALYTIC Extension: Controller for Analytic View                             -->
*/
sap.ui.define([
	"com/acme/s4ext/productanalytics/controller/BaseController",
	"sap/ui/model/Filter",
	"sap/ui/model/json/JSONModel"

], function(BaseController, Filter, JSONModel) {
	"use strict";

	return BaseController.extend("com.acme.s4ext.productanalytics.controller.Analytics", {

		//Global variables for this view
		oViewModel : null,
		oVizFrameBarQuantity: null,
		oVizFrameBarRating: null,
		oVizFrameBubble: null,

		onInit: function() {
			//Create View Model
			this.oViewModel = new JSONModel({
					"quantityThreshold": 25,
					"ratingThreshold": 2,
					"bQuantityBoxVisible" : true,
					"bRatingBoxVisible" : false
				});
			this.setModel(this.oViewModel, "viewModel");

			//Configure bar chart for quantity of ordered products
			this.oVizFrameBarQuantity = this.getView().byId("idVizFrameBarQuantity");
			var oPopOverBarQuantity = this.getView().byId("idPopOverBarQuantity");
			oPopOverBarQuantity.connect(this.oVizFrameBarQuantity.getVizUid());
			this.oVizFrameBarQuantity.getDataset().setContext("Id");
			this._setVizFrameBarQuantityProperties();

			//Configure bar chart product rating
			this.oVizFrameBarRating = this.getView().byId("idVizFrameBarRating");
			var oPopOverBarRating = this.getView().byId("idPopOverBarRating");
			oPopOverBarRating.connect(this.oVizFrameBarRating.getVizUid());
			this.oVizFrameBarRating.getDataset().setContext("Id");
			this._setVizFrameBarRatingProperties();

			//Configure Bubble Chart for correlation between product, price, rating and orders
			this.oVizFrameBubble = this.getView().byId("idVizFrameBubble");
			var oPopOverBubble = this.getView().byId("idPopOverBubble");
			oPopOverBubble.connect(this.oVizFrameBubble.getVizUid());
			this.oVizFrameBubble.getDataset().setContext("Name");
			this._setVizFrameBubbleProperties();
		},

		//Helper: Set the properties of the bar chart for quantity
		//This is used for initial setup and on change of threshold for minimal amoung
		_setVizFrameBarQuantityProperties: function(){
			this.oVizFrameBarQuantity.setVizProperties({
				"title":{
					"visible": "false"
				},
				"plotArea":{
					"dataLabel":{
						"visible": "true"
					},
					//Mark the "good" products green, the "bad" products red
					"dataPointStyle":{
						"rules":[{
							"dataContext":{
								"Quantity":{
									"max": this.oViewModel.getProperty("/quantityThreshold")
								}
							},
							"properties":{
								"color":"sapUiChartPaletteSemanticBad"
							},
							"displayName": this.getResourceBundle().getText("barChartQuantityReferenceBad", this.oViewModel.getProperty("/quantityThreshold"))
						}],
						"others":{
							"properties":{
								"color": "sapUiChartPaletteSemanticGood"
							},
							"displayName": this.getResourceBundle().getText("barChartQuantityReferenceGood", this.oViewModel.getProperty("/quantityThreshold"))
						}
					},
					//Show a reference line for the set threshold with a label
					"referenceLine":{
						"line":{
							"valueAxis":[{
								"value": this.oViewModel.getProperty("/quantityThreshold"),
								"visible": true,
								"size":2,
								"type":"dotted",
								"label":{
									"text": this.getResourceBundle().getText("barChartQuantityReferenceBad", this.oViewModel.getProperty("/quantityThreshold")),
									"visible":true
								}
							}]
						}
					}
				},
				"categoryAxis":{
					"title":{
						"text": this.getResourceBundle().getText("barChartQuantityCategory")
					}
				},
				"valueAxis":{
					"title":{
						"text": this.getResourceBundle().getText("barChartQuantityValue")
					}
				}
			});
		},


		//Helper: Set the properties of the bar chart for ratings
		_setVizFrameBarRatingProperties: function(){
			this.oVizFrameBarRating.setVizProperties({
				"title":{
					"visible": false
				},
				"plotArea":{
					"dataLabel":{
						"visible": true
					},
					"dataPointStyle":{
						"rules":[{
							//Mark the "good" products green, the "bad" products red
							"dataContext":{
								"Rating":{
										"max": this.oViewModel.getProperty("/ratingThreshold")
									}
								},
								"properties":{
									"color":"sapUiChartPaletteSemanticBad"
								},
								"displayName":this.getResourceBundle().getText("barChartRatingReferenceBad",this.oViewModel.getProperty("/ratingThreshold"))
						}],
						"others":{
							"properties":{
								"color": "sapUiChartPaletteSemanticGood"
							},
							"displayName": this.getResourceBundle().getText("barChartRatingReferenceGood",this.oViewModel.getProperty("/ratingThreshold"))
						}
					},
					//Show a reference line for the set threshold with a label
					"referenceLine":{
						"line":{
							"valueAxis":[
								{
									"value": this.oViewModel.getProperty("/ratingThreshold"),
									"visible": true,
									"size":2,
									"type":"dotted",
									"label":{
										"text": this.getResourceBundle().getText("barChartRatingReferenceBad",this.oViewModel.getProperty("/ratingThreshold")),
										"visible":true
									}
								}
							]
						}
					}
				},
				"categoryAxis":{
					"title":{
						"text": this.getResourceBundle().getText("barChartRatingCategory")
					}
				},
				"valueAxis":{
					"title":{
						"text": this.getResourceBundle().getText("barChartRatingValue")
					}
				}
			});
		},

		//Helper: Set the properties of the bubble chart
		_setVizFrameBubbleProperties: function(){
			this.oVizFrameBubble.setVizProperties({
				"title":{
					"visible":false
				},
				"plotArea":{
					"dataLabel":{
						visible: true
					},
					"dataPointStyle":{
						"rules":[
							{
					 			//Mark the "good" products green, the "bad" products red
								"dataContext":{
									"Quantity":{
										"max": this.oViewModel.getProperty("/quantityThreshold")
									}
								},
								"properties":{
									"color":"sapUiChartPaletteSemanticBad"
								},
								"displayName":this.getResourceBundle().getText("bubbleChartReferenceQuantityBad",this.oViewModel.getProperty("/quantityThreshold"))
							},
							{
								"dataContext":{
									"Rating":{
										"max": this.oViewModel.getProperty("/ratingThreshold")
									}
								},
								"properties":{
									"color":"sapUiChartPaletteSemanticBad"
								},
								"displayName":this.getResourceBundle().getText("bubbleChartReferenceRatingBad",this.oViewModel.getProperty("/ratingThreshold"))
							}
						],
						"others":{
							"properties":{
								"color": "sapUiChartPaletteSemanticGood"
							},
							"displayName": this.getResourceBundle().getText("bubbleChartReferenceGood",[this.oViewModel.getProperty("/quantityThreshold"), this.oViewModel.getProperty("/ratingThreshold")])
						}
					},
					//Show two reference linse for the set thresholds with labels
					"referenceLine":{
						"line":{
							"valueAxis":[
								{
									"value": this.oViewModel.getProperty("/quantityThreshold"),
									"visible": true,
									"size": 2,
									"type": "dotted",
									"label":{
										"text":this.getResourceBundle().getText("bubbleChartReferenceQuantityBad",this.oViewModel.getProperty("/quantityThreshold")),
										"visible":true
									}
								}
							],
							"valueAxis2":[
								{
									"value": this.oViewModel.getProperty("/ratingThreshold"),
									"visible": true,
									"size": 2,
									"type": "dotted",
									"label":{
										"text":this.getResourceBundle().getText("bubbleChartReferenceRatingBad",this.oViewModel.getProperty("/ratingThreshold")),
										"visible":true
									}
								}
							]
						}
					}
				},
				"valueAxis":{
					"title":{
						"text": this.getResourceBundle().getText("bubbleChartValue1")
					}
				},
				"valueAxis2":{
					"title":{
						"text": this.getResourceBundle().getText("bubbleChartValue2")
					}
				}
			});
		},

		//Update the charts if the quantity slider has changed by setting new properties
		onQuantitySliderChange: function(oEvent){
			this.quantityThreshold = oEvent.getParameter("value");
			this._setVizFrameBarQuantityProperties();
			this._setVizFrameBubbleProperties();
		},

		//Update the charts if the rating slider has changed by setting new properties
		onRatingSliderChange: function(oEvent){
			this.ratingThreshold = oEvent.getParameter("value");
			this._setVizFrameBarRatingProperties();
			this._setVizFrameBubbleProperties();
		},

		//Handle changes of the chart and display the correct controls
		onContentChange : function (oEvent) {
			//Enable or disable sliders so that they fit to the shown chart
			var sSelectedItemId = oEvent.getParameter("selectedItemId");
			if(sSelectedItemId.endsWith("idVizFrameBarQuantity")) {
				this.oViewModel.setProperty("/bQuantityBoxVisible", true);
				this.oViewModel.setProperty("/bRatingBoxVisible", false);
			} else 	if(sSelectedItemId.endsWith("idVizFrameBarRating")) {
				this.oViewModel.setProperty("/bQuantityBoxVisible", false);
				this.oViewModel.setProperty("/bRatingBoxVisible", true);
			} else 	if(sSelectedItemId.endsWith("idVizFrameBubble")) {
				this.oViewModel.setProperty("/bQuantityBoxVisible", true);
				this.oViewModel.setProperty("/bRatingBoxVisible", true);
			}
			//Refresh the model when switching charts
			this.getModel().refresh();
		},

		//Handle Refresh Button
		handleRefresh : function (){
			this.getModel().refresh();
		},

		//If a filter is set then construct it and apply it to the charts
		//This event is triggered by a FacetFilterList
		handleFilter: function(oEvent){
			// Get the one Facet Filter List
			var oFacetFilterList = oEvent.getSource();

			//Only apply filters if there was at least one item selected
			if(oFacetFilterList.getSelectedItems().length > 0){

				//Get the selected keys and create new filters that are combined per "OR"
				//This will return a list of all selected products
				var oFilter = new Filter(oFacetFilterList.getSelectedItems().map(function(oItem) {
					return new Filter("PRODUCT_ID", "EQ", oItem.getKey());
				}), false);

				//Apply filter to the charts
				this.oVizFrameBarQuantity.getDataset().getBinding("data").filter(oFilter);
				this.oVizFrameBarRating.getDataset().getBinding("data").filter(oFilter);
				this.oVizFrameBubble.getDataset().getBinding("data").filter(oFilter);
			} else {
				//If no item is selected,then reset via the parent FaceFilter
				this._resetFilter(oFacetFilterList);
			}
		},

		//Reset the filters to the original state
		//This event is triggered by a FaceFilter that has multiple FaceFilterLists
		handleReset: function(oEvent) {
			//Get the one Facet Filter list and remove the selected keys
			var oFacetFilterLists = oEvent.getSource().getLists();
			var oFacetFilterList = oFacetFilterLists[0];

			//Only do something if there was at least one item selected
			if(oFacetFilterList.getSelectedItems().length > 0){
				this._resetFilter(oFacetFilterList );
			}
		},

		//Helper: Rest the filters to the original state and clean the charts
		_resetFilter: function(oFacetFilterList){
			oFacetFilterList.removeSelectedKeys();

			//Remove filter from the charts
			this.oVizFrameBarQuantity.getDataset().getBinding("data").filter(null);
			this.oVizFrameBarRating.getDataset().getBinding("data").filter(null);
			this.oVizFrameBubble.getDataset().getBinding("data").filter(null);
		}
	});
});
