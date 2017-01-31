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

## TRBL 7: Can I use an already installed eclipse, which is an older version than **NEON**

It's recommended to use **NEON**  for this course. We have tested that all the tools used in the tutorial work well together.
Anyway its not match you have to do. Just download the newest version of Eclipse and unzip it. That's it.

Just follow [Week1, Unit5, 5.1 Install Eclipse Neon IDE]({{base_path}}/week-1/unit-5/#install-eclipse-neon-ide)

## TRBL 8: Eclipse does not behave properly

Sometimes some installed plugins harm each other. So that Eclipse does not behave properly, e.g. stops when open a new installed perspective.

Just give it a try and install a fresh Eclipse and use a new fresh workspace.
That should not take match of your time, it is only an download and an unzip.

Just follow [Week1, Unit5, 5.1 Install Eclipse Neon IDE]({{base_path}}/week-1/unit-5/#install-eclipse-neon-ide)

## TRBL 9: Eclipse does not start with Java Exit Code 13

**Symptom:** The Eclipse program startup fails with error message `Java was started but returned exit code = 13`.

<img src="{{base_path}}/troubleshooting/images/trbl-eclipse/trbl9/pic01--eclipsefailure-javacode13.png" alt="" with="640px" />

**Solution:** To resolve this issue make the following checks:

1.  Make sure to use the Java SDK 8 but not an older version. Reiterate the steps described in [week 1 - unit 5 - step 1.1: Check if a Java 8 SDK is installed]({{base_path}}/week-1/unit-5/#check-if-a-java-8-sdk-is-installed).
2.  **Don't mix-up 32-bit and 64-bit versions of Eclipse and Java SDK 8!** You can not mix-and-match between 32-bit and 64-bit. This is the most frequent cause of an Error 13. To double-check the bit versions of your used Eclipse and Java 8 SDK software proceed as follows:

    -   **Check the Eclipse Neon bit version on Windows OS**: Open `eclipse.ini` in the installation directory and observe the line with text `--launcher.library plugins/org.eclipse.equinox.launcher.win32.win32.x86_64_...`. Look for the substring `x86_64_` indicating the Eclipse 64-bit version or for the substring `x86_32_` indicating the Eclipse 32-bit version.
    -   **Check the Eclipse Neon bit version on Mac OS X**: Go to the _eclipse_ folder and look for the eclipse icon. Right-click on the icon and select **Show Package Contents**. Now go to _Content/MacOS/_ and open the **eclipse.ini** file. Look for the line with substring `macosx.x86_64` indicating the Eclipse 64-bit version or for the substring `macosx.x86` indicating the Eclipse 32-bit version.
    -   **Check the Java SDK 8 version**: Open the console or command line of your operating system. Execute command `java -d64 -version` or `java -d32 -version` and you will get an error for the version that is not supported on your machine.

        <img src="{{base_path}}/troubleshooting/images/trbl-eclipse/trbl9/pic02--check-java-bit-version.png" alt="" with="640px" />

3.  In case the installed Eclipse Neon bit-version does not match with the usded Java SDK 8 bit-version do the following:

    -   Install the appropriate missing bit-version of either Eclipse Neon IDE (see [week 1 - unit 5 - step 5.1: Install Eclipse Neon IDE ]({{base_path}}/week-1/unit-5/#install-eclipse-neon-ide)) or Java SDK 8 (see [week 1 - unit 5 - step 1.2: Install Java 8 SDK]({{base_path}}/week-1/unit-5/#install-java-8-sdk)).

4.  In case you have multiple Java SDK versions installed on your machine you need to point the Eclipse Neon IDE to the right Java SDK 8 executable file by using system environment variables like **PATH** and **JAVA_HOME**. For more details see [stackoverflow - Can't start Eclipse - Java was started but returned exit code=13](http://stackoverflow.com/questions/11461607/cant-start-eclipse-java-was-started-but-returned-exit-code-13)
