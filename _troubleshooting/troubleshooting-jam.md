---
title: "Troubleshooting: SAP Jam"
excerpt: "Here you can find information on how to troubleshoot issues with the SAP Jam service running on SAP HANA Cloud Platform."
tags:
  - "Week 3"

categories:
  - "SAP HANA Cloud Platform: Services"
---

<a name="top"/>

{% include toc %}

{% include base_path %}

## TRBL 1: SAP Jam cannot access backend data (403)

-   Test the full connection chain (from your local NetWeaver ABAP Back-End (1), via the Cloud Connector (2), via OData Provisioning HCP service (3) to an HCP application in the internet (4)) by calling the Shop OData Service. For more details see [week 3 - unit 5 - step 1.1]({{base_path}}/week-3/unit-5/#test-connection-chain-via-shop-odata-service).
-   In the S/4HANA system the **iwbep** service node needs to be activated using transaction **SICF**.


## TRBL 2: Web IDE Clean-up

**Symptom:** In Web IDE something is not displayed correctly, e.g. the expected OData result as in the [Week 3 - Unit 4 - Section 4.2]({{base_path}}/week-3/unit-4/#create-web-ide-test-project-with-jam-odata-connectivity) in substep 7.

> **Note:** In most cases when something is not running in one of the web-based tools like the SAP Web IDE, then first try to clean up the browser cache as follows.

1.  Assume you did not get the expected OData result but an error or no data is retrieved:
2.  **Ignore** the error message.
3.  Click on the **x icon** to close the project creation wizard and also Click on the **OK** on the opened _Confirmation needed_ dialog.

    <img src="{{base_path}}/troubleshooting/images/trbl-jam/trbl2/pic01--web-ide-clean.png" alt="" with="640px" />

4.  Click on the **Customize and control** menu of _Chrome_ browser.
5.  Choose **More tools > Developer tools** to open the _Chrome_ developer tools.

    > **Note:** These developer tools enable an additional context menu of the browser refresh button, which is not otherwise not available.

    <img src="{{base_path}}/troubleshooting/images/trbl-jam/trbl2/pic02--web-ide-clean.png" alt="" with="640px" />

6.  **Right-click** on the browser **Refresh** icon to open the developer menu option.
7.  Choose **Empty Cache and Hard Reload** to force the browser to empty its cache and reload.

    <img src="{{base_path}}/troubleshooting/images/trbl-jam/trbl2/pic03--web-ide-clean.png" alt="" with="640px" />

    > **Result:** The cache of the SAP Web IDE application has been clean and reloaded. After this you get in many cases the OData service test successfully running.

8.  Click the **cross icon** in the middle of the right side to close the _developer tools_ again.
9.  Try again to access the Jam OData service as described in the above [Week 3 - Unit 4 - Section 4.2]({{base_path}}/week-3/unit-4/#create-web-ide-test-project-with-jam-odata-connectivity)


## TRBL 3: Check SAML trusted IdP ID

Symptom you did not get the expected OData result in [Week 3 - Unit 4 - Section 4.2]({{base_path}}/week-3/unit-4/#create-web-ide-test-project-with-jam-odata-connectivity) in substep 7.

Check that SAML trusted IdP ID is the same on both sides _HCP_ and _Jam service_ cockpit.

1.  Open new browser tab and Click on the **SAP Jam** bookmark to open Jam service cockpit
2.  On the opened _Jam Service Cockpit_:
3.  Click on the **Account settings** icon.
4.  Choose **Admin** to open the administration area.

    <img src="{{base_path}}/troubleshooting/images/trbl-jam/trbl3/pic01--idp-trust.png" alt="" with="640px" />

5.  On the opened **Jam Cockpit Administration** page:
6.  Click on the **+** icon of the **Integrations** tab
7.  Click on the **SAML Trusted IDPs** tab to open the corresponding page.
8.  Select and copy the **IDP ID** value of the list to your clipboard.

    <img src="{{base_path}}/troubleshooting/images/trbl-jam/trbl3/pic02--idp-trust.png" alt="" with="640px" />

9.  Open another new browser tab and Click on the **HCP** bookmark to open Cloud cockpit.
10. Navigate to **Services > Trust**.
11. Click on the **Edit** button.

    <img src="{{base_path}}/troubleshooting/images/trbl-jam/trbl3/pic03--idp-trust.png" alt="" with="640px" />

12. Change _Configuration Type_ to **Custom**.
13. Paste the before copied **SAML IDP ID** value (you got from the Jam cockpit) from your clipboard into the **Local Provider Name** field
    > **Note:** These two values should be the same. By copying and saving it you ensure this.
14. Click on the **Save** and confirm the opened dialog with **OK**.

    <img src="{{base_path}}/troubleshooting/images/trbl-jam/trbl3/pic04--idp-trust.png" alt="" with="640px" />

15. Click again **Edit**

    <img src="{{base_path}}/troubleshooting/images/trbl-jam/trbl3/pic05--idp-trust.png" alt="" with="640px" />

16. Change _Configuration Type_ to **Default**.
17. Click on the **Save** and confirm the opened dialog with **OK**.

    <img src="{{base_path}}/troubleshooting/images/trbl-jam/trbl3/pic06--idp-trust.png" alt="" with="640px" />

    > **Result:** With these steps you ensured that the SAML trusted IdP ID is the same on both sides on _HCP_ and _Jam service_ cockpit.

18. Try again to access the Jam OData service as described in [Week 3 - Unit 4 - Section 4.2]({{base_path}}/week-3/unit-4/#create-web-ide-test-project-with-jam-odata-connectivity)

## TRBL 4: SAP Jam is unable to add new Record Type to External Application

**Symptom:** In [week 3 - unit 5 - step 2.2 Add Record Types to External Application]({{base_path}}/week-3/unit-5/#add-record-types-to-external-application) the creation of new record type _Products_ or _Reviews_ fails due to the error `Failure (i): Could not import annotations. This business record type will not be created or updated.` By clicking the title _Failure (i)_ additional details get displayed: `Unexpected error importing annotation while processing response data. Could not load metadata resource.`

<img src="{{base_path}}/troubleshooting/images/trbl-jam/trbl4/pic01--sapjam-importextres-failure.png" alt="" with="640px" />

**Solution:** Make sure, that you really entered the correct user credentials (i.e. your HCP trial account p-user and your password) in [week 3 - unit 4 - step 2.1 Create new External Application]({{base_path}}/week-3/unit-5/#create-new-external-application).

Edit the External Application **EpmRefAppsShopSrv** and make sure that p-user and password is really valid.
Then try again to add record type **Products** as described in [week 3 - unit 5 - step 2.2.1]({{base_path}}/week-3/unit-5/#add-record-types-to-external-application).
