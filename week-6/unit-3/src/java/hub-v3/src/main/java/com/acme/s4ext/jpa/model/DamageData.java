package com.acme.s4ext.jpa.model;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.eclipse.persistence.annotations.ReadOnly;

@Entity
@ReadOnly
@Table(schema = "ACME", name = "V_DAMAGE_DATA")
public class DamageData {

	@EmbeddedId
	private DamageDataPK id;

	public DamageDataPK getId() {
		return id;
	}

	public void setId(DamageDataPK id) {
		this.id = id;
	}

}