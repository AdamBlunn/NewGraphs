<template>
  <div :class="{'bg-red': error}">
    <!-- create Bar graph for clusters -->
    <apexchart ref="clusterChart" type="bar" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
// Set up requirements
const axios = require("axios");

import proxy from "../modules/cors-client.js";
const faker = require("faker");

export default {
  //Export for Vue
  props: ["refreshSeconds"],
  mounted() {
    if (process.env.VUE_APP_ENVIRONMENT === "Demo") {
      //DELETE WHEN I'M GONE, JUST USE this.getValues()
      this.fakeValues();
    } else {
      this.refresh();
    } //refresh after a set number of seconds
    //get existing data through local storage
    let pendingCache = localStorage.getItem("Pending");

    if (pendingCache) {
      this.pending = JSON.parse(pendingCache);
    }
    let runningCache = localStorage.getItem("Running");

    if (runningCache) {
      this.running = JSON.parse(runningCache);
    }
    //run refresh on start up
    if (process.env.VUE_APP_ENVIRONMENT === "Demo") {
      //DELETE WHEN I'M GONE, JUST USE this.getValues()
      setInterval(this.fakeValues, 5000);
    } else {
      setInterval(this.refresh, 5000);
    }
  },
  data() {
    return {
      //Setup for error
      error: false,
      //Setup for pending and Running Variables
      pending: 0,
      running: 0,
      options: {
        // Graph options
        chart: {
          foreColor: "#fff",
          toolbar: {
            show: false
          },
          animations: {
            enabled: true,
            easing: "linear",
            dynamicAnimation: {
              speed: 700
            }
          },
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
        }, //Set up X axis
        xaxis: {
          categories: ["Pending", "Running"]
        },
        yaxis: {
          show: false
        }
      }, //Series Set up
      series: [
        {
          name: "series-1",
          data: [0, 0]
        }
      ]
    };
  },
  methods: {
    // Refresh Method - Takes in values for pending and running.
    refresh() {
      proxy
        .get(`http://${process.env.VUE_APP_CLUSTER_SERVER}:3001/`) //get data from al link obscured by environment variables
        .then(response => {
          // handle success
          let tempPending = response.data.stats.pending;
          let tempRunning = response.data.stats.running;
          this.updateValues(tempPending, tempRunning); //Pass to update values
        })
        .catch(error => {
          // handle error
          console.log(error);
          this.updateValues(this.pending, this.running);
          this.error = true;
        });
    },
    fakeValues() {
      let tempPending = faker.random.number(400);
      let tempRunning = faker.random.number(400);
      this.updateValues(tempPending, tempRunning);
    },
    //Update Values method - Recieves values from refresh and assigns them to the proper pending and running values, then calls update Chart function
    updateValues(newPending, newRunning) {
      this.pending = newPending;
      this.running = newRunning;
      this.updateChart();
      //Assign data to local storage
      localStorage.setItem("Pending", JSON.stringify(newPending));
      localStorage.setItem("Running", JSON.stringify(newRunning));
    }, //Update Chart Method - Updates the chart with the data stored in this.pending and this.running.
    updateChart() {
      //Assign data to chart via reference
      this.$refs.clusterChart.updateSeries([
        {
          data: [this.pending, this.running]
        }
      ]);
      this.error = false;
    }
  }
};
</script>