package com.acme.s4ext.jpa.dbsetup;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.naming.InitialContext;
import javax.sql.DataSource;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/*
 * Helper class to check if required tables and view are available on application startup.
 * If they are not yet available they will be created.
 */
public class DatabaseEntitySetup {

	//Inner helper class to maintain db entity details
	static class EntityDetail {
		private String entityName;
		private String schema;
		private String type;
		private String resourceName;

		public EntityDetail(String schema, String entity, String type, String resourceName) {

			this.schema = schema;
			this.entityName = entity;
			this.type = type;
			this.resourceName = resourceName;
		}

		@Override
		public String toString() {
			return "EntityDetail [" + schema + "." + entityName + ", type=" + type + "]";
		}

		public String getEntityName() {
			return entityName;
		}

		public String getSchema() {
			return schema;
		}

		public String getType() {
			return type;
		}

		public String getSqlScriptResourceName() {
			return resourceName;

		}

	}

	private static final Logger LOGGER = LoggerFactory.getLogger(DatabaseEntitySetup.class);
	public static final String DATA_SOURCE_NAME = "java:comp/env/jdbc/DefaultDB";

	//Define the date stored in the entity details
	private static final List<EntityDetail> entities = new ArrayList<EntityDetail>() {
		private static final long serialVersionUID = 1L;
		{
			//First add tables
			add(new EntityDetail("ACME", "T_EQUIPMENT2DEVICE", "TABLE", "sqlscripts/T_EQUIPMENT2DEVICE.sql"));
			add(new EntityDetail("ACME", "T_IOT_DEVICE", "TABLE", "sqlscripts/T_IOT_DEVICE.sql"));
			
			// Then add views in order of dependency
			// V_SALES_ORDER requires T_EQUIPMENT2DEVICE 
			// and replicated tables SNWD_SO and SNWD_SO_I
			add(new EntityDetail("ACME", "V_SALES_ORDER", "VIEW", "sqlscripts/V_SALES_ORDER.sql"));
			
			// V_FREE_DEVICE requires T_IOT_DEVICE and T_EQUIPMENT2DEVICE
			add(new EntityDetail("ACME", "V_FREE_DEVICE", "VIEW", "sqlscripts/V_FREE_DEVICE.sql"));

			// V_DAMAGE_DATA requires T_IOT_MESSAGES and T_EQUIPMENT2DEVUCE
			add(new EntityDetail("ACME", "V_DAMAGE_DATA", "VIEW", "sqlscripts/V_DAMAGE_DATA.sql"));
			
			// V_EQUIPMENT requires V_DAMAGE_DATA, T_EQUIPMENT2DEVICE and 
			// replicated tables SNWD_PD, SNWD_TEXTS, SNWD_SO_I
			add(new EntityDetail("ACME", "V_EQUIPMENT", "VIEW", "sqlscripts/V_EQUIPMENT.sql"));
		}
	};

	/*
	 * Helper to check for all required entities if they are existing.
	 * If not, create them by executing the respective SQL statement.
	 */
	final static public void createNotExistingEntities() {
		LOGGER.info("Create Entities started");

		Connection connection;
		try {
			InitialContext ctx = new InitialContext();
			DataSource dataSource = (DataSource) ctx.lookup(DATA_SOURCE_NAME);
			connection = dataSource.getConnection();
		} catch (Exception e) {
			LOGGER.error("Unable to setup the Database Connection: " + e.getMessage(), e);
			return;
		}

		for (EntityDetail entity : entities) {
			try {
				if (entityExists(connection, entity))
					LOGGER.info(entity.toString() + " already exists. Nothing to do. ");
				else {
					String sql = getStringFromResourceFile(entity.getSqlScriptResourceName());
					try {
						executeSql(connection, sql);
						LOGGER.info(entity.toString() + " created. ");
					} catch (SQLException e) {
						LOGGER.error("could not run sql <" + sql + ">: " + e.getMessage(), e);
					}
				}

			} catch (Exception e) {
				LOGGER.error("unexpected Errow occured, while creating " + entity + ": " + e.getMessage(), e);
				return;
			}
		}
	}
	
	/*
	 * Helper to map a given resource name to load the SQL statement that shall be executed
	 */
	private static String getStringFromResourceFile(String resourceName) throws Exception {
		InputStream sqlInputStream = DatabaseEntitySetup.class.getClassLoader().getResourceAsStream(resourceName);
		if (sqlInputStream == null)
			throw new Exception("Could not get resource \"" + resourceName + "\".");
		return IOUtils.toString(sqlInputStream, "UTF-8");

	}

	/*
	 * Helper to execute a SQL statement
	 */
	private static void executeSql(Connection connection, String createSqlString) throws SQLException {

		Statement stmt = connection.createStatement();
		stmt.executeUpdate(createSqlString);
	}

	/*
	 * Helper to find out if a certain entity is already existing.
	 */
	static private boolean entityExists(Connection connection, EntityDetail entity) throws SQLException {
		DatabaseMetaData meta = connection.getMetaData();
		ResultSet rs = meta.getTables(null, entity.getSchema(), entity.getEntityName(), new String[] { entity.getType() });
		while (rs.next()) {
			String entityName = rs.getString("TABLE_NAME");
			if (entityName.equals(entity.getEntityName())) {
				return true;
			}
		}
		return false;
	}
}
