---
title: "Troubleshooting: SAP Landscape Transformation Replication Server (SLT)"
excerpt: "Here you can find information on how to troubleshoot issues with the **SAP Landscape Transformation Replication Server (SLT)**"
tags:
  - "Week 4"
  - "Week 6"
categories:
  - "SAP S/4HANA NetWeaver Backend"
---

<a name="top"/>

{% include toc %}

{% include base_path %}

## TRBL 1: SLT Replication is not working

1.  Please verify that the service channel in SAP HANA Cloud Connector, is still working.
    -  SAP HANA MDC database in the cloud is stopped every 12 hours. This breaks the service channel. Start your HANA database as described in  [week 4, unit 3, step 11]({{base_path}}/week-4/unit-3/#step-11-ensure-that-your-sap-hana-database-is-running).
    -  We have seen cases in which the system load inside the VM was so high, that the **Service Channel** established by the **SAP HANA Cloud Connetor** stopped working (even though the rest of the Cloud Connector looks fine.)-> thus causing the SLT replication to stop. So start the service channel as described in [week 4, unit 3, step 3]({{base_path}}/week-4/unit-3/#step-3-set-up-service-channel-in-sap-hana-cloud-connector).
    -  You might have to **DISABLE** the service channel first, and then **Activate** it again. Then the SLT replication should resume automatically.

    <img src="{{base_path}}/troubleshooting/images/trbl-slt/trbl1/pic02--enable-service-channel.png" alt="" with="640px" />

2.  You could try to reduce the number of processes to reduce the load on your system.
    -  Open your replication job as shown in [Week 4, Unit 3, Step 4.11]({{base_path}}/week-4/unit-3/#step-4-set-up-data-replication-job-between-backend-system-and-your-hana-db-on-hcp).
    -  Switch to the tab **Administration Data**.
    -  Click the button **Change No. of Jobs** to reduce the number of processes.

    <img src="{{base_path}}/troubleshooting/images/trbl-slt/trbl1/pic01--change-slt-jobs.png" alt="" with="640px" />


## TRBL 2: How to reset your SAP HANA database to the state before replication

Somehow your SLT Replication is not working. You now want to set it up again, but you can't set it up a second time, as the _SLT_REPLICATION_ user/schema/roles still exist in the HANA database in the cloud.

First you need to clean up your HANA Development Project and then delete all SLT_REPLICATION artifacts from the SAP HANA database in your HANA Cloud Platform account:

1.  Open your Eclipse IDE and switch to the **SAP HANA Development** perspective. Log on to your SAP HANA database with your **ACME** user credentials.
2.  Expand **Security > Users**.
3.  In case the user **SLT_REPLICATION** exists, open the **Context Menu** for this user and select **Delete**. In the upcoming dialog use the  **Cascade** option.
    <img src="{{base_path}}/troubleshooting/images/trbl-slt/trbl6/pic01--deletesltreplication.png" alt="" with="640px" />

4.  Here are the SQL statements to delete all SLT_REPLICATION artefacts from the SAP HANA Database:

    ```sql
    DROP USER SLT_REPLICATION CASCADE;
    DROP ROLE SLT_REPLICATION_DATA_PROV;
    DROP ROLE SLT_REPLICATION_POWER_USER;
    DROP ROLE SLT_REPLICATION_SELECT_USER;
    DROP ROLE SLT_REPLICATION_USER_ADMIN;
    ```

> **Hint:** Find out how to execute an SQL statement on your SAP HANA database here: [HOWTO 1: Execute an SQL statement in _hana_]({{base_path}}/troubleshooting/troubleshooting-hana/#howto-1-execute-a-sql-statement-in-hana)


> **Result:** You have now deleted the user **SLT_REPLICATION** and its roles. The schema **SLT_REPLICATION** is also deleted, as it belongs to same user and you used the cascade delete option. After you delete the replication job **SLT_REPLICATION**, You now can proceed to replicate the data as described in [Week 4, Unit 3]({{base_path}}/week-4/unit-3/)

## TRBL 3: Check the number of rows of the Replicated Data Tables

After you have replicated the Data, you should find in your **hana** the following count of records.

> **Hint:** find out how to execute an sql statement here: [HOWTO 1: Execute an SQL statement in _hana_]({{base_path}}/troubleshooting/troubleshooting-hana/#howto-1-execute-a-sql-statement-in-hana)

Execute the following **sql** statements and check if you get the expected number of records as a result.

| sql                                                        | Expected Result (number of records) |
| ---------------------------------------------------------- | ----------------------------------: |
| `SELECT COUNT(*) FROM "SLT_REPLICATION"."SNWD_PD";`        |                                 123 |
| `SELECT COUNT(*) FROM "SLT_REPLICATION"."SNWD_REV_HEAD";`  |                                 123 |
| `SELECT COUNT(*) FROM "SLT_REPLICATION"."SNWD_SO";`        |                                 701 |
| `SELECT COUNT(*) FROM "SLT_REPLICATION"."SNWD_SO_I";`      |                               4.117 |
| `SELECT COUNT(*) FROM "SLT_REPLICATION"."SNWD_SO_SL";`     |                               4.117 |
| `SELECT COUNT(*) FROM "SLT_REPLICATION"."SNWD_TEXTS";`     |                               5.727 |

## TRBL 4: Skipping the replication of data definition tables
We are aware that SLT is taking up a lot of system resources. If you are doing the course with the minimum system requirements, you might run into issues during SLT replication. If the SLT replication job hangs and does not continue the replication, you might want to skip the load and replication of data definition tables (DD02L, DD08L, DD02T). These data definition tables are huge and not needed for this course.

1.  If you already have a replication job which is hanging, Open the SLT replication job as described in [Week 4, Unit 3, Step 4.11]({{base_path}}/week-4/unit-3/#step-4-set-up-data-replication-job-between-backend-system-and-your-hana-db-on-hcp). Else you can skip to step 6.
2.  In the tab **Table Overview**, click on **Data Provisioning**.
3.  Click on the icon for Multiple selection to the right of the text field.

    <img src="{{base_path}}/troubleshooting/images/trbl-slt/trbl4/pic02--multi-select.png" alt="" with="640px" />

4.  Enter the table names DD02L, DD08L, DD02T) and select **Stop Load/Replication**.
5.  Click on **Execute**. Now the replication of these tables are stopped.
6.  Open the transaction **/nse16** and enter **IUUC_REPL_HEAD** for the table name and press enter.
7.  Press **Execute** to view the table contents.

    <img src="{{base_path}}/troubleshooting/images/trbl-slt/trbl4/pic01--change-data-def-tables.png" alt="" with="640px" />

8.  Select one of the entries (DD02L, DD08L, DD02T) and click on **Change**.

     <img src="{{base_path}}/troubleshooting/images/trbl-slt/trbl4/pic02--change-data-def-tables.png" alt="" with="640px" />

9.  Change the value of **Behaviour** to 1 and click **Save** to save the changes.
10. Repeat the same steps for all the 3 tables, DD02L, DD08L, DD02T.
11. Now, these data definiton tables will just be created but not loaded with data. This way you could save the resources which would be used for replicating these tables.
12. If the replication job was already hanging/stopped, check and activate the replication job.

    <img src="{{base_path}}/troubleshooting/images/trbl-slt/trbl4/pic01--activate-slt-job.png" alt="" with="640px" />

## TRBL 5: Import sample data to your SAP HANA database (instead of using SLT)

We are aware that SLT is taking up a lot of system resources. If you are doing the course with the minimum system requirements, you might run into issues due to the SLT replication. In the troubleshooting step \#1 we show you how to reduce the number of work processes doing the replication. However, if the replication keeps on failing, and you can'T get it to work, **AS A LAST RESORT**, we have prepared some **sample data that you can import into your HANA database in your HCP account.** This will enable to go on with the exercises. However, please note that **you will not see updates** (e.g. whenever equipment is ordered in your backend in week 4; or when the order status is changed in week 6) **in your HANA database if you use the sample data,** but the SLT replication is not working.

In case you have serious reasons to not use SLT but you want to proceed with the next steps, you will need some sample Data in  **HANA**.

> **WARNING:** If you work with sample data, some of the next units will have restrictions. There will be no automatic update when backed data are changing.

If you have started to replicate data, a SAP HANA database user SLT_REPLICATION should have been created. To have a "clean" state, you need to delete this user as follows:

1.  Open your Eclipse IDE and switch to the **SAP HANA Development** perspective. Log on to your SAP HANA database with your **ACME** user credentials.
2.  Expand **Security > Users**.
3.  In case the user **SLT_REPLICATION** exists, open the **Context Menu** for this user and select **Delete**. In the upcoming dialog use the  **Cascade** option.

    <img src="{{base_path}}/troubleshooting/images/trbl-slt/trbl6/pic01--deletesltreplication.png" alt="" with="640px" />

4.  The SLT replication, would have replicated data to the schema **SLT_REPLICATION**. As you are not using SLT, you now have to create this schema manually and GRANT SELECT for this database schema: To do so, execute the following **sql statments** (as user **ACME**).

    ```sql
       CREATE SCHEMA SLT_REPLICATION;
       GRANT SELECT ON SCHEMA SLT_REPLICATION TO "_SYS_REPO" WITH GRANT OPTION;
    ```

	   > **Hint:** If you don't know how to run an SQL statement read the following troubleshooting guide: [HOWTO 1: Execute an SQL statement in _hana_]({{base_path}}/troubleshooting/troubleshooting-hana/#howto-1-execute-a-sql-statement-in-hana)


Now you are ready to import the sample data:

1.  Download the following archive and extract it to your local file system: [hana-slt-sampledata.zip]({{base_path}}/troubleshooting/imports/trbl-slt/hana-slt-sampledata.zip?raw=true)
2.  In **Eclipse** select your SAP HANA database, right-click on **Catalog** to open the **Context Menu** and select **Import**.

    <img src="{{base_path}}/troubleshooting/images/trbl-slt/trbl6/pic02--contextmenueimport.png" alt="" with="640px" />

3.  As **Import Location** select **Import catalog from current client**, then select the extracted **hana-slt-sampledata** folder and click on **Next**

    <img src="{{base_path}}/troubleshooting/images/trbl-slt/trbl6/pic03--import.png" alt="" with="640px" />

4.  In the **Select Catalog Objects** select all 7 tables and press **Next**.

    <img src="{{base_path}}/troubleshooting/images/trbl-slt/trbl6/pic04--selecttables.png" alt="" with="640px" />

5.  In the **Options for Catalog Object Import**-dialog, leave the default values.

    <img src="{{base_path}}/troubleshooting/images/trbl-slt/trbl6/pic05--importselection.png" alt="" with="640px" />

6.  After you successfully imported the files, expand **Catalog > SLT_REPLICATION > TABLES**.  You should find the imported tables. If you can't see the tables, you should do a **Refresh** using the **Context Menu**

    <img src="{{base_path}}/troubleshooting/images/trbl-slt/trbl6/pic06--tablesimported.png" alt="" with="640px" />

> **Result:** You have now imported sample data, so that you can procced with the nexst steps, but have in mind that those data will not be updated, when backend data are changing.


If you **can't remember if you are working with sample data or not**:

1. run the follwing SQL statement:

    ```sql
    SELECT TOP 1000 * FROM "SLT_REPLICATION"."SAMPLE_DATA"
    ```
2. If you can execute the SQL statement and get `You are using imported sample data!`, you are working with sample data.


If you later want to switch on the SLT replication again, just drop the schema **SLT_REPLICATION** before replication as desribed in [TRBL 2](#trbl-2-how-to-reset-the-sap-hana-database).
