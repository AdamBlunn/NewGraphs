<template>
  <div>
    <div class="max-w-sm rounded overflow-hidden">
      <!-- <span id="test"></span> -->
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
    <!-- <span id="test"></span>
    <p class="mb-4 border-b pb-4">{{forecast.summary}}</p>
    <br>
    <p class="mb-2 border-b pb-2">
      Temperature:
      <span class="text-gold">{{forecast.temperature}}°c</span>
    </p>
    <br>
    <p class="mb-2 border-b pb-2">
      Wind Speed:
      <span class="text-gold">{{forecast.windSpeed}}mph</span>
    </p>
    <br>
    <p class="mb-2 border-b pb-2">
      Wind Gust:
      <span class="text-gold">{{forecast.windGust}}</span>
    </p>
    <br>
    <p class="mb-2 border-b pb-2">
      Chance of Rain:
      <span class="text-gold">{{(forecast.precipProbability*100).toFixed(2)}}%</span>
    </p>
    <br>
    <p class="mb-2 border-b pb-2">
      Cloud Cover:
      <span class="text-gold">{{(forecast.cloudCover*100).toFixed(2)}}%</span>
    </p>-->
  </div>
</template>
<script>
const axios = require("axios");
const icons = new Map([
  ["rain", "fas fa-cloud-rain"],
  ["snow", "fas fa-snowflake"],
  ["cloudy", "fas fa-cloud"],
  ["partly-cloudy-day", "fas fa-cloud-sun"],
  ["partly-cloudy-night", "fas fa-cloud-moon"],
  ["sleet", "fas fa-cloud-meatball"],
  ["wind", "fas fa-wind"],
  ["clear-day", "fas fa-sun"],
  ["clear-night", "fas fa-moon"]
]);
let keyvalue = "";
import proxy from "../modules/cors-client.js";
export default {
  props: ["refreshSeconds", "apiconfig"],
  data() {
    return {
      forecast: {
        summary: "",
        temperature: "",
        windSpeed: "",
        windGust: "",
        precipProbability: ""
      }
      // apiUrl: process.env.VUE_APP_WEATHER_URL
    };
  },
  mounted() {
    setInterval(this.refresh, this.refreshSeconds * 1000);
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
      proxy
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
    updateValues(weather) {
      this.forecast.summary = weather.summary;
      this.forecast.temperature = weather.data[0].temperature;
      this.forecast.windSpeed = weather.data[0].windSpeed;
      this.forecast.windGust = weather.data[0].windGust;
      this.forecast.precipProbability = weather.data[0].precipProbability;
      this.forecast.cloudCover = weather.data[0].cloudCover;
      this.forecast.icon = weather.data[0].icon;
      keyvalue = icons.get(this.forecast.icon);
      console.log(keyvalue);
      document.getElementById("test").innerHTML = `<i class="${keyvalue}"></i>`;

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



