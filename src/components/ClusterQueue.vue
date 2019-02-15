<template>
  <div :class="{'bg-red': error}">
    <apexchart ref="clusterChart" type="bar" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  props: ["refreshSeconds"],
  mounted() {
    setInterval(this.refresh, this.refreshSeconds * 1000);
    let pendingCache = localStorage.getItem("Pending");

    if (pendingCache) {
      this.pending = JSON.parse(pendingCache);
    }
    let runningCache = localStorage.getItem("Running");

    if (runningCache) {
      this.running = JSON.parse(runningCache);
    }
    this.refresh();
  },
  data() {
    return {
      error: false,
      pending: 0,
      running: 0,
      options: {
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
        },
        xaxis: {
          categories: ["Pending", "Running"]
        },
        yaxis: {
          show: false
        }
      },
      series: [
        {
          name: "series-1",
          data: [0, 0]
        }
      ]
    };
  },
  methods: {
    refresh() {
      axios
        .get(`http://${process.env.VUE_APP_API_IP}:3001/`)
        .then(response => {
          // handle success
          let tempPending = response.data.stats.pending;
          let tempRunning = response.data.stats.running;
          this.updateValues(tempPending, tempRunning);
        })
        .catch(error => {
          // handle error
          console.log(error);
          this.updateValues(this.pending, this.running);
          this.error = true;
        });
    },
    updateValues(newPending, newRunning) {
      this.pending = newPending;
      this.running = newRunning;
      this.updateChart();
      localStorage.setItem("Pending", JSON.stringify(newPending));
      localStorage.setItem("Running", JSON.stringify(newRunning));
    },
    updateChart() {
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