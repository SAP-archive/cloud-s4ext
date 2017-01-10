---
title: "Site Search"
sitemap: false
permalink: /search/
layout: single
sidebar:
  nav: "home"
---

 <div id="search">
   <form role="search" method="get" action="./">
   <input id="q" name="q"
          placeholder="SAP HANA Cloud Platform, Eclipse, Cloud Connector, etc." type="text">
   <input id="searchButton" name="googleSearchName" type="submit" value="Search">
   </form>
 </div>

 <script>
   (function() {
     var cx = '010388069096803321796:ssfchvgqlsq';
     var gcse = document.createElement('script');
     gcse.type = 'text/javascript';
     gcse.async = true;
     gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
     var s = document.getElementsByTagName('script')[0];
     s.parentNode.insertBefore(gcse, s);
   })();
 </script>
 <gcse:searchresults-only></gcse:searchresults-only>
