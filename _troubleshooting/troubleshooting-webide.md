---
title: "Troubleshooting: SAP Web IDE"
excerpt: "Here you can find..."
tags:
  - "Week 2"
  - "Week 3"
categories:
  - "Tools"
---

<a name="top"/>

{% include toc %}

{% include base_path %}

## TRBL 1: Could not open app. Please try again later.

-   Restart your Google Chrome Browser and again login to SAP Web IDE.

## TRBL 2: SAP Web IDE not starting

The Trusted Identity Provider for your SAP HANA Cloud Platform trial account must be set to default = SAP ID Service:

-   In SAP HCP Cockpit select **Security > Trust**
-   In view **Trust Management** select tab **Local Service Provider**
-   Make sure that property **Configuration Type** is set to **default**
-   In tab **Trusted Identity Provider** check that SAP ID Service (name: `accounts.sap.com`) is selected.

## TRBL 3: Imported Application does not start in SAP Web IDE

-   Check if you imported the application project in to the correct directory.

## TRBL 4: "500 Internal Server Error" when testing OData Service connection in SAP Web IDE

**Symptom:** I get a _"500 Internal Server Error"_ when testing the Data connection to the OData Service in the process of creating a new Web IDE project from template.

**Solution:**

-   Clean up the web browser cache as described in [Troubleshooting - TRBL 2: Web IDE Clean-up]({{base_path}}/troubleshooting/troubleshooting-jam/#trbl-2-web-ide-clean-up).
-   Check SAML trusted IdP ID as described in [Troubleshooting - TRBL 3: Check SAML trusted IdP ID]({{base_path}}/troubleshooting/troubleshooting-jam/#trbl-3-check-saml-trusted-idp-id).

## TRBL 5: Basic Authentication comes up when testing HCP Destination access in SAP Web IDE

**Symptom:** Basic Authentication dialog pops up in Web IDE

1. You defined an HCP destination (e.g. s4h-onpremise-http) and when you make use of this HCP destination in the Web IDE (e.g. by opening the 'project from template' wizard and select then in the 'Data Connection' wizard step the destination) you get a window dialog which asks for user/password.
  - The assumption is that the Basic Authentication (i.e. User/Password) of the HCP destination was defined wrongly. Either the User name was wrong or more likely the password was entered wrongly (this could happen easily as the password characters are only shown as star character when typing the password).
2. After the situation in 1. happened the developer will edit the HCP destination and checks that the User name is correct and the password is entered again but really carefully! And DO NOT FORGET to SAVE the changed HCP destination.
  - After this 2. step the developer is trying again to verify if the destination now works in the Web IDE again by opening the 'project from template' wizard and select then in the 'Data Connection' wizard step the destination. The most likely result is: The window dialog which asks for user/password comes up again! And this happens even when the Web IDE was restarted, even when you close the Chrome browser windows and log in to the newly started Web IDE! That is what drives developers crazy: HCP destination has been changed and verified to be correctly defined but the Web IDE still cannot work with it! The reason behind this is, that the Web IDE caches the HCP destinations in "its own way" so that you don't know when the tool updates a changed HCP destination.

**Solution:** Step-by-step solution to overcome the symptom

As you have gone through the above described symptom it might be the case that your NetWeaver backend user (here DEVELOPER) might already be locked (due to the many times the Web IDE or you via the Basic Authentication popup has tried it). After log on 5 times with the wrong password the user is locked for sure. Info: If a the user which is used in a HCP destination is locked in the backend then the Web IDE will always pop up the basic authentication window.

**Step 1:** Test if the back-end user (here DEVELOPER) which is used in the HCP destination is locked already

1. Open **SAP GUI** and log on with the back-end user which you use in the HCP destination (here DEVELOPER)
  - How to do do that is described here: https://sap.github.io/cloud-s4ext/week-1/unit-6/#add-sap-netweaver-to-sap-gui-and-log-on
2. **Check** whether back-end user can log on.
 - If **YES**, then **skip Step 2** and directly execute Step 3.
 - If **NO**, then **execute Step 2 to unlock** the back-end user (here DEVELOPER) first.

**Step 2:** Unlock the locked user (here *DEVELOPER*) with another user (here SAP\*)

1. Open **SAP GUI** and log on with a backend user which is not locked. You can use here **SAP\*** with password **Appl1ance**. Again how to do do that is described here: https://sap.github.io/cloud-s4ext/week-1/unit-6/#add-sap-netweaver-to-sap-gui-and-log-on
2. In the opened SAP GUI window enter **SU01** in the field right to the green 'Enter' icon in the window toolbar in the upper left corner.
3. Click green **Enter** icon to open transaction window **User Maintennance: Initial Screen**.
4. In the _User_ field enter **DEVELOPER**.
5. Click then the **Lock/Unlock icon** from the toolbar.
6. In the opened dialog you can read that the user DEVELOPER is locked and by clicking the Unlock icon in that window.
7. After the DEVELOPER user is unlocked you should be able to log on also with DEVELOPER user to the backend system as described in above Step 1.
8. After you confirmed that Step 1. works you can execute the following Step 3.

**Step 3:** Steps to ensure that Web IDE _really_ takes the new values of a just changed HCP Destination

1. **Close all (!)** your currently opened Chrome Web browser instances.
2. Do **Empty Cache and Hard Reload** by executing the following steps:
 - Open new **Chrome** Web browser.
 - Click **Customize and control Google Chrome** icon (menu icon in upper right corner).
 - Choose **More tools > Developer tools** to open the Chrome developer tools (opening the developer tools in Chrome enables additional useful option on the browser Refresh icon).
 - **Right mouse click** on the **browser Refresh** icon to open the developer menu option.
 - Choose **Empty Cache and Hard Reload** to force the Web browser to empty its cache and reload.
 - **Close** the Chrome **developer tools** again: Find the x icon to close them.
 - Open your **Web IDE** again and log on if requested.

> **Result:** After this procedure a before changed HCP destination is updated and visible in the Web IDE so that you should be able to verify that a corrected HCP destination does not result any more in the Basic Authentication popup.
