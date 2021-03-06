// Import Dependancies
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./main.css";
import VueApexCharts from "vue-apexcharts";

// Enable Vue Apex Charts
Vue.use(VueApexCharts);

Vue.component("apexchart", VueApexCharts);

Vue.config.productionTip = false;
// Enable vue
console.log(process.env.VUE_APP_LAB_NAMES)
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
