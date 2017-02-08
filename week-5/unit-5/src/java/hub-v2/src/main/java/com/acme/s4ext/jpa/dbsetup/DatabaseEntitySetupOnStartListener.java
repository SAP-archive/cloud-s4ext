package com.acme.s4ext.jpa.dbsetup;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/*
 * Listener for the application start.
 * Registered in /webapp/WEB-INF/web.xml
 */
public class DatabaseEntitySetupOnStartListener implements ServletContextListener {

	// Call the DatabaseEntitySetup to create tables and view on application start.
	@Override
	public void contextInitialized(ServletContextEvent sce) {
		DatabaseEntitySetup.createNotExistingEntities();

	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		// nothing to do
	}

}
