package com.acme.s4ext.jpa.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

/*
 * JPA Moddel definition for IoTDevice.
 * Details for IoTDevice can be found in /resources/sqlscripts/T_IOT_DEVICE.sql
 */
@Entity
@Table(schema = "ACME", name = "T_IOT_DEVICE")
public class IoTDevice {

	@Id
	@Column(name = "ID")
	String id;

	@Column(name = "NAME")
	String name;

	// The device type is provided by the SAP HCP IoT service.
	// However, as it s not required it is not persisted to the table.
	@Transient
	String deviceType;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDeviceType() {
		return deviceType;
	}

	public void setDeviceType(String deviceType) {
		this.deviceType = deviceType;
	}
}
