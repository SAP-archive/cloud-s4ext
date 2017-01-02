---
title: "Troubleshooting: SAP HANA on SAP HANA Cloud Platform"
excerpt: "Here you can find..."
tags:
  - "Week X - Unit X"
categories:
  - "SAP HANA Cloud Platform: Services"
---

<a name="top"/>

{% include toc %}

{% include base_path %}


## TRBL 1: HANA not running
- As trial, HANA will be stopped each 12 hours - need to restart
- If not started for several days.0, will be deleted.

## TRBL 2: What is the password to access HANA
- User should be ``System`` or ``acme`` - but password you have set
- If you forget system User password you need new HANA > for all other users you can reset using system user

## TRBL 3: Can't create XS project in HANA
Check if User has role developer and package right ``repo root``

## TRBL 4: Can't create HANA view
Check if User has role ``modeling``
