---
title: "Troubleshooting: SAP HANA Cloud Platform IoT Service"
excerpt: "Here you can find..."
tags:
  - "Week X - Unit X"
categories:
  - "SAP HANA Cloud Platform: Services"
---

<a name="top"/>

{% include toc %}

{% include base_path %}

## TRBL 1: Internal Server Error when creating the _Processing Service Mapping_ in _Message Management Service Cockpit_

You are not able to create the **Processing Service Mapping** :

  <img src="{{ base_path }}/troubleshooting/images/trbl-hcpiot/pic01-savemappingerror.png" alt="" with="640px" />

Check if your HANA DB is up and running, see [Week 4 - Unit 3 - STEP 11]({{ base_path }}/week-4/unit-3/#step-11-ensure-that-your-sap-hana-database-is-running).

## TRBL 2: HCP IoT service not accepting send data

In [Week5 Unit2 Step6]({{ base_path }}/week-5/unit-2/#step-6-send-acceleration-messages-to-the-iotservice) you are sending messages to the IoT service using '''POST https://iotmms{{hcpTrialUserId}}trial.hanatrial.ondemand.com/com.sap.iotservices.mms/v1/api/http/data/{{deviceId}})'''. You are not able to succeed with this step.


* If you are using `Postman`, check you have selected the **IoT Sensor Environment** and that you have configured correct values. Check them again and delete leading or trailing white spaces.
2. In a HCP Trial  account we sometimes saw that the **iotmms** service switch to status _Stopped_. Check the state of the service via **Chrom > open bookmark HCP > Java Applications > iotmms**. In case the application is stopped press the **Start** button.


## TRBL 3: You want to use a workaround for the IoTService, because you have some unsolvable troulbe

TODO: finetune (Britta)

Here is an sql with which you can create the table "ACME"."T_IOT_MESSAGE".

1. Login to the **hana** Database as user **ACME**
2. Create the table "T_IOT_MESSAGE" executing the following sql:

    ```sql
    CREATE ROW TABLE "ACME"."T_IOT_MESSAGE" ( "G_DEVICE" VARCHAR(255) CS_STRING,
    	 "G_CREATED" LONGDATE CS_LONGDATE,
    	 "C_TIMESTAMP" LONGDATE CS_LONGDATE,
    	 "C_ACCX" DOUBLE CS_DOUBLE,
    	 "C_ACCY" DOUBLE CS_DOUBLE,
    	 "C_ACCZ" DOUBLE CS_DOUBLE );
    ```

3. Insert some damage data using the following insert sql. If you like to have more data, just modify the sql.

    ```sql
    insert into "ACME"."T_IOT_MESSAGE" values('5e878f2d-666e-4a07-b0d2-cd8bd739a6aa','30.11.2016 12:32:06.52','30.11.2016 12:32:03.0',0,4151,-0,3861,-0,1825);
    insert into "ACME"."T_IOT_MESSAGE" values('5e878f2d-666e-4a07-b0d2-cd8bd739a6aa','30.11.2016 12:32:11.507','30.11.2016 12:32:08.0',4,0291,0,5061,-0,1409);
    insert into "ACME"."T_IOT_MESSAGE" values('5e878f2d-666e-4a07-b0d2-cd8bd739a6aa','30.11.2016 12:32:16.506','30.11.2016 12:32:13.0',0,4151,-0,3861,-0,1825);
    ```

As you can't create a device you also have to insert devices.

1. As ACME User execute the [T_IOT_DEVICE.sql](/../week-5/unit-5/src/java/hub-v2/src/main/resources/sqlscripts/T_IOT_DEVICE.sql?raw=true)
2. Insert  data via sql:

    ```sql
    insert into "ACME"."T_IOT_DEVICE" values('5e878f2d-666e-4a07-b0d2-cd8bd739a6aa','Sensor01')
    ```
