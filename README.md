# Graphs Dashboard
Updated Version of Graphs with **JEST** installed properly. Is a website that displays key pieces of data required by Glasgow University's tech support department, using libraries like **prometheus** and **node exporter** to pull in data from university systems and visualise that data in a number of forms such as graphs, charts or stylised reports, currently there are six tiles on the dashboard:
- Licences tile
- Tickets Tile
- Weather Report Tile
- Lab Capacity Tile
- Data Clusters Tile
- System Load Tile

While these six tiles are all there is at the moment, there is plenty of room for expansion give Vue.js's Moduartiy. This webpage is designed to be shown on a television or monitor, so there is also an element of responsive design to this project.  
Currently, the unit testing does not work and was abandoned due to the ammount of trouble that it gave me (4 weeks of delays). However, this can be picked up again at a later date. 
There is error handling for all of the tiles through _local Storage_ this will allow the latest data from local storage to be shown at any given time, this means that in the event of an  error, fairly recent data will still be shown. 
Coded in Vue.js and the libraries listed below (see dependancies section).

## Installation
To install this web application, follow these steps:
1. Clone or download the project
    1. If zipped Extract the folder
2. Using the terminal, move to the project folder
3. run the command “npm install”
4. Create a dark sky account at https://darksky.net/
5. Create .env file
    1. Create a VUE_APP_API_IP variable - Contains Device IP for hosting
    2. Create a DARK_SKY_API_KEY variable - Contains unique dark sky key
    3. Create a VUE_APP_LAB_NAMES variable - Contains array of lab names
    4. Create a VUE_APP_TICKETS_URL variable - Contains RSS feed for tickets
    5. Create a VUE_APP_LICENCE_URL variable - Contains link to licence data 
    6. Create a VUE_APP_WEATHER_URL variable- Contains weather data URL
    7. Create a VUE_APP_URL_ALL variable - Contains 1st part of url for total PCs data 
    8. Create a VUE_APP_URL_ACTIVE variable - Contains 1st part of url for actives PCs data 
    9. Create a VUE_APP_ENVIRONMENT variable - Can switch between Dev (Real data) and Demo (Randomly generated data)
6. Run _refreshWeather.sh_
7. Run *cors_proxy.js*
8. Run _gridengine.js_
9. Run server with npm run serve 

## Run Project Demo
To run a demo version of this program that outputs randomly generated data, follow the steps below:
1. Download or clone repository
    1. If zipped, extract the project folder
2. Using the terminal, move to the project folder
3. Run command: npm install
4. Create .env file
    1. Create a field called VUE_APP_ENVIRONMENT  and set it equal to _‘Dev’_
5. Run Command npm run serve to create server


## Components
### Licence Component 
The Licence component displays every software licence that expires within the next two months, these are recieved from a JSON file that is automatically updated. 

The check is done by a library called **date-fns**. Using this library allows the component to filter out all licences not set to expire in the specified timeframe. This component refreshes every second. 

This component also stores all data in local storage, to be used in the event of the component failing or anything else that could cause an error. Data for this component can also be randomly generated by **faker**. 
### Weather Report Component
Weather.vue gives a brief report on the weather in the local area.

The weather component takes in weather data from the Dark Sky API. This data is taken  by the API hourly and updated inside the component every thirty minutes. This component also takes in the name of an icon and then compares this to a map structure containing all of the names and codes for weather icons, these codes are then used to call Icons via font awesome to the component. The weather types that are available are: rain, snow, cloudy, partly cloudy day, partly cloudy night, sleet, wind, clear day, clear night.

**Note:** The API used is free up until a point, it can make 1000 calls per day for free, after that, the user will be charged $0.0001 per call.

### Tickets Component
Tickets.vue displays the ten latest support tickets from the RSS feed.

This component recieves parsed RSS data from the tickets RSS Feed. Upon initialisation, any data in local storage is read into the component and output as an initial value. Immediately after initialisation, the component will refresh and fetch the most recent data from the RSS parser's output, this data will then be pushed to the _update Values_ function which will slice the tickets down to the ten most recent ones, set them in local storage, and assign them to the display variable. All data recieved from the parser will then be set into local storage so that the most recent data can be displayed in the event of an error. This component updates every ten seconds. 

In terms of the template section of this component, the display variables are added through _{{}}_ and the name of the person pushing the ticket is displayed in gold to highlight it to the user.

