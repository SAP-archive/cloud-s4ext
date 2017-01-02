---
title: "Troubleshooting: Remote Function Module in the Netweaver AS ABAP backend"
excerpt: "Here you can find..."
tags:
  - "Week X - Unit X"
categories:
  - "SAP S/4HANA NetWeaver Backend"
---

<a name="top"/>

{% include toc %}

{% include base_path %}

## TRBL 1: Error while creating a Remote Function Group
- When you try to create a Remote Function Group, you get an error "Access refused: invalid access key for developer DEVELOPER"

  <img src="{{ base_path }}/troubleshooting/images/trbl-rfc/pic01-create-rfc-group-fails.png" alt="" width="640px" />
  - Check if you have mistyped the Developer Access code. For the field **Access Key**, Enter **35408798513176413512** and try again.
  - You have not requested/imported the Demo license. To work or create new objects in the Netweaver AS ABAP backend system you need to install a SAP System license for free as described in [Week 1 - Unit 6 - Install SAP System License]({{ base_path }}/week-1/unit-6/#63-install-sap-system-license). Install the license and try creating Remote Function Group as described in [Week 6 - Unit 2 - Create new Function Group]({{ base_path }}/week-6/unit-2/#21-create-new-function-group)


## TRBL 2: Error editing the Remote Function Module
When you try to edit the **Remote Function Module**, you get an error **'Lock object' has encountered a problem. An internal error occured during: "Lock object".

  <img src="{{ base_path }}/troubleshooting/images/trbl-rfc/pic02-lock-rfc-fails.png" alt="" width="640px" />
  - The SAP Netweaver S/4 HANA backend system is stopped. Try to stop and start the backend system as described in [Week 4 - Unit 3 - Step 1.2]({{ base_path }}/week-4/unit-3/#step-12-vm-with-netweaver-abap-is-up-and-running).


## TRBL 3: Connection to partner system broken
When you try to open your ABAP project, you get an error "connection to partner '127.0.0.1:3300' broken"

  <img src="{{ base_path }}/troubleshooting/images/trbl-rfc/pic03-conn-nw-fails.png" alt="" width="640px" />
  - The connection to the SAP Netweaver S/4 HANA backend system has broken. Try to stop and start the backend system as described in [Week 4 - Unit 3 - Step 1.2]({{ base_path }}/week-4/unit-3/#step-12-vm-with-netweaver-abap-is-up-and-running).


## TRBL 4: Error locking the Remote Function Module
When you try to edit the **Remote Function Module**, you get an error **User DEVELOPER is currently editing Z_ACME_S4EXT_SET_SO_STATUS.

  <img src="{{ base_path }}/troubleshooting/images/trbl-rfc/pic04-lock-rfc-fails1.png" alt="" width="640px" />
  - The object is already locked for editing in some other Eclipse window or in SAP GUI. Try closing the other sessions and continue with [Week 6 - Unit 2]({{ base_path }}/week-6/unit-2/).

## TRBL 5: Error activating the Remote Function Module
When you activate the **Remote Function Module**, you get an error **Activation failed with errors**.

  <img src="{{ base_path }}/troubleshooting/images/trbl-rfc/pic05--activation-error.png" alt="" width="640px" />
  - Do not activate the Remote Function Module with errors.
  - View the Problems in the **problems view** in Eclipse.
  - Check if you have copy-pasted the contents correctly of **Z_ACME_S4EXT_SET_SO_STATUS**.
  - Continue with the steps described in [Week 6 - Unit 2 - Step 2.2]({{ base_path }}/week-6/unit-2/#22-create-new-function-module).
