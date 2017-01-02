---
title: "Troubleshooting: Eclipse IDE and SAP Eclipse Tools"
excerpt: "Here you can find hints why your Eclipse setup isn't working"
tags:
  - "Week 1 - Unit 5"
  - "Week 2 - Unit 2"
  - "Week 4 - Unit 2"
categories:
  - "Tools"
---

<a name="top"/>

{% include toc %}

{% include base_path %}


## TRBL 1: Can't install SAP Tools for Eclipse

> Applies to week\<no.>unit\<no>: w1u5 Step 5

If you are working behind a firewall you have to set proxies in Eclipse: see [Week1 - Unit5 - Configure Proxy Settings]({{base_path }}/week-1/unit-5/#configure-proxy-settings).

If you still have trouble, install a new "empty" Eclipse as an already installed plugin might have caused some problems. See [Week 1 - Unit 5 - Step 5]({{ base_path }}/week-1/unit-6/#step-5-install-and-configure-sap-tools-for-eclipse) to install new Eclipse and install the SAP tools for Eclipse.

## TRBL 2: Eclipse seems broken

It might help to use a new Workspace.
  
Steps to create a **new Elipse Workspace**: 
  
  1. Open **Eclipse**
  2. **File > Switch Workspace > Other**  
  3. Select a new empty folder as you new workspace. 

If a new workspace does not help to solve your problems try again with a **new installed Eclipse**.   


## TRBL 3: No sap GUI in ABAP in Eclipse
> Applies to week\<no.>unit\<no>: w2u2

You need to install the SAP GUI client for Windows or JavaGUI for Mac as described in [Week 1 - Unit 6 - Step 2.4]({{ base_path }}/week-1/unit-6/#install-sap-gui-client).


## TRBL 4: Eclipse not connecting to HANA DB 

> Applies to week\<no.>unit\<no>: w4u2 Step3 

If you are working behind a firewall you have to set proxies in Eclipse: see [Week1- Unit5 - Configure Proxy Settings]({{base_path }}/week-1/unit-5/#configure-proxy-settings)

## TRBL 5: Eclipse cannot reconnect to an already added HANA DB 

> Applies to week\<no.>unit\<no>: w4u2

In trial accounts HANA MDC databases are stopped after a while. HANA MDC databases which are stopped will be deleted after a time. 

In both cases you get a popup with the following contend: 
  ```
  Connecting to SAP HANA Cloud platform System' has 
  encountered a problem. 

  Could not connect to SAP HANA Cloud Platform system
  ```
  
If you expand the **Details>>** you can find out the root cause. 
In case your HANA is stopped you will have:
 
<img src="{{ base_path }}/troubleshooting/images/trbl-eclipse/trbl1/pic01--problem.png." alt="" with="640px" />

In case your HANA is deleted you will have: 

<img src="{{ base_path }}/troubleshooting/images/trbl-eclipse/trbl1/pic02--hanadeleted" alt="" with="640px" />


If your **HANA is stopped** you can follow [Week4 Unit3 Step1.1 Ensure that your SAP HANA database is running]{{base_path }}/week-4/unit-3/#step-11-ensure-that-your-sap-hana-database-is-running t
to start your HANA again. 
  
If your **HANA is deleted** you have bad luck and have to create a new DB.

In Raw cases we had the experience that the order in which you opened the systems in eclipse matters. 
It might fail if you have opened a transaction in the ABAP backind first. So the order matters.
TODO: elaborate


