---
title: "Troubleshooting: Maven"
excerpt: "Here you can find hints why your Maven build in your Eclipse IDE isn't working"
tags:
  - "Week 1"
categories:
  - "Tools"
---

<a name="top"/>

{% include toc %}

{% include base_path %}

## TRBL 1: Maven _"BUILD FAILURE"_ due to _"dependencies could not be resolved"_

When you run the command `Maven install` to build the _helloworld_ project or the _hub_ project you get an error similar to:

    [INFO] BUILD FAILURE
    _[...]_
    Plugin org.apache.maven.plugins:maven-resources-plugin:2.6 or one of its dependencies could not be resolved: Failed to read artifact descriptor for org.apache.maven.plugins:maven-resources-plugin:jar:2.6: Could not transfer artifact org.apache.maven.plugins:maven-resources-plugin:pom:2.6 from/to central (https://repo.maven.apache.org/maven2) _[...]_

In the Eclipse console it looks like:

  <img src="{{base_path}}/troubleshooting/images/trbl-mvn/pic01--devnotresolved.png" alt="" with="640px" />

Please check if your Internet access is still working. If you are working behind a proxy please check if your proxy is set correctly in your **settings.xml**.  see [week1 unit5 Step 6.2]({{base_path}}/week-1/unit-5#configure-proxy-for-maven)

> **Hint:** You might have to use the fully qualified domain name for you proxy, i.e. **proxy.mycompany.com** instead of **proxy**.

Once you have updated the _settings.xml_ and have pressed the **Update Settings** button, you can run **Maven install** again.

## TRBL 2: Maven repository corrupted/broken

In some cases your local maven repository might get corrupted. It might help to delete it, and then run a fresh **Maven install** command to get everything downloaded again.

Use **Eclipse > Window > Preferences > Maven > User Settings** to find out the **Local Repository**-path:

  <img src="{{base_path}}/troubleshooting/images/trbl-mvn/pic02--repopath.png" alt="" with="640px" />

Before you can delete the repository folder, you have to close _Eclipse_, as Eclipse locks some of the repository files.

## TRBL 3: You can't import helloworld zip due to "dependencies could not be resolved"

You have import the **helloworld** as described at [week3 Unit5 Step6.4 Maven Test Build 1.-5.]({{base_path}}/week-1/unit-5/#maven-test-build)
but you get an error saying that ```... Could not calculate build plan....Failed to read artifact descriptor...``` 
as shown in the screen shot:
 
  <img src="{{base_path}}/troubleshooting/images/trbl-mvn/pic03--helloworldimport.png" alt="" with="640px" />
  
Please check if your Internet access is still working.
 If you are working behind a proxy please check if your proxy is set correctly in your **settings.xml**.  see [week1 unit5 Step 6.2]({{base_path}}/week-1/unit-5#configure-proxy-for-maven)

After you have configured proxy for maven:

1. Delete the **helloworld** Eclipse project, if existing. 
2. Follow **TRBL 2** above to delete your repository.
3. Import the **helloworld** from a freshly unzipped file location. Do **not** try to reimport form the old file location, as Eclipse might have created files breaking your import again. 






 


	
	