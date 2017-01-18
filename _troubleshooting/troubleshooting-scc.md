---
title: "Troubleshooting: SAP HANA Cloud Connector"
excerpt: "Here you can find information how to resolve issues with your SAP HANA Cloud Connector - the tool that connects your on-premises SAP NetWeaver system to your SAP HANA Cloud Platform account."
tags:
  - "Week 2"
categories:
  - "SAP S/4HANA NetWeaver Backend"
---

<a name="top"/>

{% include toc %}

{% include base_path %}

## TRBL 1: Local browser can't access SAP HANA Cloud Connector

Check Network Adapter and port forwarding rule settings in VirtualBox Manager, for more details see [week 1 - unit 6 - step 4.1 Enable Network Access to Linux VM]({{base_path}}/week-1/unit-6/#enable-network-access-to-linux-vm):


## TRBL 2: Destination not working

If you have imported a destination in Cloud Cockpit but the destination is not working.
In the Cloud Cockpit, you can try to test your destination by clicking "Check Connection". If you get an error like the following :

    <img src="{{base_path}}/troubleshooting/images/trbl-netweaver/pic01--firewall.png" alt="" width="640px" />

1.  Check if you have mistyped your password while importing the destination. Try to **Edit** and **Save** the destination with the correct password.

2.  Check if your Cloud Cockpit has connection to the Cloud connector by following the steps as described in [Week 2 - Unit 3 - Check Connection]({{base_path}}/week-2/unit-3/#check-connection-in-hcp-trial-account).

3.  If there is no connection to your Cloud connector, verify your SAP HANA Cloud Connector is running as described in [Week 2 - Unit 5]({{base_path}}/week-2/unit-5/#start-your-sap-cloud-connector).

4.  Check if in your Cloud Connector, if you have exposed Access to S/4 HANA backend system as described in [Week 2 - Unit 3 - Add Access to S/4HANA Back-End System]({{base_path}}/week-2/unit-3/#step-3-add-access-to-s4hana-back-end-system). See your exposed back-end resources in your Cloud Cockpit as shown in step 3.3.

## TRBL 3: Destinations not visible in SAP Web IDE

-   Check if the SAP Web IDE service is enabled, for more details see [week 1 - unit 5 - step 4: Prepare SAP Web IDE]({{base_path}}/week-1/unit-5/#launch-sap-web-ide)
-   It may take some time -> refresh the SAP Web IDE and check if it starts up now.
-   In SAP Web IDE, the Destinations appear in order as the **Description** of the Destination being used. So check if you have an empty description.

## TRBL 4: SAP HANA Cloud Connector (SCC) is not running

-   Check if SAP HANA Cloud Connector instance is up and running: in Linux command shell enter `sudo service scc_daemon status`.
-   **FIX:** auto restart
-   **FIX:** alerting / notification in cockpit
