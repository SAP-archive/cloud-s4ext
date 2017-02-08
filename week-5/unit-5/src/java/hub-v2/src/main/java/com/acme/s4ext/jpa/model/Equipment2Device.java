package com.acme.s4ext.jpa.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/*
 * JPA Model definition for Equipment2Device
 * Details for Equipment2Device are defined in /resources/sqlscripts/T_EQUIPMENT2DEVICE.sql
 */
@Entity
@Table(schema = "ACME", name = "T_EQUIPMENT2DEVICE")
public class Equipment2Device implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "EQUIPMENT_KEY")
	private String equipmentKey;

	@Column(name = "G_DEVICE", nullable = false, unique = true)
	private String gDevice;

	@Column(name = "G_DEVICE_NAME")
	private String gDeviceName;

	//This will allow to navigate to the details for a specific equipment
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "EQUIPMENT_KEY", updatable = false, insertable = false)
	private Equipment equipment;

	public Equipment2Device() {
	}

	public String getEquipmentKey() {
		return this.equipmentKey;
	}

	public void setEquipmentKey(String equipmentKey) {
		this.equipmentKey = equipmentKey;
	}

	public String getGDevice() {
		return this.gDevice;
	}

	public void setGDevice(String gDevice) {
		this.gDevice = gDevice;
	}

	public String getGDeviceName() {
		return this.gDeviceName;
	}

	public void setGDeviceName(String gDeviceName) {
		this.gDeviceName = gDeviceName;
	}

	public Equipment getEquipment() {
		return equipment;
	}

}