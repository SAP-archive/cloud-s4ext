---
title: "Troubleshooting: Miscellaneous"
excerpt: "Here you can find..."
tags:
  - "Week X - Unit X"
categories:
  - "Miscellaneous"
---

<a name="top"/>

{% include toc %}

{% include base_path %}

## TRBL 1: Recommended Start Order
1. HANA Database
2. S/4HANA Backend -> dependency to HANA via replication
3. SAP Cloud Connector
4. Java -> dependency to HANA and S4

## TRBL 2: Chrome: Allow invalid certificates for resources loaded from localhost
When you are calling UIs running on your local SAP S/4HANA system (e.g. https://localhost:44300) your browser will tell you that no valid certificate is available. In Google Chrome you can disable these warnings by allowing requests to localhost over HTTPS even when an invalid certificate is presented. You can change this setting here: [chrome://flags#allow-insecure-localhost](chrome://flags#allow-insecure-localhost)
