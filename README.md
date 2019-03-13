[![Build Status](https://travis-ci.org/AdamBlunn/NewGraphs.svg?branch=master)](https://travis-ci.org/AdamBlunn/NewGraphs)
# GraphDashboard
# NewGraphs
Updated Version of Graphs with **JEST** installed properly

## Components
### Licence Component 

### Weather Report Component
The weather component takes in weather data from the Dark Sky API. This data is taken  by the API hourly and updated inside the component every thirty minutes. 



### Tickets Component
This component recieves parsed RSS data from the tickets RSS Feed. Upon initialisation, any data in local storage is read into the component and output as an initial value. Immediately after initialisation, the component will refresh and fetch the most recent data from the RSS parser's output, this data will then be pushed to the _update Values_ function which will slice the tickets down to the ten most recent ones, set them in local storage, and assign them to the display variable. All data recieved from the parser will then be set into local storage so that the most recent data can be displayed in the event of an error. This component updates every ten seconds. 

In terms of the template section of this component, the display variables are added through _{{}}_ and the name of the person pushing the ticket is displayed in gold to highlight it to the user.

This component also contains an algorthim that will generate dummy data via the faker library if the _VUE_APP_ENVIROMENT_ enviroment variable is set to _"Demo"_
### System Load and Memory Usage Component 

### Labs Review Component
The Labs review component takes in two pieces of data for each lab, the number of active PCs and the total number of PCs. These are taken from multiple university data nodes, fetched by the _cors_proxy.js_ script. This is taken from a link that is concatenated with the ID of the lab, this is then passed to the proxy and the data is then returned. This data is then visualised in a horizontal bar graph (via **ApexCharts**), The two tiered bar chart displays the number of active PCs and the number of inactive PCs **(Active PCs - Total PCs)** . This data is stored in local storage so that it can be used upon startup, ensuring that the website will not have null values in the graph. 

In the event of an error, local storage data will be pulled into the graph to ensure that it still contains partially valid
data until the issue can be resolved. 

This Component also has a dummy data generator via **faker** this will be used when _VUE_APP_ENVIROMENT_ is set to _"Demo"_

This component updates every 100 seconds.

### Cluster View Components
This Component does not currently work. It runs off of the _gridengine.js_ Script and visualises the data recived from the script in the form of a bar chart (created by the ApexChats library).  Script is set to refresh every ten seconds. Local storage has been enabled so that in the event of an error, the most recent functioning data will be displayed until the error is resolved. 

### Home.vue
Home component. Main Page of the website. Imports and displays all components listed above.  
This is also where all of the top level styling for each component is done (primarily through the TailwindCSS framework.) and a class is assigned to them for additional styling through the _main.css_ file.

This component also assigns several variables to be passed to the individual components, including the amount of seconds before a refresh and the _apiConfig_ Variable. The _apiConfig_ variable is then passed into any components that it is required in. 

#### apiConfig Variable
The _apiConfig_ variable is an object that contains all of the enviromental variables for this website. These are primarily urls to be read by either the CORS proxy, or the RSS parser. This variable is then passed into the relevent componenents so that the relevent URLs can be used. 

## Scripts
### weather.js
### gridengine.js
### refreshWeather.sh
### cors_proxy.js
### cors-client.js
### axiosWrapper.js

## Dependancies
