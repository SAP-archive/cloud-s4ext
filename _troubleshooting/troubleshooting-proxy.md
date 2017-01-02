---
title: "Troubleshooting: Proxy Problems"
excerpt: "Here you can find..."
tags:
  - "Week X - Unit X"
categories:
  - "Miscellaneous"
---

<a name="top"/>

{% include toc %}

{% include base_path %}

## TRBL 1: Internet Communication does not work with Proxy Server in Place
> Applies to week\<no.>unit\<no>: w1u5, w1u6, w2u3, w3u5

When you are working inside an enterprise network with a proxy server in place your development environment must be properly configured in several programs.

As depicted in the following diagram a network connection must be established between several programs running in the corporate network, the proxy server and your HCP trial account.  

![devenvwithproxy]({{ base_path }}/troubleshooting/images/trbl-proxy/pic01-trbl-network-proxies.png)

Visit the following sections from weeks 1 and 2 that describe how to configure proxy settings in various programs of your development environment:

| Program | Week - Unit - Section | Operating System |
| :------------- | :------------- | :------------- |
| Eclipse | [Week 1 - Unit 5 - 5.2 Configure Proxy Settings]({{ base_path }}/week-1/unit-5/#52-configure-proxy-settings) | Host OS |
| Maven Plugin | [Week 1 - Unit 5 - 6.2 Configure Proxy for Maven]({{ base_path }}/week-1/unit-5/#62-configure-proxy-for-maven) | Host OS |
| VirtualBox Manager | [Week 1 - Unit 6 - 3.1 Configure Internet Proxy]({{ base_path }}/week-1/unit-6/#31-configure-internet-proxy) | Host OS |
| YaST | [Week 1 - Unit 6 - 3.1 Configure Internet Proxy]({{ base_path }}/week-1/unit-6/#31-configure-internet-proxy) | Client OS (openSUSE Linux VM) |
| Firefox | [Week 1 - Unit 6 - 3.2 Test Internet Connection]({{ base_path }}/week-1/unit-6/#32-test-internet-connection) | Client OS (openSUSE Linux VM) |
| SAP Cloud Connector | [Week 2  - Unit 3 - 2.1 Set up Initial Configuration]({{ base_path }}/week-2/unit-3/#21-set-up-initial-configuration) | Client OS (openSUSE Linux VM) |
