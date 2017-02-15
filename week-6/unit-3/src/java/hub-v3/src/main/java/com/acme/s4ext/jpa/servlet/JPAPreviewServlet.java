package com.acme.s4ext.jpa.servlet;

import static org.apache.commons.lang3.StringEscapeUtils.escapeHtml4;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.acme.s4ext.jpa.EntityManagerFactoryHandler;
import com.acme.s4ext.jpa.model.Equipment;
import com.acme.s4ext.jpa.model.SalesOrder;

/**
 * Example servlet to show how to read data from SAP HANA on SAP HANA Cloud Platform with a small example.
 * The data will be read and returned as simple HTML table
 */
@WebServlet("/jpaPreview")
public class JPAPreviewServlet extends HttpServlet {

	private static final long serialVersionUID = 4101029857219673405L;

	private static final Logger LOGGER = LoggerFactory.getLogger(JPAPreviewServlet.class);

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		// Get EntityManager
		EntityManager em = getEntityManager();

		// Example: Get equipment and get sales orders
		List<Equipment> equipment = getEquipment(em);
		List<SalesOrder> salesOrders = getSalesOrders(em);

		// To keep it simply we are hard-coding the HTML output for this simple example
		response.setContentType("text/html");
		response.setBufferSize(8192);
		PrintWriter resonseWriter = response.getWriter();
		
		resonseWriter.println(
				"<html><head><title>Hub - JPA Preview</title><meta charset=\"UTF-8\"></head><body>");
		resonseWriter.println("<h1>Hub - JPA Preview</h1>");
		resonseWriter.println("<ul>"//
				+ "<li><a href=\"#Sales Order\">Sales Order</a>: Show all sales orders. The data is provided by the view V_SALES_ORDER.</li>" //
				+ "<li><a href=\"#Equipment\">Equipment</a>: Show all ordered equipment. The data is provided by the view V_EQUIPMENT.</li>" //
				+ "</ul>");

		writeAllSalesOrdersAllEntities(resonseWriter, salesOrders);
		writeAllEquipmentEntities(resonseWriter, equipment);

		em.close();

