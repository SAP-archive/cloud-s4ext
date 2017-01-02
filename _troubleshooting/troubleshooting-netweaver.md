---
title: "Troubleshooting: SAP S/4HANA NetWeaver Backend"
excerpt: "Here you can find..."
tags:
  - "Week 1 - Unit 6"
categories:
  - "SAP S/4HANA NetWeaver Backend"
---

<a name="top"/>

{% include toc %}

{% include base_path %}

## SAP Logon

### TRBL A1: SAP Logon: Partner ``vhcalnplci:sapdp00`` not reached

If you SAP Logon cannot reach the SAP S/4HANA installation, please check the following:
1. Check if S/4 HANA system is running.
  - Verify that all dispatcher and Gateway processes have been started as described in [Week 1 - Unit 6]({{ base_path }}/week-1/unit-6/#start-netweaver-as-abap). All the processes should be in **GREEN** state.
  - If one of the process is in state **YELLOW**, stop your S/4 HANA system as described in [Week 1 - Unit 6]({{ base_path }}/week-1/unit-6/#shutdown-vm-with-netweaver-as-abap) and start it again as described in step above.

2. Check the the firewall is turned off in openSUSE Linux.
  - Switch to the running Oracle VM VirtualBox where your Linux VM runs.
  - Open **YaST** and enter your root password of the Linux image.
  - Search for **Firewall**. You should select **Disable Firewall Automatic Starting** and **Stop Firewall Now**.
  <img src="{{ base_path }}/troubleshooting/images/trbl-netweaver/pic01--firewall.png" alt="" width="640px" />
  - Click **Next** and **Finish** to save the changes.

3. Check if you have done the correct port forwarding configurations.
  - Check if you have added the port forwarding from the SAP logon in your host OS, to the Guest OS as described in [Week 1 - Unit 6]({{ base_path }}/week-1/unit-6/#enable-network-access-to-linux-vm).

### TRBL A2: Local browser can't access S/4HANA
If you in browser window in your host OS, you cannot access the S/4 HANA system which runs in your Guest VM. You are trying to access links for example, [S/4 Fiori Launchpad](http://localhost:8000/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html) or [HTTPS S/4 Fiori Launchpad](https://localhost:44300/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html).

1. Check if S/4 HANA system is running.
  - Verify that all dispatcher and Gateway processes have been started as described in [Week 1 - Unit 6]({{ base_path }}/week-1/unit-6/#start-netweaver-as-abap). All the processes should be in **GREEN** state.
  - If one of the process is in state **YELLOW**, stop your S/4 HANA system as described in [Week 1 - Unit 6]({{ base_path }}/week-1/unit-6/#shutdown-vm-with-netweaver-as-abap) and start it again as described in step above.

2. Check if you have added the port forwarding from the SAP logon in your host OS, to the Guest OS as described in [Week 1 - Unit 6]({{ base_path }}/week-1/unit-6/#enable-network-access-to-linux-vm).

### TRBL A3: S/4 HANA Launchpad link not working in SAP GUI**
If you in browser window in your host OS, you cannot access the S/4 HANA system which runs in your Guest VM. You are trying to access links for example, [S/4 Fiori Launchpad](http://vhcalnplci.dummy.nodomain:8000/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html) or [HTTPS S/4 Fiori Launchpad](https://vhcalnplci:44300/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html).

1. Check if S/4 HANA system is running.
  - Verify that all dispatcher and Gateway processes have been started as described in [Week 1 - Unit 6]({{ base_path }}/week-1/unit-6/#start-netweaver-as-abap). All the processes should be in **GREEN** state.
  - If one of the process is in state **YELLOW**, stop your S/4 HANA system as described in [Week 1 - Unit 6]({{ base_path }}/week-1/unit-6/#shutdown-vm-with-netweaver-as-abap) and start it again as described in step above.

2. Check if you have added the port forwarding from the SAP logon in your host OS, to the Guest OS as described in [Week 1 - Unit 6]({{ base_path }}/week-1/unit-6/#enable-network-access-to-linux-vm).

3. Replace the address in the above URL to **localhost** and access the above S/4 HANA Fiori Launchpad link again.

4. You could also add an entry in your host OS for resolving _vhcalnplci.dummy.nodomain_ to _127.0.0.1_. We recommend to replace the links to _localhost_ instead of adding an entry in your hosts file.
  - Sample entry in your host OS for resolving the launchpad links.

  ```
  127.0.0.1       vhcalnplci vhcalnplci.dummy.nodomain
  ```

### TRBL A4: SAP Logon: Null pointer exception when running ABAP transaction within Eclipse
In Eclipse, you could open the ABAP project in ABAP in Eclipse but when you try to run the transactions within Eclipse, you get a null pointer exception.

- You have installed a older version of JavaGUI (SAP Logon) in your MAC book and have **Configuration** file and **SAP UI Landscape configuration** file which was not deleted when you uninstalled old SAP Logon and installed the latest version.
- Remove these 2 settings file in the Java GUI and click **Save**.

<img src="{{ base_path }}/troubleshooting/images/trbl-netweaver/pic02--error-open-trx.png" alt="" width="640px" />


## SAP NetWeaver AS ABAP

### TRBL B1: What is the password to access SAP NetWeaver AS ABAP?
You are trying to logon to your S/4 HANA ABAP system in your SAP Logon but cannot login to the ABAP system.

Check if you are trying with the correct ABAP user : **developer** and password : **Appl1ance**. See the steps described in [Week 1 - Unit 6 - Install SAP GUI Client]({{ base_path }}/week-1/unit-6/#install-sap-gui-client).

### TRBL B2: S/4 HANA AS ABAP installation fails
You tried to install the ABAP from the install script which you downloaded from https://tools.hana.ondemand.com/#abap following [Week 1 - Unit 6 - Install SAP GUI Client]({{ base_path }}/week-1/unit-6/).
If the installation finishes with message "Installation successful", you can ignore the warnings which the script prints in the process of installation.

The installation script fails and stops with errors. The following could be reasons for the script to be fail :

> **Note:** If the ABAP installation fails for whatever reason, you need to revert to the clean state of only with OpenSUSE installation. Revert to the snapshot state [Initial Installation Snapshot]({{ base_path }}/week-1/unit-6/#create-vm-snapshot) and re-do the installation steps after this snapshot state.

1. Check if you have partially downloaded or partially extracted the ABAP installation files as you will run into installation errors. Check the warning as described in [Week 1 - Unit 6]({{ base_path }}/week-1/unit-6/#13-download-netweaver-as-abap).
2. Check if host name is set correctly as described in [Week 1 - Unit 6]({{ base_path }}/week-1/unit-6/#prepare-network-setup).
3. Check if your virtual machine has enough memory - 6 GB (4 GB is enough but the replication job in Week 4 works without failures with 6 GB) and enough hard disk space (80 GB) as described in [Week 1 - Unit 6]({{ base_path }}/week-1/unit-6/#step-2-install-linux-vm-in-virtualbox).
4. Check if you have enough disk space in **home** drive. If you create 2 parititions in your Linux OS, home drive has smaller space though you have allocated 80 GB.
  - Check if during the OpenSUSE installation, if you have unchecked the checkbox so that you have only one partition.

  <img src="{{ base_path }}/troubleshooting/images/trbl-netweaver/pic04--install-linux.png" alt="" width="640px" />
  - To check the free space available in your home drive, switch to your running virtual machine Linux instance.
  - Open the console application **Konsole** (KDE Application Menu and navigate to System > Konsole).
  - Type the command **df -h** and check how much free space is available in your home drive. The free space in your home drive should atleast be 35 GB.

  <img src="{{ base_path }}/troubleshooting/images/trbl-netweaver/pic03--disk-usage.png" alt="" width="640px" />

5. Check if uuidd is installed and started as described in [Week 1 - Unit 6]({{ base_path }}/week-1/unit-6/#prepare-uuidd-service).
6. Check if _install.sh_ set to executable and if Installation started as root as described in [Week 1 - Unit 6]({{ base_path }}/week-1/unit-6/#step-5-install-sap-netweaver-as-abap-on-linux-vm).
7. The ABAP installation script also fails if you chose a simple weak password. The script goes ahead with this simple password but fails in a later stage.   
  - Choose a strong password of atleast 8 characters with combination of numbers, special character, alphabets capital and small case.
8. The install script can also fail due to lots of reasons. Whatever reason it fails, you need to revert to the snapshot state [Initial Installation Snapshot]({{ base_path }}/week-1/unit-6/#create-vm-snapshot) and re-do the installation steps after this snapshot state.

### TRBL B3: AS ABAP Slow
- Any transcation/action called in the AS ABAP for the first time triggers compilation of the relevant function modules. Subsquent call/action should be of normal speed.
- As the VM is quite small: Please have some patience, second call usually will be faster. You can try to increase the RAM memory size to 6 GB and try again. 
- You need to stop the Virtual machine instance to increase the memory size.

<img src="{{ base_path }}/troubleshooting/images/trbl-netweaver/pic05--change-vm.png" alt="" width="640px" />
- Click on **Settings** and increase the memory size to 6 GB.
<img src="{{ base_path }}/troubleshooting/images/trbl-netweaver/pic06--change-vm1.png" alt="" width="640px" />


### TRBL B4: AS ABAP does not start
- Check if UUIDs service is started as described in [Week 1 - Unit 6]({{ base_path }}/week-1/unit-6/#prepare-uuidd-service).


### TRBL B5: Developer key not accepted
- Check if you have installed the DEMO license in your ABAP system as described in [Week 1 - Unit 6]({{ base_path }}/week-1/unit-6/#install-sap-system-license).

### TRBL B6: S/4 HANA not running or S/4 HANA crashed
1. Stop the S/4 HANA system and the VM as described in [Week 1 - Unit 6]({{ base_path }}/week-1/unit-6/#shutdown-vm-with-netweaver-as-abap).
2. Start the VM and ABAP system as described in [Week 1 - Unit 6]({{ base_path }}/week-1/unit-6/#starting-vm-with-netweaver-as-abap). 


## SAP System Landscape Transformation (SLT)

see [Troubleshooting - SLT](./troubleshooting-slt.md)
