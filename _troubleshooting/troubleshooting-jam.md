---
title: "Troubleshooting: SAP Jam"
excerpt: "Here you can find..."
tags:
  - "Week X - Unit X"
categories:
  - "SAP HANA Cloud Platform: Services"
---

<a name="top"/>

{% include toc %}

{% include base_path %}

## TRBL 1: SAP Jam cannot access backend data (403)
> Applies to week\<no.>unit\<no>: w3u5

- Test the full connection chain (from your local NetWeaver ABAP Back-End (1), via the Cloud Connector (2), via OData Provisioning HCP service (3) to an HCP application in the internet (4)) by calling the Shop OData Service. For more details see [week 3 - unit 5 - step 1.1]({{ base_path }}/week-1/unit-5/#test-connection-chain-via-shop-odata-service).
- In the S/4HANA system the **iwbep** service node needs to be activated; transaction **SICF**.

## TRBL 2: Destination to SAP Jam  not working
- Saved after generate Keys in trust?
- Copy/Paste correct key: Signing Certificate?
- Copy/paste full signing certificate?
- IDP enabled in SAP Jam?
- Copy/past correct client key?

## TRBL 3: SAP Jam can't invite second user
- need to have different sap user and send him link to "go to service" in browser that does not have user session
- remember to set role sap jam user

## TRBL 4: SAP Jam can't call API to backend if HCP OData Provisioning fails
- Check if URL in annotations set
- Check if annotations set correctly
- Check if URL set correctly with metadata and #product / #review
