---
title: "Troubleshooting: SAP HANA database on SAP HANA Cloud Platform"
excerpt: "Here you can find..."
tags:
  - "Week 4"
categories:
  - "SAP HANA Cloud Platform: Services"
---

<a name="top"/>

{% include toc %}

{% include base_path %}

## TRBL 1: SAP HANA Database is not running

On SAP HANA Cloud Platform trial accounts some restrictions apply to the HANA database ([see SAP HANA Cloud Documentation](https://help.hana.ondemand.com/help/frameset.htm?920f2440fad245da93604c2623f0426a.html)):
You need to repeatedly restart a shut-down HANA database instance after 12 hours and before 7 days to avoid its deletion!

-   The trial tenant database will be stopped each 12 hours! It will be shut down automatically after this period to free resources.
-   If you do not use the tenant database for 7 days, it will be deleted automatically to free the consumed disk space.
-   Backup is not enabled and no recovery is possible.
-   You can create only one trial tenant database in the account.

## TRBL 2: What is the password to access the HANA database?

-   User should be `SYSTEM` or `ACME` with the passwords you set on your own as described in [week 4 - unit 2 - steps 1, 2]({{base_path}}/week-4/unit-2/)

## TRBL 3: I get a "wrong credentials" when I login to HANA - I have forgotten my password.

If you try to login several times with the wrong user credentials, the Status of the Database user will turn to **Deactivated**, so that even if you use the correct password, you can't login any longer.

If you have deactivated the **SYSTEM**- **AND** the **ACME**-user you will not be able to access your trial **hana** database again.

If you have deactivated/forgotten the password of the **ACME** user, you can reactivate the **SYSTEM** User and give him a new Password and via versa.

This are the Steps, when you still know the password of **SYSTEM**:

1. If not already done add the Database User **System** to your Eclipse following [week4 unit2 Step 3: Connect SAP HANA Development Environment in Eclipse to HANA DB on HCP]({{base_path}}/week-4/unit-2/#step-3-connect-sap-hana-development-environment-in-eclipse-to-hana-db-on-hcp) but doing it for the **SYSTEM** User.
2. Expand **Users** and select the **ACME** user
3. If the status of the user **ACME** is **Deactivated** press the **activate User**-button in the upper right corner.

	<img src="{{base_path}}/troubleshooting/images/trbl-hana/trbl3/pic01--deactivateduser.png" alt="" with="640px" />

4. If needed give new password and press the **Save** Button.

	<img src="{{base_path}}/troubleshooting/images/trbl-hana/trbl3/pic02--changepwd.png" alt="" with="640px" />

5. Now your should be able to login again.

> **Warning:** depending on which week you have already done, you might have to update a the new PWD for the User ACME at different places:
>
> - java application **iotmms** java source binding: [week5 unit3 Step 2.1 Change the Binding of the IoT Service]({{base_path}}/week-5/unit-3/#change-the-binding-of-the-iot-service)
> - java application **hub**  data source binding: [week5 unit4 step 4.3 Change the Data Source Binding]({{base_path}}/week-5/unit-4/#change-the-data-source-binding)


## TRBL 4: Can't create XS project in HANA

Check if the HANA database user `ACME` has the granted role `sap.hana.xs.ide.roles::Developer` and the package privilege `.REPO_PACKAGE_ROOT` as described in [week 4 - unit 2 - step 2]({{base_path}}/week-4/unit-2/#step-2-create-database-user-acme-in-sap-hana-cockpit).

## TRBL 5: Problems with product.calculationview

Check if the HANA database user `ACME` has the granted role `MODELING` as described in [week 4 - unit 2 - step 2]({{base_path}}/week-4/unit-2/#step-2-create-database-user-acme-in-sap-hana-cockpit).

## HOWTO 1: Execute a SQL statement in _hana_

If you are asked to execute an _SQL_ statement in your _hana_ this are the steps:

1.  First of all ensure that your SAP HANA database is running,  follow: [Week4 Unit3 Step 1.1]({{base_path}}/week-4/unit-3#step-11-ensure-that-your-sap-hana-database-is-running)
2.  If you don't have configured a connection HANA DB on HCP in your Eclipse, follow [Week4 Unit2 Step3 Connect SAP HANA Development Environment in Eclipse to HANA DB on HCP]({{base_path}}/week-4/unit-2#step-3-connect-sap-hana-development-environment-in-eclipse-to-hana-db-on-hcp).
3.  In Eclipse select your **hana** system with the name &lt;your hana trail account-hana (ACME)]>. You might be asked to login.
4.  Open a _sql_ window by clicking on the **SQL**-icon. A new SQL window will open. Paste or type the sql you want to execute and press the green arrow to execute the sql.
    <img src="{{base_path}}/troubleshooting/images/trbl-hana/howto1/pic01--executesql.png" alt="" with="640px" />
5.  Find the result in the _SQL_-Window. In the _Console_ at the bottom you will find success or error information.

    <img src="{{base_path}}/troubleshooting/images/trbl-hana/howto1/pic02--sqlresult.png" alt="" with="640px" />
