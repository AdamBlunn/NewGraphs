<template>
  <div :class="{'bg-red': error}">
    <!-- Create a line chart w/ apexcharts -->
    <apexchart ref="fred" type="line" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
// Set up requirements
const axios = require("axios");
const faker = require("faker");

//Export for Vue
export default {
  props: ["refreshSeconds"],
  mounted() {
    // Fetch existing data from local storage on component load/script failure
    let memoryCache = localStorage.getItem("Memory");
    if (memoryCache) {
      this.memoryseries = JSON.parse(memoryCache);
    }
    let loadCache = localStorage.getItem("Load");
    if (loadCache) {
      this.loadseries = JSON.parse(loadCache);
    }
    //begin fetching data
    // Check for demo Version - DELETE WHEN I'M GONE - Replace with setInterval(this.getValues, 100000);
    if (process.env.VUE_APP_ENVIRONMENT === "Demo") {
      //DELETE WHEN I'M GONE, JUST USE this.getValues()
      setInterval(this.fakeMemory, 10000000);
      setInterval(this.fakeLoad, 10000000);
      this.fakeMemory();
      this.fakeLoad();
    } else {
      this.refresh();
    }
  },
  data() {
    return {
      error: false,
      memoryseries: [], //Stores Memory Usage Stats
      loadseries: [], //Stores system load stats
      value: 0,
      //Graph Settings
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
          name: "Load", // Set up load Series
          data: [20]
        },
        {
          name: "Memory usage", //set up memory usage series
          data: [20]
        }
      ]
    };
  },
  methods: {
    fetchLoad(url) {
      //function to get the load data from URL.
      axios
        .get(url) //fetch URL
        .then(response => {
          let temp = [...response.data.data.result[0].values]; //set a temporary variable and assign it the load values
          temp.reverse(); //Reverse the temp field so that the latest update is at the start of the array
          let newloaddata = temp
            .map(item => {
              return parseFloat(item[1]);
            })
            .slice(0, 10) //take ten values most recent values from the array
            .reverse(); // reverse to display the latest value last in the grpah
          this.updateLoadSeries(newloaddata); //call update function
          this.error = false;
        }) //Error Checking
        .catch(error => {
          console.log(error);
          this.error = true;
          this.updateLoadSeries(this.loadseries);
        });
    },
    fetchMemory(url) {
      //fetch memory
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
        }) //error checking
        .catch(error => {
          console.log(error);
          this.error = true;
          this.updateMemorySeries(this.memoryseries);
        });
    },
    fakeMemory() {
      let temp3 = [
        faker.random.number(50),
        faker.random.number(50),
        faker.random.number(50),
        faker.random.number(50),
        faker.random.number(50),
        faker.random.number(50),
        faker.random.number(50),
        faker.random.number(50),
        faker.random.number(50),
        faker.random.number(50)
      ];
      temp3.reverse();
      this.updateMemorySeries(temp3);
      console.log(temp3);
    },
    fakeLoad() {
      let temp4 = [
        faker.random.number(25),
        faker.random.number(25),
        faker.random.number(25),
        faker.random.number(25),
        faker.random.number(25),
        faker.random.number(25),
        faker.random.number(25),
        faker.random.number(25),
        faker.random.number(25),
        faker.random.number(25)
      ];
      temp4.reverse();
      this.updateLoadSeries(temp4);
      console.log(temp4);
    },
    refresh() {
      let start = new Date();
      start.setHours(start.getHours() - 1);
      let end = new Date();
      //Convert Date to string
      const startString = start.toISOString();
      const endString = end.toISOString();
      const loadurl = `http://localhost:9090/api/v1/query_range?query=node_load5{job=%22mymac%22}&start=${startString}&end=${endString}&step=15s`;
      const memurl = `http://localhost:9090/api/v1/query_range?query=node_memory_active_bytes{job=%22mymac%22}&start=${startString}&end=${endString}&step=15s`;
      this.fetchLoad(loadurl);
      this.fetchMemory(memurl);
      setTimeout(this.refresh, this.refreshSeconds * 1000);
    },
    //Update nodes in load series
    updateLoadSeries(newData) {
      this.loadseries = newData;
      this.updateGraph();
      // save load data to local storage
      localStorage.setItem("Load", JSON.stringify(newData));
    },
    //update nodes in memory series
    updateMemorySeries(newData) {
      this.memoryseries = newData;
      this.updateGraph();
      //save memory data to local storage
      localStorage.setItem("Memory", JSON.stringify(newData));
    },
    updateGraph() {
      // use graph reference to assign each series their new data
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
