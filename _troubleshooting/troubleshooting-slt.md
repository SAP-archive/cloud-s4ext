---
title: "Troubleshooting: SAP Landscape Transformation Replication Server (SLT)"
excerpt: "Here you can find..."
tags:
  - "Week X - Unit X"
categories:
  - "SAP S/4HANA NetWeaver Backend"
---

<a name="top"/>

{% include toc %}

{% include base_path %}

# Troubleshooting Guide: SAP Landscape Transformatin (SLT)

<!-- TOC depthFrom:2 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [TRBL 1: SLT Takes too much resources](#trbl-1-slt-takes-too-much-resources)
- [TRBL 2: SLT creation failed -  how clean up ?](#trbl-2-slt-creation-failed-how-clean-up-)
- [TRBL 3: SLT can't start replication](#trbl-3-slt-cant-start-replication)
- [TRBL 4: If I try to create slt job the Button new does not react in Sie](#trbl-4-if-i-try-to-create-slt-job-the-button-new-does-not-react-in-sie)
- [TRBL 5: Data not replicated](#trbl-5-data-not-replicated)
- [TRBL 6: Working with Sample Data](#trbl-6-working-with-sample-data)
- [TRBL 7: Somehow you SLT was messed up and you want to delete SLT_REPLICATION](#trbl-7-somehow-you-slt-was-messed-up-and-you-want-to-delete-slt_replication)
- [TRBL 8: Check the number of rows of the Replicated Data Tables](trbl-8-check-the-nunber-of-rows-of-the-replicated-data-tables)

<!-- /TOC -->

## TRBL 1: SLT Takes too much resources
- minimize number of processes
- not finding db -> check if scc Service Channel there

## TRBL 2: SLT creation failed -  how clean up ?
Acme gets data admin privilege and does cascading delete of slt user.

## TRBL 3: SLT can't start replication
- check if SCC (SAP Cloud Connector) has service channel
- check is user has permissions: create use, create role, create Schema,

## TRBL 4: If I try to create slt job the Button new does not react in Sie
-

## TRBL 5: Data not replicated
- SLT job not active
- FIX: notification of state of notification
- restart job

## TRBL 6: I restored my VM to an old state with missing orders after adding some data and data was replicated to the cloud
- cloud has more data than onpremise
- stop and start replication for all tables.
- fix: if created salesorder then delete
- if created review then delet
- if edited product delete --> add all tables via content help stop / start

## TRBL 7: Working with Sample Data
> Applies to week\<no.>unit\<no>: w3u2, w3u3

In case you have serious reasons to not use SLT but you want to proceed with the next steps, you will need some sample Data in  **HANA**.  

>**WARNING:** If you work with sample data, some of the next units will have restrictions. There will be no automatic update when backed data are changing.

If you have started to replicate data a DB-User SLT_REPLICATION might have created. To have a "clean" state delete this user:

1. Check if a user **SLT_REPLICATION** exists. Expand **Security > Users**.
2. In case you can find the User **SLT_REPLICATION**, open the **Context Menue** and select **Delete**. In the upcomming dialog use the  **Cascade** option.
<img src="{{ base_path }}/troubleshooting/images/trbl-slt/trbl6/pic01--deletesltreplication.png" alt="" with="640px" />

SLT would have replicated Data to the schema **SLT_REPLICATION**. Create such a schema and grant select.

1. Execute the following **sql** (as user ACME). If you don't know how to execute an sql:  Read [HOWOT 1Execute an SQL statement in _hana_](#howto-1-execute-a-sql-statment-in-hana)

   ```sql
      CREATE SCHEMA SLT_REPLICATION;
      GRANT SELECT ON SCHEMA SLT_REPLICATION TO "_SYS_REPO" WITH GRANT OPTION;
   ```

Now you are ready to import the sample data:

1. Download and unzip [hana-slt-sampledata.zip]({{ base_path }}/troubleshooting/imports/trbl-slt/hana-slt-sampledata.zip?raw=true)
2. If you don't have configured a connection HANA DB on HCP in your Eclipse, follow [Week4 Unit2 Step3 Connect SAP HANA Development Environment in Eclipse to HANA DB on HCP](./..week-4/unit-2/#step-3-connect-sap-hana-development-environment-in-eclipse-to-hana-db-on-hcp)
3. In **Eclipse** select your hana and open the **Context Menue** of the **Catalog** and select **Import**.

  <img src="{{ base_path }}/troubleshooting/images/trbl-slt/trbl6/pic02--contextmenueimport.png" alt="" with="640px" />

4. As **Import Location** select **Import catalog from current client** and select unzipped **hana-slt-sampledata** and press **Next**

  <img src="{{ base_path }}/troubleshooting/images/trbl-slt/trbl6/pic03--import.png" alt="" with="640px" />


6. In the **Select Catalog Objects** select all 7 tables and press **Next**.

  <img src="{{ base_path }}/troubleshooting/images/trbl-slt/trbl6/pic04--selecttables.png" alt="" with="640px" />

7. In the "Options for Catalog Object Import"-Dialog you can leave the default value.

   <img src="{{ base_path }}/troubleshooting/images/trbl-slt/trbl6/pic05--importselection.png" alt="" with="640px" />

8. After the successful import expand **Catalog > SLT_REPLICATION > TABLES**.  You should find the imported Tables. If needed you can **Refresch** using the **Context Menu**

   <img src="{{ base_path }}/troubleshooting/images/trbl-slt/trbl6/pic06--tablesimported.png" alt="" with="640px" />

>**Result:** You have no imported sample data, so that you can procced with the nexst steps, but have in mind that those data will not be updated, when backend data are changing.

## TRBL 8: Somehow you SLT was messed up and you want to delete _SLT_REPLICATION_
> Applies to week\<no.>unit\<no>: w4u2

Somehow your SLT setup was messed up. You can't set it up a second time, as a _SLT_REPLICATION_ User and Schema still exist.  

Here the details steps how to get rid of _SLT_REPLICATION_. This will delete the User and the Schema with all data.

1. In _Chrom_ open your **HCP trial account**.
2. Open **Persistence > Databases & Schemas**.
3. In the List you should find your **hana**,  which you created in [Week4 Unit2 STEP1: Create New SAP HANA Database on SAP HANA Cloud Platform]( ./../week-4/unit-2/#step-1-create-new-sap-hana-database-on-sap-hana-cloud-platform)
4. Click on **hana**  to open the **hana-Overview** window.
5.**hana-Overview** window click on the link **SAP HANA Web-based Development Workbench**

  <img src="{{ base_path }}/troubleshooting/images/trbl-slt/trbl7/pic01--openhanaworkbench.png" alt="" with="640px" />

6. In the **SAP HANA Web-based Development Workbench** press **Security**.

  <img src="{{ base_path }}/troubleshooting/images/trbl-slt/trbl7/pic02--hanaworkbench.png" alt="" with="640px" />

7. When asked for the **SAP HANA Logon** login with the your DB User **ACME**.
7. When asked for the **SAP HANA Logon** login with the your DB User **ACME**.
8. Expand the **Users** node and open the **Context Menu** of the **SLT_REPLICATION**-user. Select **DELETE** from the menu.
9. In the **Delete User** dialogue select option **Cascade** and press **OK**.

  <img src="{{ base_path }}/troubleshooting/images/trbl-slt/trbl7/pic03--delete.png" alt="" with="640px" />

> **Result:** You have now deleted the User **SLT_REPLCIATION**. The Schema **SLT_REPLCIATION** is also deleted as this belongs to same user and you used the cascade delete option. You now can proceed to replicate the data as described in [Week4 Unit3]({{ base_path }}/week-4/unit-3/)


## TRBL 9: Check the number of rows of the Replicated Data Tables

After you have replicated the Data, you should find in your **hana** the following count of records.

>**Hint:** find out how to execute an sql here: [HOWOT 1Execute an SQL statement in _hana_](#howto-1-execute-a-sql-statment-in-hana)

Execute the following **sql** statements and check if you get the expected result.

| sql                                                     | Expected Result (number of records)|
|---------------------------------------------------------|-----------------:|
|SELECT COUNT(*) FROM "SLT_REPLICATION"."SNWD_PD";        |123|
|SELECT COUNT(*) FROM "SLT_REPLICATION"."SNWD_REV_HEAD";  |123|
|SELECT COUNT(*) FROM "SLT_REPLICATION"."SNWD_SO";        |701|
|SELECT COUNT(*) FROM "SLT_REPLICATION"."SNWD_SO_I";      |4.117|
|SELECT COUNT(*) FROM "SLT_REPLICATION"."SNWD_SO_SL";     |4.117|
|SELECT COUNT(*) FROM "SLT_REPLICATION"."SNWD_TEXTS";     |5.727|


## HOWTO 1: Execute a SQL statement in _hana_

If you are asked to execute an _SQL_ statement in your _hana_ this are the steps:

1. First of all ensure that your SAP HANA database is running,  follow: [Week4 Unit3 Step 1.1]({{ base_path }}/week-4/unit-3#step-11-ensure-that-your-sap-hana-database-is-running)
2. If you don't have configured a connection HANA DB on HCP in your Eclipse, follow [Week4 Unit2 Step3 Connect SAP HANA Development Environment in Eclipse to HANA DB on HCP](./..week-4/unit-2/#step-3-connect-sap-hana-development-environment-in-eclipse-to-hana-db-on-hcp)
3. In Eclipse select your **hana** system with the name <your hana trail account-hana (ACME)]>. If needed login.
4. Open a _sql_ window by clicking on the **SQL**-icon. A new SQL window will open. Paste or type the sql you want to execute and press the green arrow to execute the sql.
   <img src="{{ base_path }}/troubleshooting/images/trbl-slt/howto1/pic01--executesql.png" alt="" with="640px" />
3. Find the result in the _SQL_-Window. In the _Console_ at the bottom you will find success or error information.

   <img src="{{ base_path }}/troubleshooting/images/trbl-slt/howto1/pic02--sqlresult.png" alt="" with="640px" />
