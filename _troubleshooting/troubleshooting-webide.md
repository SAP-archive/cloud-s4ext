---
title: "Troubleshooting: SAP Web IDE"
excerpt: "Here you can find..."
tags:
  - "Week X - Unit X"
categories:
  - "Tools"
---

<a name="top"/>

{% include toc %}

{% include base_path %}


## TRBL 1: Could not open app. Please try again later.
- Restart your Google Chrome Browser and again login to SAP Web IDE.

## TRBL 2: SAP Web IDE not starting
- IDP setting to default? > cockpit, trust, default

## TRBL 3: Imported app in SAP Web IDE not starting
- check if you imported app to correct directory

## TRBL 4: "500 Internal Server Error" when testing OData Service connection in SAP Web IDE
> Applies to week\<no.>unit\<no>: w3u4

**Symptom:** I get a _"500 Internal Server Error"_ when testing the Data connection to the OData Service in the process of creating a new Web IDE project from template.

**Solution:**
- Clean up the web browser cache as described in [week 3 - unit 4 - step 4.2.1: For Troubleshooting: Web IDE Clean-up]({{ base_path }}/week-3/unit-4/#42-create-web-ide-test-project-with-jam-odata-connectivity).
- Check SAML trusted IdP ID as described in [week 3 - unit 4 - step 4.2.2 For Troubleshooting: Check SAML trusted IdP ID]({{ base_path }}/week-3/unit-4/#42-create-web-ide-test-project-with-jam-odata-connectivity).
