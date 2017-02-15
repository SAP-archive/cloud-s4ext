---
title: "Troubleshooting: Java Hub Application"
excerpt: "Here you can find information on how to troubleshoot issues with the Java Hub application."
tags:
  - "Week 5"
  - "Week 6"
categories:
  - "Extension Apps"
---

<a name="top"/>

{% include toc %}

{% include base_path %}

## TRBL 1: Cannot start Java Hub application - quota exceeded

After deploying the Java Hub application to your HCP trial account and you are not able to **start** the **hub** application.

If you get the following error message:

    ```
    Unable to start application hub:
    Cannot start 1 'LITE' compute unit(s) for application 'hub' in account 'p1941234567trial'.
    Account quota for size 'LITE': 2; currently in use: 2.
    ```

By default, on a trail account you are only allowed to run one Java Application in your HCP trial account. When deploying the **iotmms** Java application to your HCP account, this quota is raised to two.

In the IoT exercise, you will need to run two applications concurrently: **iotmms** and **hub**. Sometimes, the wrong count of running Java applications is cached in your HCP account. In this case it should help to stop all Java applications and to restart them.

## TRBL 2: Hub application is in **starting** state for long
If you have tried to deploy the Java **hub** application but if the application remains in **starting** state for long,

1.  Open your HCP account <https://account.hanatrial.ondemand.com> and go to your account overview page.
2.  Navigate to **Applications** > **Java Application** to open the your **Java Applications** - dashboard
3.  Click the **hub** application and check the **Default Trace**.
4.  If you have errors like **java.lang.UnsupportedClassVersionError**, you have probably selected the wrong Runtime. You did not select **Java Web Tomcat 8** while deploying your Java application.
5.  **Stop** the **hub** application and **Update** the application as shown in [Week5 Unit4 STEP 5]({{base_path}}/week-5/unit-4/#deploy-java-hub-application-to-hcp).


## TRBL 3: Can't find views/tables in HANA after start of Java Application _hub_

After you have started the _hub_ as described at [Week5 Unit4 STEP 5]({{base_path}}/week-5/unit-4/#step-5-start-the-java-hub-application) you don't find one of the  new Views **V_DAMAGE_DATA**, **V_EQUIPMENT**, **V_FREE_DEVICE**, **V_SALES_ORDER** and or the table  **T_IOT_DEVICE** dose not exist.

#### Check that you have bind your _hub_ application to Database user _ACME_:

1.  In _Chrome_ open your Trial Account
2.  **Applications > Java Applications > hub**
3.  Open the _hub_ dashbord
4.  **Configuration > Data Source Bindings**
5.  Check that you have the correct `<Default>` database configured and your provided password is correct.

    <img src="{{base_path}}/troubleshooting/images/trbl-hub/pic01--hubbindings.png" alt="" with="640px" />

6.  If you find a wrong biding update the binding as described at [Week5 Unit4 step4 4.3 Change the Data Source Binding]({{base_path}}/week-5/unit-4/#change-the-data-source-binding).

#### Check table _T_IOT_MESSAGE_:

The Table T_IOT_MESSAGE hast to exist and has to have expected columns and types.

1.  In _Eclipse_ open the _Systems_ Tab, select your **ACME** System and open a new **SQL**-window.
2.  Copy and past the sql

    ```sql
    select "G_DEVICE","G_CREATED","C_TIMESTAMP","C_ACCX","C_ACCY","C_ACCZ" from "ACME"."T_IOT_MESSAGE"
    ```

    and execute the sql pressing the green button at the right upper corner.

    <img src="{{base_path}}/troubleshooting/images/trbl-hub/pic02--selectiotmessag.png" alt="" with="640px" />

3.  If you get errors, you obvious did not configure the _AccelerationMessageType_ as expected.
4.  Also check that the table definition is correct. Therefore open the ContexteMenu of I_OT_MESSAGES   and select **Open Definition**

    <img src="{{base_path}}/troubleshooting/images/trbl-hub/pic03--iotmessagedefinition.png" alt="" with="640px" />

In case you find out that the Talbe _T_IOT_MESSAGE_ is not well defined do the following:

1.  Create a new Message Type, Device Type and Device as described at [week-5 unit-2 steps 3-5]({{base_path}}/week-5/unit-2/#step-3-create-message-type).
2.  Configure a new **Processing Mapping** as described at [Week 5 unit 3 Step 2.3 Store IoT Messages in Table T_IOT_MESSAGE]({{base_path}}/week-5/unit-3/#store-iot-messages-in-table-t_iot_message)
3.  Delete the old existing Mapping.
4.  **Stop** and **Start** the **iotmms** service to avoid caching problems.
5.  Send sensor messages following [Week 5 Unit2  STEP 6 Send Data to HCP IoT Services]({{base_path}}/week-5/unit-2/#step-6-send-data-to-hcp-iot-services)


## TRBL 4: HTTP Status 500 - Could not read Equipment from database

You have started the _hub_ as described at [Week5 Unit4 STEP 5]({{base_path}}/week-5/unit-4/#step-5-start-the-java-hub-application). When you start the **hub** application and click the **jpaPreview** like the URL [https://hubp19411111trial.hanatrial.ondemand.com/hub/jpaPreview](https://hubp1942393644trial.hanatrial.ondemand.com/hub/jpaPreview), you get an error as shown below:

<img src="{{base_path}}/troubleshooting/images/trbl-hub/pic05--no-tables.png" alt="" with="640px" />

- You should check the same solution as described in [TRBL 3](#trbl-3-cant-find-viewstables-in-hana-after-start-of-java-application-hub).

## TRBL 5: No IoT devices found in OData service _odata.csv/IoTDevices_  or in table _T_IOT_DEVICE_

After you have deployed the hub in v2 you have started the hub as describe at [Week 5 Unit5 STEP 3: Build and Deploy the hub]({{base_path}}/week-5/unit-5/#step-3-build-and-deploy-the-hub), but you can't find any Device in according OData request or in the Table _T_IOT_DEVICE_

#### First of all find out which devices you created

1.  In the _Chrome_ open the tab **IOT Service Cockpit** ( **HCP trial account > Services > Internet of Things Services > Go to Service**)
2.  Open the Devices, if you don't have a device in the list create a new Device. Find more Details at [WEEK 5]({{base_path}}/week-5/unit-2/#step-5-create-a-new-device)

#### Check the configuration of the Destination _iot-internet-http_

The Destination _iot-internet-http_ needs to be configured. A wrong _Password_ might also cause troubles.

1.  In _Chrom_ open your **HCP trial account**
2.  Select **Connectivity > Destinations**
3.  Check if you find the destination with name **iot-internet-http** in the list.
4.  If destination does not exist, import the destination following  [Week5 Unit2 STEP8: Import Destination _iot-internet-http_]({{base_path}}/week-5/unit-2/imports/destinations/iot-internet-http.properties?raw=true)).
5.  If the Destination exists, compare all its values with [Week5 Unit2 /imports/destinations/iot-internet-http.properties]({{base_path}}/week-5/unit-2/imports/destinations/iot-internet-http.properties) and in case of errors update the destination.

    > **Hint:** Due to the fact that Destniatins are cached, wait some minits to get the change active.

#### Restart _hub_

In case of some unexpected error, the schedule job  might have been broken. Try if **Stop** and **Start** helps to heal.

#### Search for other reasons in the _Defaut Trace_

Open the _Default Trace_ of the _hub_ application and try to find out if some log is written, which helps you:

1.  Open your **Trial Account in _Chrom_**
2.  Open **Java Applications > hub**
3.  In the opened _hub_ dashboard click use the glaces or the download link to open the **Default Trace**

    <img src="{{base_path}}/troubleshooting/images/trbl-hub/pic04--defaulttrace.png" alt="" with="640px" />
