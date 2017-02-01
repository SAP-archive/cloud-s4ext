---
title: "Week 2, Unit 1: Understanding the Challenge"
permalink: /week-2/unit-1/
excerpt: "In this unit you will first get an overview of the **scenario and challenge** for Week 2. Secondly, you will do **hands-on preparation steps** (starting the openSUSE VM and the contained SAP NetWeaver backend system) to prepare your system environment for this weeks' exercises."
header:
  overlay_color: "#333"
  cta_label: "openSAP video"
  cta_url: "https://open.sap.com/courses/hcp3a1/items/5jtQzI31I7trRXgAVi8woJ"
layout: single
sidebar:
  nav: "week-2"
---

<a name="step-1-top"/><a name="step-2-top"/><a name="step-3-1-top"/><a name="step-3-2-top"/><a name="top"/>
<a name="top-1"/><a name="top-2"/><a name="top-3"/><a name="top-4"/><a name="top-5"/><a name="top-6"/><a name="top-7"/><a name="top-8"/><a name="top-9"/><a name="top-10"/>
<a name="top"/>

{% include toc %}

{% include base_path %}

> **Note:** On this page you will only find the presentation slides of the unit, without any additional context or explanations. Therefore **we strongly recommend to watch the [corresponding video](https://open.sap.com/courses/hcp3a1/items/5jtQzI31I7trRXgAVi8woJ)** _(openSAP log-in required)_ in which Thomas Bieser, the course instructor, explains the slides in detail. This will greatly enhance your understanding of this units content.

## Presentation Slides

### Slide 1: Title

<img src="./images/Slide1.JPG" alt=""/>

[Top](#top-1)

### Slide 2: Week Overview

<img src="./images/Slide2.JPG" alt=""/>

[Top](#top-2)

### Slide 3: Unit Overview

<img src="./images/Slide3.JPG" alt=""/>

[Top](#top-3)

### Slide 4: Business Problem for this week

<img src="./images/Slide4.JPG" alt=""/>

[Top](#top-4)

### Slide 5: Solution: Identify IT equipment with low satisfaction rating

<img src="./images/Slide5.JPG" alt=""/>

[Top](#top-5)

### Slide 6: Extension for this week: UX Extension

<img src="./images/Slide6.JPG" alt=""/>

[Top](#top-6)

### Slide 7: Extension Pattern: Point-to-point connectivity via OData

<img src="./images/Slide7.JPG" alt=""/>

[Top](#top-7)

### Slide 8: Path towards the Collaborative Extension

<img src="./images/Slide8.JPG" alt=""/>

[Top](#top-8)

### Slide 9: Involved Roles

<img src="./images/Slide9.JPG" alt=""/>

[Top](#top-9)

### Slide 10: What you've learned in this unit

<img src="./images/Slide10.JPG" alt=""/>

[Top](#top-10)


## System Preparation Steps

### Step 1: VM with SAP NetWeaver AS ABAP is up and running

As we want to make sure that your back-end system is in a defined, up and running state do the following **VM Stop/Start cycle**:

1.  **Stop** SAP NetWeaver AS ABAP and **Close** VM as described in [Week 1, Unit 6, Step 6.4](../../week-1/unit-6/#shutdown-vm-with-netweaver-as-abap).
2.  **Start** latest VM Snapshot **ABAP with License Snapshot** and then SAP NetWeaver AS ABAP as described in [Week 1, Unit 6, Step 6.5](../../week-1/unit-6/#starting-vm-with-netweaver-as-abap).

> **Result:** Your _SAP NetWeaver AS ABAP 7.50 SP02_ system is now up and running with its processes in the openSUSE Linux VM.

[Top](#step-1-top)

### Step 2: Logon to SAP NetWeaver AS ABAP

Verify with the following steps that you can log on to the _SAP NetWeaver AS ABAP_ (running in the VirtualBox VM) using the _SAP Logon_ application in your **_host operating system (OS)_**, i.e. your main Windows / Mac OS installation.

1.  Open **SAP Logon / SAP GUI** application
      - Windows: Find and launch **SAP Logon** in Windows start menu, or by open the **\\&lt;path-to-Program-Files>/SAP/FrontEnd/SAPgui/saplogon.exe** file.
      - Mac OS: Find and launch **SAP GUI** in your app launcher or locate the app in the file path **\\&lt;path-to-Applications>/SAP Clients/SAPGUI/SAPGUI.app**.

    <img src="./images/w2-u1-s/pic01--logon-abap.png"/>

2.  Double-click the **Local NetWeaver** entry to open the logon screen and use the following credentials:
    -   Client: **001**
    -   User: **Developer**
    -   Password: **Appl1ance**
    -   Language: **EN**

    <img src="./images/w2-u1-s/pic02--logon-abap.png"/>

> **Result:** The **SAP Easy Access** default page of the _SAP NetWeaver AS ABAP_ system is now open. Your logged in user **Developer** has access to several transactions and web applications like the SAP Fiori launchpad (FLP) as you will see later.

<img src="./images/w2-u1-s/pic03--logon-abap.png"/>

[Top](#step-2-top)

### Step 3: Open SAP Fiori Launchpad

You have verified in above Step 2 that you can access the _SAP NetWeaver AS ABAP_ and opened the _SAP Easy Access_ page. Now you will verify that the logon page of the sample SAP Fiori Launchpad (FLP) can be opened. This ensures that Fiori applications of the Back-End system can be accessed via Web browser.

1.  In the opened **SAP Easy Access** page:
2.  Select **Favorites > Launchpad** and open context menu (using a right-click).
3.  Click **Change Favorites** entry.

    <img src="./images/w2-u1-s/pic04--flp-app.png"/>

4.  Select and copy the entire **Web Address** URL to your clipboard. The URL is **http://vhcalnplci.dummy.nodomain:8000/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html**
5.  **Close** the _Change Web address or path_ window.

    <img src="./images/w2-u1-s/pic05--flp-app.png"/>

6.  Open a new _Google Chrome_ browser tab.
7.  Paste the before copied FLP URL into the address bar.
8.  Replace the beginning part of the URL **http://vhcalnplci.dummy.nodomain:8000** with **https://localhost:44300**.
9.  Press **Return**.

    <img src="./images/w2-u1-s/pic06--flp-app.png"/>

    > **Result:** In Google Chrome you get informed that your connection is not secure, due to issues with the SSL certificate. (The certificate is issued to a different hostname than localhost.)

    <img src="./images/w2-u1-s/pic07--flp-app.png"/>

10. On the _Your connection is not private_ page, click on the **Advanced** button to enable the _proceed_ link.
12. Click the link **Proceed to localhost (unsafe)** to access the before entered localhost Fiori launchpad URL.

    <img src="./images/w2-u1-s/pic08--flp-app.png" alt="" width="640px"/>

> **Result:** You successfully opened the SAP Fiori launchpad login screen in your web browser from your host OS. This launchpad is hosted on your SAP NetWeaver AS ABAP 7.50 system. This confirms that the system is successfully up and running on the guest OS (Linux VM).

<img src="./images/w2-u1-s/pic09--flp-app.png" alt="" width="640px"/>

[Top](#step-3-1-top)

### Step 4: Create _S/4HANA FLP_ Bookmark

1.  In _Google Chrome_ create a new **bookmark** with name **S/4HANA FLP** for the opened SAP Fiori Launchpad page.

    <img src="./images/w2-u1-s/pic10--flp-app.png" alt="" width="640px"/>

    > **Result:** You have created a new bookmark **S/4HANA FLP** on the bookmark bar of your browser. Click on it to quickly access the SAP Fiori Launchpad (FLP) of the SAP S/4HANA backend system.

2.  **Close** the Web browser window. Later in this week when you need to open the FLP you will just make use of the new **S/4HANA FLP** bookmark.

> **Result:** As you have executed all above steps you have now an up and running _SAP NetWeaver AS ABAP_ in the guest OS (Linux VM) which to which you are connected to via the opened _SAP Logon / SAP GUI_ from your host OS (Windows / Mac OS).

[Top](#step-3-2-top)

[**&lt; Previous** Week 1](../../week-1/) | [**Up ^** Week 2](../) | [**Next >** Unit 2](../unit-2/)
