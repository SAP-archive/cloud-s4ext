package com.acme.s4ext.jpa.model;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.eclipse.persistence.annotations.ReadOnly;

import com.acme.s4ext.jpa.model.Equipment;

/*
 * JPA Model definition of SalesOrder.
 * Details for SalesOrder can befound in /resources/sqlscripts/V_SALES_ORDER.sql
 */
@Entity
@ReadOnly
@Table(schema = "ACME", name = "V_SALES_ORDER")
@NamedQuery(name = SalesOrder.FIND_ALL, query = "select s from SalesOrder s order by s.soId")
public class SalesOrder {

	public static final String FIND_ALL = "SalesOrder.findAll";

	@Id
	@Column(name = "NODE_KEY")
	private String nodeKey;

	@Column(name = "SO_ID")
	private String soId;

	@Column(name = "DELIVERY_STATUS")
	private char deliveryStatus;

	@Column(name = "LIFECYCLE_STATUS")
	private char lifecycleStatus;

	@Column(name = "CREATED_AT", scale = 7, precision = 21)
	private BigDecimal createdAt;

	@Column(name = "CHANGED_AT", scale = 7, precision = 21)
	private BigDecimal changedAt;

	@Column(name = "NUMBER_OF_ORDERED_EQUIPMENT")
	private long numberOfOrderedEquipment;

	@Column(name = "NUMBER_OF_REGISTERED_EQUIPMENT")
	private long numberOfRegisteredEquipment;

	//Each sales order has ordered multiple equipment
	//This allows to navigate to the equipment
	@OneToMany(mappedBy = "salesOrder")
	@JoinColumn(name = "PARENT_KEY", referencedColumnName = "PARENT_KEY")
	private List<Equipment> equipment;

	public String getNodeKey() {
		return nodeKey;
	}

	public String getSoId() {
		return soId;
	}

	public char getLifecycleStatus() {
		return lifecycleStatus;
	}

	public char getDeliveryStatus() {
		return deliveryStatus;
	}

	public BigDecimal getCreatedAt() {
		return createdAt;
	}

	public BigDecimal getChangedAt() {
		return changedAt;
	}

	public void setChangedAt(BigDecimal changedAt) {
		this.changedAt = changedAt;
	}

	public long getNumberOfOrderedEquipment() {
		return numberOfOrderedEquipment;
	}

	public long getNumberOfRegisteredEquipment() {
		return numberOfRegisteredEquipment;
	}

	public List<Equipment> getEquipment() {
		return equipment;
	}
}