# ThinkGeoCloudClient.js

ThinkGeoCloudClient.js is an open-source JavaScript SDK you can use to interact with the ThinkGeo Cloud, a collection of web-based GIS services that include map tiles, geocoding and reverse geocoding, elevation and more.  It simplifies the process of calling ThinkGeo Cloud web APIs from your applications.


## Demos

* [Vector Tile](https://samples.thinkgeo.com/cloud/#)
* [Elevation](https://samples.thinkgeo.com/cloud/#GetElevationAlongPath)
* [Routing](https://samples.thinkgeo.com/cloud/#RoutinginNorthAmerica)
* [Service Area](https://samples.thinkgeo.com/cloud/#GetServiceArea)
* [Reverse Geocoding](https://samples.thinkgeo.com/cloud/#FindNearbyPlaces)
* [Geocoding](https://samples.thinkgeo.com/cloud/#Geocoding)
* [Colors](https://samples.thinkgeo.com/cloud/#GenerateColorThemes)
* [Projection](https://samples.thinkgeo.com/cloud/#TransformProjection)
* [Time Zone](https://samples.thinkgeo.com/cloud/#GetTimeZoneforaPoint)
* [Map Query](https://samples.thinkgeo.com/cloud/#MapsQuery)


## Creating a Basic Web Application with ThinkGeoCloudClient.js

In this walkthrough, you will learn how to create a basic web application with ThinkGeoCloudClient.js. You should have some familiarity with HTML/CSS and JavaScript, but the source code is provided.  Any operating system or text editor will work, but you will need an Internet connection while you are working.  You'll also need a ThinkGeo Cloud account and an API key to access the ThinkGeo Cloud APIs -- you can [get started for free](https://cloud.thinkgeo.com).

### Step 1: Create an API Key

Your ThinkGeo Cloud account comes with a pregenerated API key you can use right away, or you can create your own keys by [following these guidelines](https://wiki.thinkgeo.com/wiki/thinkgeo_cloud_client_keys_guideline).  For general help with the service, see the [the ThinkGeo Cloud wiki](https://wiki.thinkgeo.com/wiki/thinkgeo_cloud).

### Step 2: Create an HTML Page

We'll start creating a simple sample web application by creating an HTML page.

Start your favorite text editor with a blank HTML document e.g. `index.html`.  Copy and paste the following HTML into it:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My Cloud Service Sample</title>
  </head>
  <body>
    <div id="response"></div>
  </body>
</html>
```

The most notable element here is the `<div id="response"></div>`, which we'll use to display the response we get from the ThinkGeo Cloud.

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My Cloud Service Sample</title>
  </head>
  <body>
    <div id="response"></div>
  </body>
</html>
```

### Step 3: Add a Reference to the ThinkGeoCloudClient.js Library

To get started using ThinkGeoCloudClient.js, you need to reference the JavaScript library in the `<head>` section of your HTML page.  Both NPM and ThinkGeo's CDN provide a minified version, which is a compressed file that improves performance. 
  
#### CDN
Reference the library directly from ThinkGeo's CDN:

```html
<!-- Latest minified version of ThinkGeoCloudClient.js -->
<script src="https://cdn.thinkgeo.com/cloudclient-js/1.0.13/thinkgeocloudclient.js"></script>
```

#### NPM

First, install the ThinkGeoCloudClient package:
```
npm i thinkgeocloudclient-js
``` 

Next, include it in your HTML page:
```html
<!-- Latest minified version of ThinkGeoCloudClient.js -->
<script src="path/to/lib/thinkgeocloudclient.js"></script>
```

### Step 4: Make a ThinkGeo Cloud Request

At the bottom of your HTML page, add a JavaScript section with the following code.  As a demonstration, this will make a request to the ThinkGeo Cloud Reverse Geocoding service to find points of interest near a specified latitude/longitude coordinate.  The results will be displayed on your HTML page.
 
```JavaScript
let reverseGeocodingClient = new tg.ReverseGeocodingClient('Your-Cloud-Service-Api-Key');

// Find the ThinkGeo office address by coordinate
reverseGeocodingClient.searchPlaceByPoint(33.128367, -96.809847, function (status, response) {

    if (response.data.bestMatchLocation) {
       let address = response.data.bestMatchLocation.data.address;

       document.getElementById('response').innerHTML = address;
    }
})
```
