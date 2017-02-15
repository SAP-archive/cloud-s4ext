package com.acme.s4ext.jpa.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.eclipse.persistence.annotations.ReadOnly;

/*
 * JPA Model definition for FreeDevice.
 * Details for FreeDevice are defined in /resources/sqlscripts/V_FREE_DEVICE.sql
 */
@Entity
@ReadOnly
@Table(schema="ACME",name = "V_FREE_DEVICE")
public class FreeDevice {

	@Id
	@Column(name = "ID")
	private String g_device;

	@Column(name = "NAME")
	private String deviceName;

	public String getG_device() {
		return g_device;
	}

	public String getDeviceName() {
		return deviceName;
	}

}