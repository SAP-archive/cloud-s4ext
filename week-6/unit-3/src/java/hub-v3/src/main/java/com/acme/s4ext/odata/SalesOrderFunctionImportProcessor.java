package com.acme.s4ext.odata;

import org.apache.olingo.odata2.api.annotation.edm.EdmFacets;
import org.apache.olingo.odata2.api.annotation.edm.EdmFunctionImport;
import org.apache.olingo.odata2.api.annotation.edm.EdmFunctionImport.HttpMethod;
import org.apache.olingo.odata2.api.annotation.edm.EdmFunctionImport.ReturnType;
import org.apache.olingo.odata2.api.annotation.edm.EdmFunctionImport.ReturnType.Type;
import org.apache.olingo.odata2.api.annotation.edm.EdmFunctionImportParameter;
import org.apache.olingo.odata2.api.exception.ODataApplicationException;
import org.apache.olingo.odata2.api.exception.ODataException;

import com.acme.s4ext.rfc.SalesOrderJCoHandler;

public class SalesOrderFunctionImportProcessor {

	@EdmFunctionImport(name = "setSalesOrderInProcess", //
			returnType = @ReturnType(type = Type.SIMPLE, isCollection = false), //
			httpMethod = HttpMethod.PUT)
	public boolean setSalesOrderInProcess(
			@EdmFunctionImportParameter(name = "SO_NODE_KEY", facets = @EdmFacets(nullable = false)) final String nodeKey)
			throws ODataApplicationException {

		SalesOrderJCoHandler.setSalesOrderInProcess(nodeKey);

		return true;
	}

	@EdmFunctionImport(name = "setSalesOrderDelivered", //
			returnType = @ReturnType(type = Type.SIMPLE, isCollection = false), //
			httpMethod = HttpMethod.PUT)
	public boolean setSalesOrderDelivered(
			@EdmFunctionImportParameter(name = "SO_NODE_KEY", facets = @EdmFacets(nullable = false)) final String nodeKey)
			throws ODataException {

		SalesOrderJCoHandler.setSalesOrderDelivered(nodeKey);

		return true;
	}

}