<template>
    <h1>
      <apexchart width=100% type="donut" :options="options" :series="series"></apexchart>
    </h1>
  </template>
  <script>
  export default {
      data: function() {
    return {
      options: {},
      series: [44, 55, 41, 17, 15]
    }
  }
  }
  </script>
  