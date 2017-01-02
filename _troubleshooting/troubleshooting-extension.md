---
title: "Troubleshooting: Extension Apps"
excerpt: "Here you can find..."
tags:
  - "Week X - Unit X"
categories:
  - "Extension Apps"
---

<a name="top"/>

{% include toc %}

{% include base_path %}

## TRBL 1: App not loading data
- Timeout? - Refresh and login.
- Caching of old version? - Refresh
- correct path? Search metadata and open with double-click - working?
- backend Hana not Running - Hana: try to call OData service manually (week 4-6)
- backend ABAP not running > try to. All s4 launchpad (week 2-6)
- backend Java not working > try to access index.html (week 5 - 6)

## TRBL 2: Added some product but is not visible

Check if the user that logged in has used English language. For purpose of course we do not support other languages.

## TRBL 3: Collaboration extension ``manage products`` not working -> not loading / creating groups
> Applies to week\<no.>unit\<no>: w3u6

- check if you used name **manageproducts** for the deployed app.
- check if sap jam destination works
- check if new version deployed

## TRBL 4: UX extension manage products not working
> Applies to week\<no.>unit\<no>: w2u5

- check if s4h destination working > check if S/4HANA and SAP Cloud Connector up and running
- check if component preload removed
- check if deployed correctly

## TRBL 5: Analytics extension not working
> Applies to week\<no.>unit\<no>: w4u5

- check if S/4HANA , SAP Cloud Connector and HANA workind
- check if SLT replication job running
- check if HANA OData service working
- check if HANA destination working > URL and user
- check if deployed correctly

## TRBL 5: IoT extension sensor list not working
> Applies to week\<no.>unit\<no>: w5u6

- check if S/4HANA, SAP Cloud Connector, HANA, IoT service running
- check if IoT destination working

## TRBL 6: Can't check in tables / view - Java app not running
- first register a sensor and send some data so we have table t_iot_message

## TRBL 7: No IoT devices in table

- Check if IOT destination there and working
- FIX: Check dependency of app to config such as destination

## TRBL 8: Jam / OData Provsioning not getting data
- Have you enabled owner

## TRBL 9: If i delete product in backend then It disappears in all orders
- Problem in backend logic

## TRBL 10: Recommended start order
1. HANA
2. SAP S/4HANA -> dependency to HANA via replication
3. SAP Cloud Connector
4. Java -> dependency to HANA and S/4HANA
