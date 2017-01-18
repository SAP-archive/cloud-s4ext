---
title: "Troubleshooting: openSUSE Linux and VirtualBox VM"
excerpt: "Here you can find troubleshooting information on issues with your openSUSE Linux guest operating system and on issues with Oracle VirtualBox virtual machine container."
tags:
  - "Week 1"
  - "Week 2"
categories:
  - "SAP S/4HANA NetWeaver Backend"
---

<a name="top"/>

{% include toc %}

{% include base_path %}

## TRBL 1: I cannot install OpenSUSE linux using Oracle Virtualbox

-   Check if you have downloaded the DVD version, check the downloaded file size. It is around 4+ GB. Do not download the **Network** version in the page [https://software.opensuse.org/421/en](https://software.opensuse.org/421/en).
-   Follow the installation steps as described in [Week 1 - Unit 6 - 1.2 Download Linux OS OpenSUSE]({{base_path}}/week-1/unit-6/#download-linux-os-opensuse).

## TRBL 1: I cannot access the internet in the web browser even with the right proxy settings

-   Make sure that you have really configured proxy settings in all programs, see [Troubleshooting - Proxies]({{base_path}}/troubleshooting/troubleshooting-misc/#trbl-3-internet-communication-does-not-work-with-proxy-server-in-place) for more details.
-   Restart the networking service

    -   Open in the application **Konsole** in your linux VM.
    -   Type the command `sudo rcnetwork restart`.
    -   Type the command `sudo ifconfig` and check if you see the IP address displayed.

## TRBL 2: I cannot access localhost (e.g. SAP Cloud Connector) in a web browser neither from the host OS nor from the Linux guest OS

-   Make sure that you have really configured proxy settings in all programs, see [Troubleshooting - Proxies]({{base_path}}/troubleshooting/troubleshooting-misc/#trbl-3-internet-communication-does-not-work-with-proxy-server-in-place) for more details.
-   Restart the networking service

    -   Open in the application **Konsole** in your linux VM.
    -   Type the command `sudo rcnetwork restart`.
    -   Type the command `sudo ifconfig` and check if you see the IP address displayed.

## TRBL 3: Can't install UUIDD in Linux

1.  You are trying to search **uuidd** and install the UUIDD service as described in [Week 1 - Unit 6 - Install UUIDD service ]({{base_path}}/week-1/unit-6/#prepare-uuidd-service).
2.  If you cannot search the UUIDD service, check if you have set the proxy in the YAST as described in [Week 1 - Unit 6 - 3.1 Configure Internet Proxy]({{base_path}}/week-1/unit-6/#configure-internet-proxy).
3.  Once you set the proxy, you need to restart YAST for the proxies to get effective.
4.  Try searching and installing UUIDD now.
5.  Also do not forget to start the UUIDD service as described in [Week 1 - Unit 6 - Install UUIDD service ]({{base_path}}/week-1/unit-6/#start-uuidd).

## TRBL 4:  VM is not running / crashing

1.  The default power setting of the Linux VM is that the server will suspend your session after 10 minutes of inactivity when your laptop is on battery.
2.  This stops any access to the SAP AS ABAP system. You need to stop and restart the whole virtual machine. Then start your ABAP processes.
3.  Also check if your network connection is down
4.  Open in the application **Konsole** in your linux VM.
5.  Type the command `sudo rcnetwork restart`.
6.  Type the command `sudo ifconfig` and check if you see the IP address displayed.
7.  To disable energy saving settings and to keep the VM running always, follow the step 7 in [Week 1 - Unit 6 - Step 2.4]({{base_path}}/week-1/unit-6/#install-opensuse-linux-os-on-the-vm).

## TRBL 5: The VM / openSUSE displays the lock screen too often

1.  The Linux VM locks the screen every 5 minutes by default.
2.  To change this default setting, switch to your Linux Virtual Machine. Type **lock** in the search.

    <img src="{{base_path}}/troubleshooting/images/trbl-vm/pic01--screen-lock.png" alt="" width="640px" />

3.  Change the setting so that the VM does not lock after every 5 minutes.

    <img src="{{base_path}}/troubleshooting/images/trbl-vm/pic02--screen-lock.png" alt="" width="640px" />

## TRBL 6: Why is VirtualBox only showing 32 bit guest versions on my 64 bit host OS?

If VirtualBox is only showing 32 bit versions in the version list make sure:

-   Your host OS is 64-bit
-   Intel Virtualization Technology and VT-d are both enabled in the BIOS
-   The Hyper-V platform is disabled in your Windows Feature list.

For more details read [this blog](http://www.fixedbyvonnie.com/2014/11/virtualbox-showing-32-bit-guest-versions-64-bit-host-os/#.WElwwX3LIT8).
