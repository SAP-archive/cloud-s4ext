---
title: "Troubleshooting: Miscellaneous"
excerpt: "Here you can find miscellaneous troubleshooting tips."
tags:
  - "Week 1"
  - "Week 2"
  - "Week 3"
  - "Week 4"
categories:
  - "Miscellaneous"
---

<a name="top"/>

{% include toc %}

{% include base_path %}

## TRBL 1: Recommended Start Order

| start                           | since       | details                                                                                                                                                  |
| :------------------------------ | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| HANA Database                   | Week4 Unit3 | [Week4 Unit3 STEP1.1 Ensure that your SAP HANA database is running]({{base_path}}/week-4/unit-3/#step-11-ensure-that-your-sap-hana-database-is-running) |
| NetWeaver AS ABAP on running VM | Week1 Unit6 | [Week1 Unit6 STEP 6.5 Starting VM with NetWeaver AS ABAP]({{base_path}}/week-1/unit-6/#starting-vm-with-netweaver-as-abap)                              |
| SAP Cloud Connector(SCC)        | Week2 Unit3 | [Week3 Unit2 STEP 1.2 Cloud Connector is up and running]({{base_path}}/week-3/unit-2/#cloud-connector-is-up-and-running)                                |
| java application _iotmms_       | Week5 Unit2 | HCP Account > Java Applications > iotmms                                                                                                                 |
| java application _hub_          | Week5 Unit4 | HCP Account > Java Applications > hub                                                                                                                    |

## TRBL 2: Chrome: Allow invalid certificates for resources loaded from localhost

When you are calling UIs running on your local SAP S/4HANA system (e.g. _https://localhost:44300_) your browser will tell you that no valid certificate is available. In Google Chrome you can disable these warnings by allowing requests to localhost over HTTPS even when an invalid certificate is presented. You can change this setting here: [chrome://flags#allow-insecure-localhost](chrome://flags#allow-insecure-localhost) (you need to enter this URL manually into Chrome.)

## TRBL 3: Internet Communication does not work with Proxy Server in Place

When you are working inside an enterprise network with a proxy server in place your development environment must be properly configured in several programs.

As depicted in the following diagram a network connection must be established between several programs running in the corporate network, the proxy server and your HCP trial account.

![devenvwithproxy]({{base_path}}/troubleshooting/images/trbl-misc/pic01-trbl-network-proxies.png)

Visit the following sections from weeks 1 and 2 that describe how to configure proxy settings in various programs of your development environment:

| Application                         | Week - Unit - Section                                                                                               | Operating System              |
| :---------------------------------- | :------------------------------------------------------------------------------------------------------------------ | :---------------------------- |
| Eclipse                             | [Week 1 - Unit 5 - 5.2 Configure Proxy Settings]({{base_path}}/week-1/unit-5/#configure-proxy-settings)         | Host OS                       |
| Maven Plugin                        | [Week 1 - Unit 5 - 6.2 Configure Proxy for Maven]({{base_path}}/week-1/unit-5/#configure-proxy-for-maven)       | Host OS                       |
| VirtualBox Manager                  | [Week 1 - Unit 6 - 3.1 Configure Internet Proxy]({{base_path}}/week-1/unit-6/#configure-internet-proxy)         | Host OS                       |
| YaST (in VirtualBox)                | [Week 1 - Unit 6 - 3.1 Configure Internet Proxy]({{base_path}}/week-1/unit-6/#configure-internet-proxy)         | Client OS (openSUSE Linux VM) |
| Firefox (in VirtualBox)             | [Week 1 - Unit 6 - 3.2 Test Internet Connection]({{base_path}}/week-1/unit-6/#test-internet-connection)         | Client OS (openSUSE Linux VM) |
| SAP Cloud Connector (on VirtualBox) | [Week 2 - Unit 3 - 2.1 Set up Initial Configuration]({{base_path}}/week-2/unit-3/#set-up-initial-configuration) | Client OS (openSUSE Linux VM) |

## TRBL 4: Fiori Configuration Cockpit - Cannot select tab _Roles_ when editing Content

**Symptom:** In the Fiori Configuration Cockpit UI while editing Catalog content you want to navigate to another tab like _Apps_ or _Roles_ by using the mouse button. Due to a pending bug on control level the tab does not get selected via mouse button click.

**Workaround:** Use keyboard buttons instead. First click the **Roles** tab so that it gets the keyboard focus (highligted with a dotted rectangle). Or move the focus to the next tab via **left arrow key**. Press the **Return** keyboard button to select the tab. You can now enter data in the _Assigned Roles_ input form.

## TRBL 5: I have forgotten the Password of my SAP HANA Cloud Platform Trial Account - What can I do?

Don't panic, just reset it using [HCP User Profile Management](https://accounts.sap.com/ui/protected/profilemanagement).

<img src="{{base_path}}/troubleshooting/images/trbl-hcp/pic01--forgotpassword.png" alt="" with="640px" />
