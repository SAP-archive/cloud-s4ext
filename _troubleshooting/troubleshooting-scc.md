---
title: "Troubleshooting: SAP HANA Cloud Connector"
excerpt: "Here you can find..."
tags:
  - "Week X - Unit X"
categories:
  - "SAP S/4HANA NetWeaver Backend"
---

<a name="top"/>

{% include toc %}

{% include base_path %}

## TRBL 1: Local browser can't access scc
- check nat settings correct port and in?

## TRBL 2: SCC not reachable
- NAT Settings
- Test local -> of gone: stop/start
- check network availability

## TRBL 3: SCC not connecting to account and to service channel
- check network on cm -> Firefox
- check proxy required?

## TRBL 4: Destination not working
- check password typo -> copy URL to browser and check if User/password is working
- check URL typo > copy URL to browser and check if working


## TRBL 5: Destinations no visible in SAP Web IDE
- check if webide enabled
- it may take some time -> refresh the SAP Web IDE and check if ther


## TRBL 6: SCC not running
- check if running > Suso service scc_daemon
- **FIX:** auto restart
- **FIX:** alerting / notification in cockpit
