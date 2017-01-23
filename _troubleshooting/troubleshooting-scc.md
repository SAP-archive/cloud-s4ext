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


## TRBL 2: "Check Connection" of the destination "s4h-onpremise-http" in Cloud Cockpit is not successful

You have imported the destination "s4h-onpremise-http" in Cloud Cockpit following the steps described in [Week 2 - Unit 3 - Create HTTP Destination]({{base_path}}/week-2/unit-3/#step-4-create-http-destination-in-hcp-trial-account). You can try to test your destination by clicking "Check Connection" but the destination gives the error like the following :

<img src="{{base_path}}/troubleshooting/images/trbl-scc/pic01--dest-not-working.png" alt="" width="640px"/>

1.  Check if you have mistyped your password while importing the destination. Try to **Edit** and **Save** the destination with the correct password.

2.  Check if your Cloud Cockpit has connection to the Cloud Connector by following the steps as described in [Week 2 - Unit 3 - Check Connection]({{base_path}}/week-2/unit-3/#check-connection-in-hcp-trial-account).

3.  Check if you kept the field **_Location ID_ empty** in [Week 2 - Unit 3 - Step 2.1 Set up Initial Configuration]({{base_path}}/week-2/unit-3/#set-up-initial-configuration). As the additional property `CloudConnectorLocationId` **is not set** in the imported HTTP destination **s4h-onpremise-http** like described in [Week 2 - Unit 3 - Step 4.1 Add a new Connectivity Destination in HCP Trial Account]({{base_path}}/week-2/unit-3/#add-a-new-connectivity-destination-in-hcp-trial-account) it must be kept empty in the account definition on SAP HANA Cloud Connector administration side (see [Week 2 - Unit 3 - Step 2.1]({{base_path}}/week-2/unit-3/#set-up-initial-configuration)). Otherwise the _Check Connection_ test fails.

    > **Note:** In case you added your HCP trial account to SAP HANA Cloud Connector with an explicitly defined (i.e. non-empty) _Location ID_ like _localhostSCC_ you would also need to define this _Location ID_ in the HTTP Destination Configuration of your HCP trial account with _additional property_ `CloudConnectorLocationId = localhostSCC`.  

4.  Open [https://localhost:8443](https://localhost:8443) in your browser and verify if your SAP HANA Cloud Connector is running. If not, start the cloud connector as described in [Week 2 - Unit 5]({{base_path}}/week-2/unit-5/#start-your-sap-cloud-connector).

5.  You should have exposed Access to S/4 HANA backend system in your SAP HANA Cloud Connector as described in [Week 2 - Unit 3 - Add Access to S/4HANA Back-End System]({{base_path}}/week-2/unit-3/#step-3-add-access-to-s4hana-back-end-system). See your exposed back-end resources in your Cloud Cockpit as shown in step 3.3.

6.   Check if your backend SAP Netweaver AS ABAP system is running. If not start  the ABAP system by following the steps in [Week 1 - Unit 6]({{base_path}}/week-1/unit-6/#starting-vm-with-netweaver-as-abap).

## TRBL 3: Destinations not visible in SAP Web IDE

-   Check if the SAP Web IDE service is enabled, for more details see [week 1 - unit 5 - step 4: Prepare SAP Web IDE]({{base_path}}/week-1/unit-5/#launch-sap-web-ide)
-   It may take some time -> refresh the SAP Web IDE and check if it starts up now.
-   In SAP Web IDE, the Destinations appear in order as the **Description** of the Destination being used. So check if you have an empty description.

## TRBL 4: SAP HANA Cloud Connector (SCC) is not running

-   Check if SAP HANA Cloud Connector instance is up and running: in Linux command shell enter `sudo service scc_daemon status`.
-   **FIX:** auto restart
-   **FIX:** alerting / notification in cockpit
