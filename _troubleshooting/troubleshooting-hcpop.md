---
title: "Troubleshooting: SAP HANA Cloud Platform OData Provisioning"
excerpt: "Here you can find information on how to resolve issues with the SAP HANA Cloud Platform OData provisioning service. This service helps you to expose OData service implementations from your backend system to the SAP HANA Cloud Platform."
tags:
  - "Week 3"
categories:
  - "SAP HANA Cloud Platform: Services"
---

<a name="top"/>

{% include toc %}

{% include base_path %}

## TRBL 1: HCP OData Provisioning service does not let me in

-   Remember to assign role `GW_Admin` to your user ID as described in [week 3 - unit 2 - step 3.2]({{base_path}}//week-3/unit-2/#configure-enabled-odata-provisioning-service).

## TRBL 2: HCP OData Provisioning does not allow use of service

-   Remember to assign role `GW_User` to your user ID as described in [week 3 - unit 2 - step 3.2]({{base_path}}//week-3/unit-2/#configure-enabled-odata-provisioning-service).

## TRBL 3: HCP OData Provisioning does not find service

-   Remember to activate the `sap/iwbep` service with ABAP transaction `sicf`, as described in [week 3 - unit 2 - step 3.4.2]({{base_path}}//week-3/unit-2/#accessibility-on-s4-hana)
-   Do not change the URL `https://s4h:443/sap/iwbep` of the imported destination `s4h-onpremise-http-iwbep`, see [week 3 - unit 2 - step 3.3.2]({{base_path}}//week-3/unit-2/#import-destination)

## TRBL 4: Can't open OData service in HCP OData Provisioning

-   Check if the the `sap/iwbep` service is available, as described in [week 3 - unit 2 - step 3.4.2]({{base_path}}//week-3/unit-2/#accessibility-on-s4-hana)
-   Check if SAP HANA Cloud Connector is up and running, as described in [week 3 - unit 2 - step 1.2]({{base_path}}/week-3/unit-2/#cloud-connector-is-up-and-running)
