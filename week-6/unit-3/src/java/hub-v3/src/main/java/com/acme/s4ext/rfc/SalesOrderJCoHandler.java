package com.acme.s4ext.rfc;

import java.util.Locale;

import org.apache.olingo.odata2.api.commons.HttpStatusCodes;
import org.apache.olingo.odata2.api.exception.ODataApplicationException;

import com.sap.conn.jco.JCoDestination;
import com.sap.conn.jco.JCoDestinationManager;
import com.sap.conn.jco.JCoException;
import com.sap.conn.jco.JCoFunction;
import com.sap.conn.jco.JCoParameterList;

/*
 * SalesOrderJcoHandler calls the Z_ACME_S4EXT_SET_SO_STATUS Remote Function Module in 
 * SAP NetWeaver to set the sales order status to either "in progress" or "delivered" via JCo.
 */
public class SalesOrderJCoHandler {

	// Name of the RFC destination on the SAP HANA Cloud Platform.
	private static final String RFC_DESTINATION_NAME = "s4h-onpremise-rfc";
	
	// Name of the Remote FUnction Module to be called.
	private static final String RFM_NAME = "Z_ACME_S4EXT_SET_SO_STATUS";

	// Helper for the ABAP boolean.
	private static final String ABAP_TRUE = "X";

	
	/*
	 * Set a sales order to "In Process". The sales order is defined by a unique node key.
	 */
	public static void setSalesOrderInProcess(String salesOrderNodeKey) throws ODataApplicationException {
		executeSetSalceOrderStatus(salesOrderNodeKey, true, false);
	}

	
	/*
	 * Set an sales order to "Delivered". The sales order is defined by a unique node key.
	 */
	public static void setSalesOrderDelivered(String salesOrderNodeKey) throws ODataApplicationException {
		executeSetSalceOrderStatus(salesOrderNodeKey, false, true);
	}

	
	/*
	 * Generic helper method to call the Remote Function Module in the SAP NetWeaver via a Remote Function Call (RFC).
	 * 
	 */
	private static void executeSetSalceOrderStatus(String salesOrderNodeKey, boolean doSetInProcess,
			boolean doDeliver) throws ODataApplicationException {
		try {

			// Get the RFC destination that shall be used.
			JCoDestination destination = JCoDestinationManager.getDestination(RFC_DESTINATION_NAME);

			// Get the Remote Function Module that shall be called.
			JCoFunction jcoFunction = destination.getRepository().getFunction(RFM_NAME);

			// Set all import parameters for the call
			JCoParameterList importParameterList = jcoFunction.getImportParameterList();
			importParameterList.setValue("IV_NODE_KEY", salesOrderNodeKey);
			if (doSetInProcess)
				importParameterList.setValue("IV_SET_SO_IN_PROCESS", ABAP_TRUE);
			if (doDeliver)
				importParameterList.setValue("IV_SET_SO_DELIVERED", ABAP_TRUE);

			// Execute the Remote Function Call
			jcoFunction.execute(destination);

			// The exportPrameterList contains the error details. 
			// If an error is returned an ODataApplicationException is thrown.
			JCoParameterList exportPrameterList = jcoFunction.getExportParameterList();
			if (exportPrameterList != null) {
				char errorCode = exportPrameterList.getChar("EV_ERROR_OCCURRED");
				String errorMessage = exportPrameterList.getString("EV_ERROR_MESSAGE");
				if ('X' == errorCode) {
					throw new ODataApplicationException(
							"Failed to execute Remote Function Module" + RFM_NAME + " via JCoFunction execution:" + errorMessage,
							Locale.ENGLISH, HttpStatusCodes.BAD_REQUEST);
				}
			}
		} catch (JCoException e) {
			throw new ODataApplicationException("A JCoError occurred: " + e.getMessage(), Locale.ENGLISH,
					HttpStatusCodes.BAD_REQUEST, e);
		}
	}
}
