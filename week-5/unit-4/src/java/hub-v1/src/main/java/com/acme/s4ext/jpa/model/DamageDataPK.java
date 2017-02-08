package com.acme.s4ext.jpa.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class DamageDataPK implements Serializable {
	// default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	@Column(name = "G_DEVICE")
	private String gDevice;

	@Column(name = "G_DEVICE_NAME")
	private String gDeviceName;

	@Column(name = "EQUIPMENT_KEY")
	private String equipmentKey;

	@Column(name = "C_TIMESTAMP")
	private Long cTimestamp;

	@Column(name = "ACC_MAGNITUDE")
	private double accMagnitude;

	public DamageDataPK() {
	}

	public String getGDevice() {
		return gDevice;
	}

	public String getGDeviceName() {
		return gDeviceName;
	}

	public String getEquipmentKey() {
		return equipmentKey;
	}

	public Long getCTimestamp() {
		return cTimestamp;
	}

	public double getAccMagnitude() {
		return accMagnitude;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		long temp;
		temp = Double.doubleToLongBits(accMagnitude);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + ((cTimestamp == null) ? 0 : cTimestamp.hashCode());
		result = prime * result + ((gDevice == null) ? 0 : gDevice.hashCode());
		result = prime * result + ((gDeviceName == null) ? 0 : gDeviceName.hashCode());
		result = prime * result + ((equipmentKey == null) ? 0 : equipmentKey.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		DamageDataPK other = (DamageDataPK) obj;
		if (Double.doubleToLongBits(accMagnitude) != Double.doubleToLongBits(other.accMagnitude))
			return false;
		if (cTimestamp == null) {
			if (other.cTimestamp != null)
				return false;
		} else if (!cTimestamp.equals(other.cTimestamp))
			return false;
		if (gDevice == null) {
			if (other.gDevice != null)
				return false;
		} else if (!gDevice.equals(other.gDevice))
			return false;
		if (gDeviceName == null) {
			if (other.gDeviceName != null)
				return false;
		} else if (!gDeviceName.equals(other.gDeviceName))
			return false;
		if (equipmentKey == null) {
			if (other.equipmentKey != null)
				return false;
		} else if (!equipmentKey.equals(other.equipmentKey))
			return false;
		return true;
	}

}