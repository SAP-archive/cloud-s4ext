---
title: "Troubleshooting Guide"
permalink: /troubleshooting/
excerpt: "Even though we tried to make the tutorials as detailed and robust as possible, you might run into issues from time to time. Therefore we have collected some troubleshooting tips that might help you in resolving these issues on your own. We will continuously update this troubleshooting guide. If you still get stuck or have additional questions, please feel free to reach out to us in the [discussion forums](https://open.sap.com/courses/hcp3a1/pinboard) of this openSAP course."
header:
  overlay_color: "#333"
layout: single
sidebar:
  nav: "home"
---
<a name="top"/>

{% include base_path %}

{% include toc %}


# Troubleshooting by Week

{% include group-by-array collection=site.troubleshooting field="tags" %}

{% for tag in group_names %}
  {% assign posts = group_items[forloop.index0] %}
  <h2 id="{{ tag | slugify }}" class="archive__subtitle">{{ tag }}</h2>
  <ul>
  {% for post in posts %}
    {% include troubleshooting-single.html %}
  {% endfor %}
  </ul>
{% endfor %}


# Troubleshooting by Categories

{% include group-by-array collection=site.troubleshooting field="categories" %}

{% for tag in group_names %}
  {% assign posts = group_items[forloop.index0] %}
  <h2 id="{{ category | slugify }}" class="archive__subtitle">{{ tag }}</h2>
  <ul>
  {% for post in posts %}
    {% include troubleshooting-single.html %}
  {% endfor %}
  </ul>
{% endfor %}


# Browser bookmarks

As some of the URLs are individualized based on your SAP HANA Cloud Platform user ID, we advise you to create different browser bookmarks, which allow you to reliably and quickly find your services again. Here you can see an overview on the different browser bookmarks you should create over the course of the tutorial:

| Bookmark            | Description | Location   |
|---------------------|-------------|------------|
| **HCP**             | SAP HANA Cloud Platform Cockpit | [see Week 1, Unit 5, Step 3]({{base_path}}/week-1/unit-5#step-3-prepare-sap-hana-cloud-platform-trial-account)
| **SAP Web IDE**     | SAP Web IDE in your HCP account | [see Week 1, Unit 5, Step 4]({{base_path}}/week-1/unit-5#step-4-prepare-sap-web-ide)
| **S/4HANA FLP**     | SAP Fiori Launchpad on your local backend | [see Week 2, Unit 1, Step 4]({{base_path}}/week-2/unit-1/#create-s4hana-flp-bookmark)
| **SCC**             | SAP HANA Cloud Connector | [see Week 2, Unit 3, Step 2]({{base_path}}/week-2/unit-3/#set-up-initial-configuration)
| **HCP FLP**         | SAP Fiori Launchpad in your HCP account | [see Week 2, Unit 4, Step 3]({{base_path}}/week-2/unit-4/#step-3-publish-the-launchpad-site)