		resonseWriter.println("</body></html>");
	}

	private EntityManager getEntityManager() throws ServletException {
		EntityManager em = null;
		try {
			EntityManagerFactory emf = EntityManagerFactoryHandler.getEntityManagerFactory();
			em = emf.createEntityManager();
		} catch (Exception e) {
			throw new ServletException("Could not create EntityManager. "//
					+ "Please check if the Database you have configurd at 'javahub' > 'Data Source Binding' is up and running. Details: "
					+ e.getMessage(), e);
		}
		return em;
	}

	@SuppressWarnings("unchecked")
	private List<Equipment> getEquipment(EntityManager em) throws ServletException {
		try {
			return em.createNamedQuery(Equipment.FIND_ALL).getResultList();
		} catch (Exception e) {
			LOGGER.error("Could not read Equipment.", e);
			throw new ServletException(
					"Could not read Equipment from the database. Check if database is running, bound and view ACME.V_EQUIPMENT exists. "
							+ "You can find more details in the default trace log of this application.",
					e);
		}
	}

	@SuppressWarnings("unchecked")
	private List<SalesOrder> getSalesOrders(EntityManager em) throws ServletException {
		try {
			return em.createNamedQuery(SalesOrder.FIND_ALL).getResultList();
		} catch (Exception e) {
			LOGGER.error("Could not read SalesOrders.", e);
			throw new ServletException(
					"Could not read SalesOrders from the database. Check if database is running, bound and view ACME.V_SALES_ORDER exists. "
							+ "Find more details in the default trace log of this application.",
					e);
		}
	}

	/*
	 * Helper to print the content of the equipment view as simple HTML table
	 */
	private void writeAllEquipmentEntities(PrintWriter out, List<Equipment> resultList) throws ServletException {

		//Start Equipment table
		out.println("<h1><a name=\"Equipment\"></a>Equipment</h1>"//
				+ "<p><table border=\"1\"><tr><th colspan=\"10\">"
				+ (resultList.isEmpty() ? "" : resultList.size() + " ")
				+ "entities returned by view ACME.V_EQUIPPMENT</th></tr>");
		
		//Define Table Header
		if (resultList.isEmpty()) {
			out.println("<tr><td colspan=\"10\">Database Table is empty</td></tr>");
		} else {
			out.println("<tr>"
					+ "<th>Equipment Key</th>"
					+ "<th>SalesOrder Node Key</th>"
					+ "<th>Sales Order ID</th>"
					+ "<th>Sales Order Item Position</th>"
					+ "<th>Product ID</th>"
					+ "<th>Product Name</th>"
					+ "<th>Sensor Device registered</th>"
					+ "<th>Sensor Device ID</th>"
					+ "<th>Sensor Device Name</th>"
					+ "<th>Registered Damage Events</th>"
					+ "</tr>");
		}

		//Go through the fetched list of equipment and print it
		for (Equipment equipment : resultList) {
			out.println("<tr>"
					+ "<td>" + escapeHtml4(equipment.getEquipmentKey()) + "</td>"
					+ "<td>" + escapeHtml4(equipment.getSoNodeKey()) + "</td>"
					+ "<td>" + escapeHtml4(equipment.getSoId()) + "</td>"
					+ "<td>" + equipment.getSoItemPos() + "</td>"
					+ "<td>" + equipment.getProductId() + "</td>"
					+ "<td>" + equipment.getProductName() + "</td>"
					+ "<td>" + equipment.getIsRegistered() + "</td>"					
					+ "<td>" + escapeHtml4(equipment.getGDevice()) + "</td>"
					+ "<td>" + escapeHtml4(equipment.getGDeviceName()) + "</td>"
					+ "<td>" + equipment.getCountDamage() + "</td>"
					+ "</tr>");
		}
		//end table
		out.println("</table></p>");
	}

	
	/*
	 * Helper to print the content of the sales order view as simple HTML table
	 */
	private void writeAllSalesOrdersAllEntities(PrintWriter out, List<SalesOrder> resultList) {

		//Start Sales Order table
		out.println("<h1><a name=\"Sales Orders\"></a>SalesOrder</h1>"
				+ "<p><table border=\"1\"><tr><th colspan=\"8\">"
				+ (resultList.isEmpty() ? "" : resultList.size() + " ")
				+ "entities returned by view ACME.V_SALES_ORDERS</th></tr>");
		
		//Define Table Header
		if (resultList.isEmpty()) {
			out.println("<tr><td colspan=\"8\">Database Table is empty</td></tr>");
		} else {
			out.println("<tr>" //
					+ "<th>Sales Order Node Key</th>" 
					+ "<th>Sales Order ID</th>" //
					+ "<th>Delivery Status</th>" //
					+ "<th>Lifecycle Status</th>" //
					+ "<th>Created</th>" //
					+ "<th>Changed</th>" //
					+ "<th>Number of ordered Equipment</th>" //
					+ "<th>Number of Equipment registered to Sensor Device</th>" //
					+ "</tr>");
		}

		//Go through the fetched list of sales orders and print it
		for (SalesOrder order : resultList) {

			out.println("<tr>" //
					+ "<td>" + escapeHtml4(order.getNodeKey()) + "</td>"//
					+ "<td>" + escapeHtml4(order.getSoId()) + "</td>"//
					+ "<td>" + escapeHtml4(String.valueOf(order.getDeliveryStatus())) + "</td>" //
					+ "<td>" + escapeHtml4(String.valueOf(order.getLifecycleStatus())) + "</td>" //
					+ "<td>" + order.getCreatedAt() + "</td>" //
					+ "<td>" + order.getChangedAt() + "</td>" //
					+ "<td>" + order.getNumberOfOrderedEquipment() + "</td>" //
					+ "<td>" + order.getNumberOfRegisteredEquipment() + "</td>" //
					+ "</tr>");
		}
		//end table
		out.println("</table></p>");
	}
}
