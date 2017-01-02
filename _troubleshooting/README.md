---
title: "Troubleshooting Guide"
permalink: /troubleshooting/
excerpt: "Even though we tried to make the tutorials as robust as possible, you might run into issues from time to time. Therefore we have collected some troubleshooting tips that might help you in resolving these issues on your own. If you still get stuck, please feel free to reach out to us in the discussion forums of the openSAP course."
header:
  overlay_color: "#333"
layout: single
sidebar:
  nav: "home"
---
<a name="top"/>

{% include base_path %}

{% include toc %}

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


# Troubleshooting by Week/Unit

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


# Browser bookmarks

- **HCP** [see Week 1, Unit 5, Step 3]({{ base_path }}/week-1/unit-5#step-3-prepare-sap-hana-cloud-platform-trial-account)
- **SAP Web IDE** [see Week 1, Unit 5, Step 4]({{ base_path }}/week-1/unit-5#step-4-prepare-sap-web-ide)
- **IOT Service Cockpit** [see Week5, Unit 2, Step 1]({{ base_path }}/week-5/unit-2#step-1-enable-iot-service-in-hcp-trial-account)
- **Message Management Service Cockpit**  [see Week 5, Unit 2, Step 2]({{ base_path }}/week-5/unit-2#step-2-deploy-iot-message-management-service-mms)
