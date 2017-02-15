package com.acme.s4ext.odata;

import java.io.InputStream;

import org.apache.olingo.odata2.jpa.processor.api.model.JPAEdmExtension;
import org.apache.olingo.odata2.jpa.processor.api.model.JPAEdmSchemaView;

public class SalesOrderProcessingExtension implements JPAEdmExtension {

	@Override
	public void extendWithOperation(JPAEdmSchemaView view) {
		// Transform all annotated methods from the {@link
		// SnwdSoHeaderProcessor} into Function Imports.
		view.registerOperations(SalesOrderFunctionImportProcessor.class, null);

	}

	@Override
	public void extendJPAEdmSchema(JPAEdmSchemaView view) {
		// nothing to do here
		return;
	}

	@Override
	public InputStream getJPAEdmMappingModelStream() {
		// nothing to do here
		return null;
	}

}
