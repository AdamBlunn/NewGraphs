<template>
  <div class="home" id="dashboard">
    <!-- Dashboard -->
    <link rel="styleheet" type="text/css" href="../main.css">
    <div class="shadow, bg-black-tile border-grey-darkest load rounded">
      <p class="text-center text-grey-lightest">
        <strong>System Load and Memory Usage</strong>
      </p>
      <system-load refresh-seconds="10"/>
    </div>
    <div class="border shadow tickets bg-blue-test border-blue-test container-sm rounded-lg">
      <tickets refresh-seconds="10" :apiconfig="apiConfig"/>
    </div>
    <div class="labs shadow rounded labs bg-black-tile">
      <p class="text-center text-grey-lightest">
        <strong>Active Computers Per Lab</strong>
      </p>
      <labs :apiconfig="apiConfig"/>
    </div>
    <div class="border shadow, rounded border-blue-test container-sm bg-blue-test licences">
      <licences refresh-seconds="1" class="text-center, text-grey-lightest"/>
    </div>
    <div class="shadow rounded cluster bg-black-tile">
      <p class="text-center text-grey-lightest">
        <strong>Cluster View</strong>
      </p>
      <cluster-queue refresh-seconds="10"></cluster-queue>
    </div>
    <div
      class="border shadow bg-blue-test weather border-blue-test container-xl rounded float-right"
    >
      <weather
        refresh-seconds="3600"
        :apiconfig="apiConfig"
        class="text-grey-lightest text-center"
      />
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
// Import Components
import SystemLoad from "@/components/SystemLoad.vue";
import Tickets from "@/components/Tickets.vue";
import ClusterQueue from "@/components/ClusterQueue.vue";
import Weather from "@/components/Weather.vue";
import Licences from "@/components/Licences.vue";
import Labs from "@/components/Labs.vue";
export default {
  name: "home",
  components: {
    SystemLoad,
    Tickets,
    ClusterQueue,
    Weather,
    Licences,
    Labs
  },
  data() {
    return {
      apiConfig: {
        //Enviromental Variables set up
        weatherUrl: process.env.VUE_APP_WEATHER_URL,
        ticketsUrl: process.env.VUE_APP_TICKETS_URL,
        licenceUrl: process.env.VUE_APP_LICENCE_URL,
        labnames: process.env.VUE_APP_LAB_NAMES.split(","),
        urlAll: process.env.VUE_APP_URL_ALL,
        urlActive: process.env.VUE_APP_URL_ACTIVE
      }
    };
  }
};
</script>
<style scoped>
</style>

