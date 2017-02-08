package com.acme.s4ext.odata;

import org.apache.olingo.odata2.jpa.processor.api.ODataJPAContext;
import org.apache.olingo.odata2.jpa.processor.api.ODataJPAServiceFactory;
import org.apache.olingo.odata2.jpa.processor.api.exception.ODataJPARuntimeException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.acme.s4ext.jpa.EntityManagerFactoryHandler;

/*
 * EntitiesODataJPAServiceFactory generates OData Services for the defined JPA Entities and function imports.
 * For this, the respective JPA EntityManager and extensions are handed over to the Apacha Olingo framework.
 *
 * This implementation is not implementing the servlet - The implementation is provided by the
 * Apache CXF framework in combination with the Apache Olingo framework. The respective configuration
 * can be found in /webapp/WEB-INF/web.xml
 */
public class EntitiesODataJPAServiceFactory extends ODataJPAServiceFactory {

	private final Logger LOGGER = LoggerFactory.getLogger(EntitiesODataJPAServiceFactory.class);

	/*
	 * Initialize the ODataJPAContext, i.e.
	 * hand over the JPA EntityManager and extension to the Apache Olingo framework
	 */
	@Override
	public ODataJPAContext initializeODataJPAContext() throws ODataJPARuntimeException {
		try {
			// Register an EntityManagerFactory that shall be used for OData services.
			// These services will provide access to the respective tables and views.
			ODataJPAContext oDataJPAContext = this.getODataJPAContext();

			if (oDataJPAContext.getEntityManagerFactory() == null) {
				oDataJPAContext.setEntityManagerFactory(EntityManagerFactoryHandler.getEntityManagerFactory());
				oDataJPAContext.setPersistenceUnitName(EntityManagerFactoryHandler.PERSISTENCE_UNIT_NAME);
			}

			return oDataJPAContext;
		} catch (Exception e) {
			String msg = "Unexpected exception occured in initializeODataJPAContext(): " + e.getMessage();
			LOGGER.error(msg, e);
			throw new RuntimeException(msg, e);
		}
	}

}
