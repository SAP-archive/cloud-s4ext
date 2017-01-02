---
title: "Troubleshooting: Maven"
excerpt: "Here you can find hints why your Maven build in your Eclipse IDE isn't working"
tags:
  - "Week X - Unit X"
categories:
  - "Tools"
---

<a name="top"/>

{% include toc %}

{% include base_path %}

## TRBL 1: Maven: Errors occurred during the build

When you are facing problems with the maven build of your helloworld application, please check if your proxy is set correctly in your **settings.xml**.  see [week1 unit5 Step 6.2]({{ base_path }}/week-1/unit-5#62-configure-proxy-for-maven)

> **Hint:** You might have to use the fully qualified domain name for you proxy, i.e. **proxy.mycompany.com** instead of **proxy**.

Once you have corrected your proxy settings, you have to force an update of your maven project. You can do so by right clicking on the **helloworld** project, select **maven** then **Update Maven Project**. Check the **Force Update of Snapshots/Releases** checkbox and click **OK**.

Sometimes you also should delete the maven repository from disk. use **Eclipse > Window >Preferences> Maven > User Settings** to find out the repository directory. Before you can delete the repository close Eclipse.
