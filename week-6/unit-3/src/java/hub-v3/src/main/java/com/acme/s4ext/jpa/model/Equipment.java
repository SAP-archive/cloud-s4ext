package com.acme.s4ext.jpa.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import org.eclipse.persistence.annotations.ReadOnly;

import com.acme.s4ext.jpa.model.SalesOrder;

/*
 * JPA Model definition for Equipment.
 * Details for Equipment are defined in /resources/sqlscripts/V_EQUIPMENT.sql
 */
@Entity
@ReadOnly
@Table(schema = "ACME", name = "V_EQUIPMENT")
@NamedQuery(name = Equipment.FIND_ALL, query = "select e from Equipment e order by e.soId")
public class Equipment implements Serializable {
	private static final long serialVersionUID = 1L;
	
	public static final String FIND_ALL = "Equipment.findAll";

	@Id
	@Column(name = "EQUIPMENT_KEY")
	private String equipmentKey;

	@Column(name = "SO_NODE_KEY")
	private String soNodeKey;

	@Column(name = "SO_ID")
	private String soId;

	@Column(name = "SO_ITEM_POS")
	private String soItemPos;

	@Column(name = "PRODUCT_ID")
	private String productId;

	@Column(name = "PRODUCT_NAME")
	private String productName;

	@Column(name = "IS_REGISTERED")
	private int isRegistered;

	@Column(name = "G_DEVICE")
	private String gDevice;

	@Column(name = "G_DEVICE_NAME")
	private String gDeviceName;

	@Column(name = "COUNT_DAMAGE")
	private int countDamage;

	//Equipment originates from a sales order. 
	//This will allow to navigate from the equipment to the sales order with which it was ordered.
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SO_NODE_KEY", updatable = false, insertable = false)
	private SalesOrder salesOrder;

	public Equipment() {
	}

	public String getEquipmentKey() {
		return this.equipmentKey;
	}

	public String getSoNodeKey() {
		return this.soNodeKey;
	}

	public String getSoId() {
		return soId;
	}

	public Object getSoItemPos() {
		return this.soItemPos;
	}

	public Object getProductId() {
		return this.productId;
	}

	public Object getProductName() {
		return this.productName;
	}

	public int getIsRegistered() {
		return isRegistered;
	}

	public String getGDevice() {
		return gDevice;
	}

	public String getGDeviceName() {
		return gDeviceName;
	}

	public SalesOrder getSalesOrder() {
		return salesOrder;
	}

	public int getCountDamage() {
		return countDamage;
	}
}