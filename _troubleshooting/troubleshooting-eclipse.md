---
title: "Troubleshooting: Eclipse IDE and SAP Eclipse Plugins"
excerpt: "Here you can find hints why your Eclipse setup isn't working"
tags:
  - "Week 1"
  - "Week 2"
categories:
  - "Tools"
---

<a name="top"/>

{% include toc %}

{% include base_path %}

## TRBL 1: Can't install SAP Tools for Eclipse

If you are working behind a firewall you have to set proxies in Eclipse: see [Week 1 - Unit 5 - Configure Proxy Settings]({{base_path}}/week-1/unit-5/#configure-proxy-settings).

If you are still having trouble, try to set up a "fresh" Eclipse, as an already installed plugin might have caused some problems. See [Week 1 - Unit 5 - Step 5]({{base_path}}/week-1/unit-6/#step-5-install-and-configure-sap-tools-for-eclipse) for information on how to install a new Eclipse with SAP Development Tools plugins.

## TRBL 2: Eclipse is broken / won't start

It might help to use a new Eclipse workspace. A workspace is a directory on your file system, where your Eclipse projects are stored. So in case some files inside your projects are causing the issue, it might help to just set up a fresh workspace.

**Steps to create a new Elipse Workspace:**

1.  Open **Eclipse**
2.  **File > Switch Workspace > Other**
3.  Select a new empty folder as you new workspace.

If a new workspace does not help to solve your problems try again with a **new installed Eclipse**.

## TRBL 3: No SAP GUI in ABAP in Eclipse

In the tutorial we are making use of the _ABAP in Eclipse_ plugin. This plugin allows you to connect to a SAP NetWeaver backend system and to develop software in this system from inside your Eclipse IDE. However, in order for this to work you still need to install the _SAP Logon / SAP GUI_.
The installation steps are described in [Week 1 - Unit 6 - Step 2.4]({{base_path}}/week-1/unit-6/#setup-sap-gui-client).

## TRBL 4: Eclipse cannot connect to SAP HANA database

Please check the following:

-   Are you working behind a proxy server? Ensure that the proxies are set in Eclipse: [Week1- Unit5 - Configure Proxy Settings]({{base_path}}/week-1/unit-5/#configure-proxy-settings)
-   Is your HANA database stared? The HANA database in your SAP HANA Cloud Platform trial account is stopped every day. So please check if the database is started.

## TRBL 5: Eclipse cannot reconnect to an already added HANA DB

In trial accounts HANA MDC databases are stopped after a while. HANA MDC databases which are stopped will be deleted after a time.

In both cases you will see a popup with the following content:

    Connecting to SAP HANA Cloud platform System' has encountered a problem.

    Could not connect to SAP HANA Cloud Platform system.

If you expand the **Details** you can find out the root cause.
In case your HANA is stopped you will see:

<img src="{{base_path}}/troubleshooting/images/trbl-eclipse/trbl1/pic01--problem.png" alt="" with="640px" />

In case your HANA is deleted you will see:

<img src="{{base_path}}/troubleshooting/images/trbl-eclipse/trbl1/pic02--hanadeleted.png" alt="" with="640px" />

If your **HANA is stopped** you can follow [Week4, Unit3, Step1.1: Ensure that your SAP HANA database is running]({{base_path}}/week-4/unit-3/#step-11-ensure-that-your-sap-hana-database-is-running) t
to start your HANA database again.

If your database in your HCP trial account has not been started in a while, it might get deleted. If this is the case **HANA is deleted**, unfortunately you have to set up the database with its settings from scratch.

## TRBL 6: I have imported a new project, but can't see it

In this tutorial we are using Eclipse working sets. You might have added the project to a visible working set that is currently not visible in your Eclipse.
To resolve this: Disable the usage of working sets, to see all your projects:

1.  In Eclipse open the **View Menue** in the right upper corner of the Projects tab.
2.  Select **Select Working Set...\***
3.  Select **No Working Sets** and press **OK**

    <img src="{{base_path}}/troubleshooting/images/trbl-eclipse/trbl6/pic01--noworkingset.png" alt="" with="640px" />

4.  Check if you can now find your imported project in the flattened project list.

Learn more details about Eclipse working sets [on help.eclipse.org](http://help.eclipse.org/neon/topic/org.eclipse.platform.doc.user/concepts/cworkset.htm?cp=0_2_1_6)
