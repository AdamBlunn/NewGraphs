<template>
  <div :class="{'bg-red': error}">
    <apexchart ref="fred" type="line" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  props: ["refreshSeconds"],
  mounted() {
    let memoryCache = localStorage.getItem("Memory");
    if (memoryCache) {
      this.memoryseries = JSON.parse(memoryCache);
    }
    let loadCache = localStorage.getItem("Load");
    if (loadCache) {
      this.loadseries = JSON.parse(loadCache);
    }

    this.refresh();
  },
  data() {
    return {
      error: false,
      memoryseries: [],
      loadseries: [],
      value: 0,
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

        yaxis: {
          max: 50
        }
      },
      series: [
        {
          name: "Load",
          data: [20]
        },
        {
          name: "Memory usage",
          data: [20]
        }
      ]
    };
  },
  methods: {
    fetchLoad(url) {
      axios
        .get(url)
        .then(response => {
          let temp = [...response.data.data.result[0].values];
          temp.reverse();

          let newloaddata = temp
            .map(item => {
              return parseFloat(item[1]);
            })
            .slice(0, 10)
            .reverse();
          this.updateLoadSeries(newloaddata);
          this.error = false;
        })
        .catch(error => {
          console.log(error);
          this.error = true;
          this.updateLoadSeries(this.loadseries);
        });
    },
    fetchMemory(url) {
      axios
        .get(url)
        .then(response => {
          let temp2 = [...response.data.data.result[0].values];
          temp2.reverse();
          let newmemdata = temp2
            .map(item => {
              return parseFloat(item[1] / 100000000);
            })
            .slice(0, 10);
          this.error = false;
          this.updateMemorySeries(newmemdata);
        })
        .catch(error => {
          console.log(error);
          this.error = true;
          this.updateMemorySeries(this.memoryseries);
        });
    },
    refresh() {
      let start = new Date();

      start.setHours(start.getHours() - 1);
      let end = new Date();
      const startString = start.toISOString();
      const endString = end.toISOString();

      const loadurl = `http://localhost:9090/api/v1/query_range?query=node_load5{job=%22mymac%22}&start=${startString}&end=${endString}&step=15s`;

      const memurl = `http://localhost:9090/api/v1/query_range?query=node_memory_active_bytes{job=%22mymac%22}&start=${startString}&end=${endString}&step=15s`;

      this.fetchLoad(loadurl);
      this.fetchMemory(memurl);
      setTimeout(this.refresh, this.refreshSeconds * 1000);
    },

    updateLoadSeries(newData) {
      this.loadseries = newData;

      this.updateGraph();

      localStorage.setItem("Load", JSON.stringify(newData));
    },
    updateMemorySeries(newData) {
      this.memoryseries = newData;
      this.updateGraph();

      localStorage.setItem("Memory", JSON.stringify(newData));
    },
    updateGraph() {
      this.$refs.fred.updateSeries([
        {
          data: this.loadseries
        },
        {
          data: this.memoryseries
        }
      ]);
    }
  }
};
</script>