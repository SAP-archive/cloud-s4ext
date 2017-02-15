---
title: "Troubleshooting: SAP HANA Cloud Platform IoT Service"
excerpt: "Here you can find information on how to troubleshoot issues with SAP HANA Cloud Platform, IoT Services."
tags:
  - "Week 5"
  - "Week 6"
categories:
  - "SAP HANA Cloud Platform: Services"
---

<a name="top"/>

{% include toc %}

{% include base_path %}

## TRBL 1: Internal Server Error when creating the _Processing Service Mapping_ in _Message Management Service Cockpit_

You are not able to create the **Processing Service Mapping** :

  <img src="{{base_path}}/troubleshooting/images/trbl-hcpiot/pic01-savemappingerror.png" alt="" with="640px" />

Check if your HANA DB is up and running, see [Week 4 - Unit 3 - STEP 11]({{base_path}}/week-4/unit-3/#step-11-ensure-that-your-sap-hana-database-is-running).

## TRBL 2: HCP IoT service not accepting send data

In [Week5 Unit2 Step6]({{base_path}}/week-5/unit-2/#step-6-send-acceleration-messages-to-the-iotservice) you are sending messages to the IoT service using '''POST https://iotmms{{hcpTrialUserId}}trial.hanatrial.ondemand.com/com.sap.iotservices.mms/v1/api/http/data/{{deviceId}})'''. You are not able to succeed with this step.

-   If you are using `Postman`, check you have selected the **IoT Sensor Environment** and that you have configured correct values. Check them again and delete leading or trailing white spaces.
-   In a HCP Trial  account we sometimes saw that the **iotmms** service switch to status _Stopped_. Check the state of the service via **Chrom > open bookmark HCP > Java Applications > iotmms**. In case the application is stopped press the **Start** button.

## TRBL 3: Not able to see the IoT messages in the custom table T_IOT_MESSAGE in your SAP HANA database in the cloud

In [Week5 Unit3]({{base_path}}/week-5/unit-3), you changed the data soure binding so that the IoT messages are stored in the HANA database in the cloud but still you do not see the data in the schema ACME -> T_IOT_MESSAGE.

1.  Check if you have started your HANA database in the cloud, You can find instructions on how to do this in [Week 4, Unit 3, Step 1.1](../../week-4/unit-3/#step-11-ensure-that-your-sap-hana-database-is-running).
2.  Check if you have changed the data source binding of the **iotmms** application from the default binding and created a datasource binding for the HANA database in the cloud as described in [Week 5 - Step 2.2](../../week-5/unit-3/#change-the-data-source-binding-of-the-iot-service).
3.  Also check if have you restarted the application **iotmms**, so that the new datasource binding is used by the **iotmms** application.
4.  Check if you have configured the SQL mapping (Process service mapping) as shown in [Week 5 - Step 2.3](../../week-5/unit-3/#store-iot-messages-in-table-tiotmessage).
5.  Check if you copied the wrong ID of **Device** and not of **DeviceType** instead or mistyped the **MessageID** when configuring the SQL mapping.
6.  If yes, then delete the old **Process service mapping** and re-do the steps as shown in [Week 5 - Step 2.3](../../week-5/unit-3/#store-iot-messages-in-table-tiotmessage).
7.  Send some acceleration messages as described in [week 5, unit 2, step 6](../../week-5/unit-2/#step-6-send-data-to-hcp-iot-services) and check if the IoT messages are now visible in T_IOT_MESSAGE of the schema **ACME** user.



## TRBL 4: You want to use a workaround for the IoTService, because you have some unsolvable trouble

In case you have an unsolvable problem with the IoTService, but you want to continue with the tutorial, the following steps will help you.

> **Hint:** find out how to execute an sql here: [HOWOT 1Execute an SQL statement in _hana_]({{base_path}}/troubleshooting/troubleshooting-hana/#howto-1-execute-a-sql-statement-in-hana)

Here is an sql with which you can create the table "ACME"."T_IOT_MESSAGE":

1.  Login to the **hana** Database as user **ACME**
2.  Create the table "T_IOT_MESSAGE" executing the following sql:

        CREATE ROW TABLE "ACME"."T_IOT_MESSAGE" ( "G_DEVICE" VARCHAR(255) CS_STRING,
            "G_CREATED" LONGDATE CS_LONGDATE,
            "C_TIMESTAMP" LONGDATE CS_LONGDATE,
            "C_ACCX" DOUBLE CS_DOUBLE,
            "C_ACCY" DOUBLE CS_DOUBLE,
            "C_ACCZ" DOUBLE CS_DOUBLE );

3.  Insert some damage data using the following insert sql. If you like to have more data, just modify the sql.

        insert into "ACME"."T_IOT_MESSAGE" values('5e878f2d-666e-4a07-b0d2-cd8bd739a6aa','30.11.2016 12:32:06.52','30.11.2016 12:32:03.0',0,4151,-0,3861,-0,1825);
        insert into "ACME"."T_IOT_MESSAGE" values('5e878f2d-666e-4a07-b0d2-cd8bd739a6aa','30.11.2016 12:32:11.507','30.11.2016 12:32:08.0',4,0291,0,5061,-0,1409);
        insert into "ACME"."T_IOT_MESSAGE" values('5e878f2d-666e-4a07-b0d2-cd8bd739a6aa','30.11.2016 12:32:16.506','30.11.2016 12:32:13.0',0,4151,-0,3861,-0,1825);

As you also have to create the according Device:

1.  As DD User **ACME** execute the [T_IOT_DEVICE.sql](/../week-5/unit-5/src/java/hub-v2/src/main/resources/sqlscripts/T_IOT_DEVICE.sql?raw=true)
2.  Insert data via sql:

        insert into "ACME"."T_IOT_DEVICE" values('5e878f2d-666e-4a07-b0d2-cd8bd739a6aa','Sensor01')