This component also contains an algorthim that will generate dummy data via the faker library if the _VUE_APP_ENVIRONMENT_ environment variable is set to _"Demo"_
### System Load and Memory Usage Component 
Systemload.vue displays a line graph charting total system load and memory usage in GB.

This component displays a graph _(via ApexCharts)_ that shows the system load and memory usage for the enitre department, this is taken through **Node Exporter** and **Prometheus**. This data is taken through a **Prometheus** query and imported to the component through **Node Exporter**. This data is then cut down to the ten latest values using the _.slice_ function. Following this, the data is saved to local storage and then imported to the graph. Then the graph updates its self using the _updateseries()_ function - adding a new node to the graph and in cases where the ten nodes have been taken it will drop the first one and add a new tenth one. The graph refreshes every 4 seconds.

Local storage has also been used to save all data from this graph so that something can be shown if there an error occurs. 

This component can also randomly generate data if the _VUE_APP_ENVIROnMENT_ environment variable is set to _"Demo"_, this done via the **faker** library, the **faker** version of this dashboard refreshes every ten minutes. 

### Labs Review Component
Labs.vue displays the capacity of the labs by showing the numeber for active PCs and the number of free PCs. 

The Labs review component takes in two pieces of data for each lab, the number of active PCs and the total number of PCs. These are taken from multiple university data nodes, fetched by the _cors_proxy.js_ script. This is taken from a link that is concatenated with the ID of the lab, this is then passed to the proxy and the data is then returned. This data is then visualised in a horizontal bar graph (via **ApexCharts**), The two tiered bar chart displays the number of active PCs and the number of inactive PCs **(Active PCs - Total PCs)** . This data is stored in local storage so that it can be used upon startup, ensuring that the website will not have null values in the graph. 

In the event of an error, local storage data will be pulled into the graph to ensure that it still contains partially valid
data until the issue can be resolved. 

This Component also has a dummy data generator via **faker** this will be used when _VUE_APP_ENVIRONMENT_ is set to _"Demo"_

This component updates every 100 seconds.

### Cluster View Components
Cluster.vue displays the number of pending and running requests to the data clusters. 

This Component does not currently work. It runs off of the _gridengine.js_ Script and visualises the data recived from the script in the form of a bar chart (created by the ApexChats library).  Script is set to refresh every ten seconds. Local storage has been enabled so that in the event of an error, the most recent functioning data will be displayed until the error is resolved. 

### Home.vue
Home component. Main Page of the website. Imports and displays all components listed above.  
This is also where all of the top level styling for each component is done (primarily through the TailwindCSS framework.) and a class is assigned to them for additional styling through the _main.css_ file.

This component also assigns several variables to be passed to the individual components, including the amount of seconds before a refresh and the _apiConfig_ Variable. The _apiConfig_ variable is then passed into any components that it is required in. 

#### apiConfig Variable
The _apiConfig_ variable is an object that contains all of the environmental variables for this website. These are primarily urls to be read by either the CORS proxy, or the RSS parser. This variable is then passed into the relevent componenents so that the relevent URLs can be used. 

## Scripts

### gridengine.js
Randomly generates data for the cluster view component, should become defunct once the cluster view is finished. 

### refreshWeather.sh
Makes new call to _DarkskyAPI_ and exports the data to  a _weather.json_ file.
### cors_proxy.js
Proxy that allows all components to call the same function for axios calls, allows components to bypass the CORS Errors that can come from perfoming axios calls on some of the data used by this website. Used by every component.

### cors-client.js
Sets up the _cors_proxy_. Refreshes every hour. 

### axiosWrapper.js
Currently Defunct - Was supposed to be used as a wrapper for unit testing. 

## Cors Proxy
Cross-Origin Resourse Sharing (CORS) is a process that uses HTTP headers to tell a web browser to allow a web application running at one domain permission  to get selected resources from servers on different domains.

CORS errors can occur when correct authorisation has not been given, a workaround to this is using a CORS proxy, this is a service that allows developers to access resources from other servers, regardless of ownership. This can be useful in many situations. 

The CORS Proxy used in this application is CORS Anywhere, built in Node.js this proxy automatically adds CORS headers to all proxied requests. This will drastically reduce or (in this case) outright prevent CORS errors recieved when data is requested. This is necessary considering how many pieces of data this application is fetching from other servers within Glasgow University.

## Dependancies
This website has several dependancies. These include:
- Jest
- ApexCharts
- TailwindCSS
- date-fns
- faker
- cors-anywhere
- express
- Axios
- rss-parser
- express
- vue
- vue-apexcharts
- vue-router
- dotenv
