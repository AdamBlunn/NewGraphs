<template>
  <div>
    <div class="max-w-sm rounded overflow-hidden">
      <!-- Formatting for the Weather report Component, Displays each data item through {{}} -->
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Weather Report</div>
        <span id="test" class="text-white text-center text-5xl"></span>
        <p class="text-white text-lg mt-2">
          <span id="test"></span>
          <span class="mb-4 mt-2 pb-4">{{forecast.summary}}</span>
          <br>
          <br>
          <span
            class="inline-block bg-blue-test rounded-full px-3 py-1 text-base font-semibold text-white mr-2 ml-2 pb-2 mb-4 mt-2"
          >
            Temperature:
            <span class="text-gold">{{forecast.temperature}}°c</span>
          </span>

          <span
            class="inline-block bg-blue-test rounded-full px-3 py-1 text-base font-semibold text-white mr-2 ml-2 pb-2 mb-4"
          >
            Wind Speed:
            <span class="text-gold">{{forecast.windSpeed}}mph</span>
          </span>
          <br>
          <span
            class="inline-block bg-blue-test rounded-full px-3 py-1 text-base font-semibold text-white mr-2 ml-2 pb-2 mb-4"
          >
            Wind Gust:
            <span class="text-gold">{{forecast.windGust}}</span>
          </span>

          <span
            class="inline-block bg-blue-test rounded-full px-3 py-1 text-base font-semibold text-white mr-2 ml-2 pb-2 mb-4"
          >
            Chance of Rain:
            <span class="text-gold">{{(forecast.precipProbability*100).toFixed(2)}}%</span>
          </span>

          <span
            class="inline-block bg-blue-test rounded-full px-3 py-1 text-base font-semibold text-white mr-2 ml-2 pb-2 mb-4"
          >
            Cloud Cover:
            <span class="text-gold">{{(forecast.cloudCover*100).toFixed(2)}}%</span>
          </span>
        </p>
      </div>
      <div class="px-6 py-4"></div>
    </div>
  </div>
</template>
<script>
//set up dependancies
const axios = require("axios");
const faker = require("faker");
const icons = new Map([
  //Set up font awesome Icons in a key value pairs set up
  ["rain", "fas fa-cloud-rain"],
  ["snow", "fas fa-snowflake"],
  ["cloudy", "fas fa-cloud"],
  ["partly-cloudy-day", "fas fa-cloud-sun"],
  ["partly-cloudy-night", "fas fa-cloud-moon"],
  ["sleet", "fas fa-cloud-meatball"],
  ["wind", "fas fa-wind"],
  ["clear-day", "fas fa-sun"],
  ["clear-night", "fas fa-moon"],
  ["fog", "fas fa-cloud"]
]);
let keyvalue = "";
import proxy from "../modules/cors-client.js"; // import proxy

export default {
  props: ["refreshSeconds", "apiconfig"], //enable props
  data() {
    return {
      //set up variables
      forecast: {
        summary: "",
        temperature: "",
        windSpeed: "",
        windGust: "",
        precipProbability: ""
      }
    };
  },
  mounted() {
    // Check for demo Version - DELETE WHEN I'M GONE - Replace with setInterval(this.getValues, 100000);
    if (process.env.VUE_APP_ENVIRONMENT === "Demo") {
      //DELETE WHEN I'M GONE, JUST USE this.getValues()
      setInterval(this.fakeValues, 10000);
    } else {
      setInterval(this.refresh, this.refreshSeconds * 1000); //refresh after alotted number of seconds
    }
    if (process.env.VUE_APP_ENVIRONMENT === "Demo") {
      //DELETE WHEN I'M GONE, JUST USE this.getValues()
      this.fakeValues();
    } else {
      this.refresh(); //refresh after alotted number of seconds
    }
    //get data through local storage
    let summaryCache = localStorage.getItem("Summary");
    if (summaryCache) {
      this.forecast.summary = JSON.parse(summaryCache);
    }
    let temperatureCache = localStorage.getItem("Temperature");
    if (temperatureCache) {
      this.forecast.temperature = JSON.parse(temperatureCache);
    }
    let windSpeedCache = localStorage.getItem("Speed");
    if (windSpeedCache) {
      this.forecast.windSpeed = JSON.parse(windSpeedCache);
    }
    let windGustCache = localStorage.getItem("Gust");
    if (windGustCache) {
      this.forecast.windGust = JSON.parse(windGustCache);
    }
    let precipProbabilityCache = localStorage.getItem("Rain Chance");
    if (precipProbabilityCache) {
      this.forecast.precipProbability = JSON.parse(precipProbabilityCache);
    }
    let cloudCoverCache = localStorage.getItem("Cloud Cover");
    if (cloudCoverCache) {
      this.forecast.cloudCover = JSON.parse(cloudCoverCache);
    }
    let iconCache = localStorage.getItem("Icon");
    if (iconCache) {
      this.forecast.icon = JSON.parse(iconCache);
    }
  },
  methods: {
    refresh() {
      proxy //get weather data through cors proxy
        .get(this.apiconfig.weatherUrl)
        .then(response => {
          const weather = response.data.hourly;
          this.updateValues(weather);
        })
        .catch(error => {
          // handle error
          console.log(error);
          this.error = true;
        });
    },
    fakeValues() {
      this.forecast.summary = "Partly Cloudy";
      this.forecast.temperature = faker.random.number(20);
      this.forecast.windSpeed = faker.random.number(60);
      this.forecast.windGust = faker.random.number(40);
      this.forecast.precipProbability = 0.2;
      this.forecast.cloudCover = 0.45;
      this.forecast.icon = "fas fa-cloud-sun";
    },
    updateValues(weather) {
      //assign weather data to an object
      this.forecast.summary = weather.summary;
      this.forecast.temperature = weather.data[0].temperature;
      this.forecast.windSpeed = weather.data[0].windSpeed;
      this.forecast.windGust = weather.data[0].windGust;
      this.forecast.precipProbability = weather.data[0].precipProbability;
      this.forecast.cloudCover = weather.data[0].cloudCover;
      this.forecast.icon = weather.data[0].icon;
      keyvalue = icons.get(this.forecast.icon); //Assign icon to matching Keyvalue
      console.log(this.forecast.icon);
      document.getElementById("test").innerHTML = `<i class="${keyvalue}"></i>`; //read weather data back  in through inner HTML
      //Save data to local storage
      localStorage.setItem("Summary", JSON.stringify(weather.summary));
      localStorage.setItem(
        "Temperature",
        JSON.stringify(weather.data[0].temperature)
      );
      localStorage.setItem("Speed", JSON.stringify(weather.data[0].windSpeed));
      localStorage.setItem("Gust", JSON.stringify(weather.data[0].windGust));
      localStorage.setItem(
        "Rain Chance",
        JSON.stringify(weather.data[0].precipProbability)
      );
      localStorage.setItem(
        "Cloud Cover",
        JSON.stringify(weather.data[0].cloudCover)
      );
      localStorage.setItem("Icon", JSON.stringify(this.forecast.icon));
    }
  }
};
</script>



