package com.acme.s4ext.jpa;

import java.util.HashMap;
import java.util.Map;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.sql.DataSource;

import org.eclipse.persistence.config.PersistenceUnitProperties;

import com.sap.security.um.user.PersistenceException;
import com.sap.security.um.user.UnsupportedUserAttributeException;

/**
 * 
 *
 */
public class EntityManagerFactoryHandler {

	//Name of the persistence unit as defined in /resources/META-INF/persistence.xml
	public static final String PERSISTENCE_UNIT_NAME = "hub";
	
	//Name of the data source as defined in /webapp/WEB-INF/web.xml
	public static final String DATA_SOURCE_NAME = "java:comp/env/jdbc/DefaultDB";

	private static EntityManagerFactory emf = null;

	/*
	 * Getter for an EntityManagerFactory. 
	 * If there is already one existing return this.
	 * If not, then create a new one.
	 */
	public static EntityManagerFactory getEntityManagerFactory()
			throws PersistenceException, UnsupportedUserAttributeException, NamingException {
		if (emf == null)
			emf = createNewEntityManagerFactory();
		return emf;
	}

	
	/*
	 * Return a new EntityManagerFactory for the defined data source and persistence unit.
	 */
	private static EntityManagerFactory createNewEntityManagerFactory()
			throws NamingException, PersistenceException, UnsupportedUserAttributeException {

		InitialContext ctx = new InitialContext();
		DataSource ds = (DataSource) ctx.lookup(DATA_SOURCE_NAME);

		Map<String, Object> properties = new HashMap<String, Object>();
		properties.put(PersistenceUnitProperties.NON_JTA_DATASOURCE, ds);

		// As replication will change the underlying database without
		// notifying the hub the JPA cache needs to be disabled.
		// Else the hub might provide outdated data
		properties.put(PersistenceUnitProperties.CACHE_SHARED_DEFAULT, "false");

		return Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME, properties);
	}
}
