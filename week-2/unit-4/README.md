---
title: "Week 2, Unit 4: Creating an SAP Fiori Launchpad in the Cloud"
permalink: /week-2/unit-4/
excerpt: "You will create a Fiori launchpad in SAP HANA Cloud Platform that provides access to the UX extension application that gets developed in Unit 5. Acting as HCP administrator you first prepare the Portal Service inside the HCP trial account and then add a first test application (SAP Web IDE) to a new launchpad with two groups Product Management and Equipment Tracking."
header:
  overlay_color: "#333"
  cta_label: "openSAP video"
  cta_url: "https://open.sap.com/courses/hcp3a1/items/XMGtTV8xUwUOWUyG5Vxuz"
layout: single
sidebar:
  nav: "week-2"
---

<a name="step-1-top"/><a name="step-2-top"/><a name="step-3-top"/>

{% include toc %}

{% include base_path %}

**Overview:**

<img src="./images/overview.png" alt="" />

**Roles**

-   SAP HANA Cloud Platform personas: HCP administrator prepares HCP account and Fiori launchpad

<img src="./images/roles.png" alt="" />

**Systems, Tools, Services:**

-   on host OS: in Google Chrome browser: SAP Web IDE, HCP cockpit, HCP Portal Service with SAP Fiori Launchpad on Cloud

## Step 1: Enable Portal Service in HCP Trial Account

SAP Fiori launchpad is a browser-based shell that hosts SAP Fiori apps and provides them with services such as navigation, personalization, and configuration options. The apps are displayed as various tiles and groups.
Administrators must first set up their SAP HANA Cloud Platform account prior to working in SAP Fiori launchpad.

1.  In Google Chrome browser open the HCP Trial cockpit page in a new tab. Use the bookmark you created in [Week 1 - Unit 5](../../week-1/unit-5/#create-hcp-bookmark)
2.  Open the **Services** pane and enter query string **portal** in the search field. Click the **Portal Service** tile to enter the admin page.

    <img src="./images/w2-u4-s1/pic01-hcpcockpit-find-portalservice.png" alt="" width="640px" />

3.  Press the **Enable** button to provide a Portal to your HCP trial account.

    <img src="./images/w2-u4-s1/pic02-hcpcockpit-enable-portalservice.png" alt="" width="640px" />

    After few seconds a green icon indicates the enabled HCP Portal service.

    <img src="./images/w2-u4-s1/pic03-hcpcockpit-portalservice-enabled.png" alt="" width="640px" />

4.  Click the link **Go to Service**.

    <img src="./images/w2-u4-s1/pic04-hcpcockpit-portalservice-goto.png" alt="" width="640px" />

> **Result:**  You entered the **SAP HANA Cloud Portal Site Directory**. This is where you will create your new lauchpad site.
>
> <img src="./images/w2-u4-s1/pic05-fiori-launchpad-config-cockpit.png" alt="" width="640px" />

## Step 2: Set up a new Launchpad Site

Before end users can work in an SAP Fiori launchpad, you as administrator must first set it up by configuring a new launchpad site with content such as app tiles, tile groups, catalogs, and roles that act as the building blocks of a launchpad.

#### 2.1 Create a new Launchpad Site

To create a new _launchpad site_ in the Site Directory of SAP HANA Cloud Portal apply the following steps:

1.  Choose **Create New Site**.

    <img src="./images/w2-u4-s2/pic01-portalservice-create-new-site.png" alt="" width="640px" />

2.  Choose **SAP Fiori Launchpad** as template and enter **Procurement Launchpad** in input field _Site Name_.

    <img src="./images/w2-u4-s2/pic02-portalservice-create-site-form.png" alt="" width="640px" />

3.  Choose **Create**.

    <img src="./images/w2-u4-s2/pic02-portalservice-create-site-form-create.png" alt="" width="640px" />

Another browser tab gets opened with the _Fiori Configuration Cockpit_ for the new launchpad site **Procurement Launchpad**.

<img src="./images/w2-u4-s2/pic03-portalservice-procurement-launchpad-fcctab.png" alt="" width="640px" />

> **Result:**  You added a new launchpad site with name **Procurement Launchpad** to the Site Directory of SAP HANA Cloud Portal. In the browser tab where you added the new launchpad site it gets displayed as a new tile.
>
> <img src="./images/w2-u4-s2/pic03-portalservice-procurement-launchpad.png" alt="" width="640px" />
>
> **Related Resources:** For more details see SAP HANA Cloud Platform Documentation:
>
> -   [SAP Fiori Launchpad on Cloud](https://help.hana.ondemand.com/cloud_portal_flp/frameset.htm)
> -   [SAP Fiori Launchpad Sites](https://help.hana.ondemand.com/cloud_portal/frameset.htm?69000b4a09b54f33bef1b58a1dbb4001.html  )

#### 2.2 Configure the new Launchpad Site

To configure the new launchpad site _Procurement Launchpad_ You now enter the **SAP Fiori launchpad configuration cockpit**, a browser-based tool used by administrators to create new and maintain existing content for SAP Fiori launchpads.

1.  In _Site Directory_ click **Edit** at the bottom right of the _Procurement Launchpad_ tile or select the browser tab _Welcome to SAP Fiori Configuration Cockpit_ that was opened in the previous step.

    <img src="./images/w2-u4-s2/pic04-portalservice-procurement-launchpad-edit.png" alt="" width="640px" />

    In the **Fiori Configuration Cockpit** you will see a navigation menu on the left hand side. From here you can access the various tools, editors, and services provided by the configuration cockpit.

    <img src="./images/w2-u4-s2/pic05-fcc-dashboard.png" alt="" width="640px" />

2.  To configure the launchpad catalog open menu item **Content Management > Catalogs** or click the **Catalogs** tile.

    <img src="./images/w2-u4-s2/pic06-fcc-edit-catalog.png" alt="" width="640px" />

3.  To edit the **Sample Catalog** click the **Edit** button in the footer toolbar.

    <img src="./images/w2-u4-s2/pic07-fcc-edit-catalog-form.png" alt="" width="640px" />

4.  In the **Properties** tab change name and description to **Procurement Applications**.

    <img src="./images/w2-u4-s2/pic08-fcc-edit-sample-catalog-prop.png" alt="" width="640px" />

5.  Choose **Roles** tab and assign role **Everyone**.
6.  Click **Save**.

    <img src="./images/w2-u4-s2/pic09-fcc-edit-sample-catalog-role.png" alt="" width="640px" />

7.  Configure the launchpad groups:
8.  Go to **Groups** and click on **Edit**.

    <img src="./images/w2-u4-s2/pic10-fcc-edit-catalog-groups.png" alt="" width="640px" />

9.  Edit the **Sample Group**:
    -   Rename it to **Product Management**.
    -   Click **Save**.

    <img src="./images/w2-u4-s2/pic11-fcc-edit-catalog-group-rename.png" alt="" width="640px" />

10. Create a new group named **Equipment Tracking** with the **+** button in the footer toolbar.

    <img src="./images/w2-u4-s2/pic12-fcc-edit-catalog-new-group.png" alt="" width="640px" />

    > **Result:**  You configured the _Procurement_ launchpad site to contain two groups named _Procuement Applications_ and _Equipment Tracking_:
    >
    > <img src="./images/w2-u4-s2/pic13-fcc-edit-catalog-two-groups.png" alt="" width="640px" />

[Top](#step-1-top)

#### 2.3 Add an Application to new Launchpad Site

Add "SAP Web IDE" as first application tile inside the _Procurement_ launchpad.

1.  In the left navigation sidebar expand **Content Management**and go to **Apps**.
2.  Click **+** button in the footer toolbar to create a new app.

    <img src="./images/w2-u4-s2/pic14-fcc-edit-add-app.png" alt="" width="640px" />

3.  In the **Properties** form enter the following values:
    -   Enter **General > App Title**: **Demo Application**.
    -   Under **App Resources Details** choose **App Type** menu item **URL**.
    -   Copy & paste the URL of your SAP Web IDE browser bookmark: `https://webide-p1942XXX.dispatcher.hanatrial.ondemand.com/` (replace placeholder **p142XXX** with your HCP trial account user).
    -   Assign Catalogs: **Procurement Applications**
    -   Assign Groups: **Product Management**.
    -   Click **Save**.

    <img src="./images/w2-u4-s2/pic15-fcc-edit-add-app-webide.png" alt="" width="640px" />

4.  Preview the new launchpad:
5.  Click on the **Site Preview** icon from the black toolbar bar in the top right corner.

      <img src="./images/w2-u4-s2/pic16-fcc-site-preview.png" alt="" width="640px" />

6.  Verify that your **Demo Application** tile correctly works by navigating to the SAP Web IDE that starts in a new browser tab.

      <img src="./images/w2-u4-s2/pic18-fcc-site-preview-sapwebide.png" alt="" width="640px" />

[Top](#step-2-top)

## Step 3: Publish the Launchpad Site

1.  Click **Home** to view the existing parts of the new site:
    - 1 Application
    - 1 Catalog
    - 2 Groups
    - 2 Roles

    <img src="./images/w2-u4-s3/pic01-fcc-site-home.png" alt="" width="640px" />

2.  Go to **Settings**.
3.  In the header toolbar click the **globe** icon to publish the site.
4.  Confirm the popup dialog and click **Publish and Open**.

    <img src="./images/w2-u4-s3/pic02-fcc-site-publish.png" alt="" width="640px" />

5.  Add a browser bookmark to the new site with name **HCP FLP**. See [Week 1 - Unit 5](../../week-1/unit-5/#create-hcp-bookmark) on how to add a browser bookmark for SAP Web IDE.

    <img src="./images/w2-u4-s3/pic03-fcc-site-bookmark.png" alt="" width="640px" />

[Top](#step-3-top)

[**&lt; Previous** Unit 3](../unit-3/) | [**Up ^** Week 2](../) | [**Next >** Unit 5](../unit-5/)
