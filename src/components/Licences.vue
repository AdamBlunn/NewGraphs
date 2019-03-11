<template>
<div lass="shadow bg-success border-l-8 hover:bg-success-dark border-success-dark mb-2 p-2 md:w-1/4 mx-2">
  <p class="text-sm, text-center text-white" :class="{'bg-red': error}">
    <strong>{{numberOfLicences}} licences expiring soon</strong>
    <br>
    <br>
    <ul class="text-left">
        <li class="mb-3 border-b pb-4 text-xs" v-for="licence in licence" :key="licence.id"><span class="text-gold"> {{licence.ExpireDate}}</span> - {{licence.Title}} <br> </li>
        
    </ul><br>
  </p>
</div>
</template>
<script>
//Set up Dependancies
var isToday = require('date-fns/is_today')
var isBefore = require('date-fns/is_before')
var isAfter = require('date-fns/is_after')
var parse = require('date-fns/parse')
var addMonths = require('date-fns/add_months')
var subMonths = require('date-fns/sub_months')
const axios = require("axios");
const faker = require('faker')
import proxy from "../modules/cors-client.js";//Import proxy server functions
export default {
  props: ["refreshSeconds"],
  mounted() {
    //Check for demo version
      if (process.env.VUE_APP_ENVIROMENT === 'Demo'){ //DELETE WHEN I'M GONE, JUST USE this.refresh()
      setInterval(this.fakeValues,this.refreshSeconds*1000)  //DELETE WHEN I'M GONE 
    }else{ //else run as normal
      setInterval(this.refresh, this.refreshSeconds*1000);
      }
      //Get values from local storage
    let licenceCache = localStorage.getItem("Exiring Licences"); 
    if (licenceCache){
      this.licence=JSON.parse(licenceCache)
    }
    let lengthCache = localStorage.getItem("No of Exiring Licences");
    if (lengthCache){
      this.numberOfLicences=JSON.parse(lengthCache)
    }
    let expiredLicencesCache= localStorage.getItem("Expired Licences");
    if(lengthCache){
      this.licenceExpired = JSON.parse(expiredLicencesCache)
    }
     if (process.env.VUE_APP_ENVIROMENT == 'Demo'){ //check for dem version DELETE WHEN I'M GONE, JUST USE this.refresh()
      this.fakeValues() //generate dummy values  DELETE WHEN I'M GONE
    }else{this.refresh();}  
  },
  data() {
    return {
      //initialise varibles and error 
      error:false,
      licence: [{}],
      licenceExpired:[{}],
      numberOfLicences:0,
      licUrl: process.env.VUE_APP_LICENCE_URL //envriomental variable for Licence URL
      
    };
  },
  methods: {
    refresh() {
      proxy //Get data through cors proxy
        .get(this.licUrl)
        .then(response => {
          // handle success
          const licences = response.data.Data;
          const expiringLicenes = licences.filter(lic=>{ // filter to display licences that will expire in the next two months 
              const today = new Date();
              const expiryDate = parse(lic.ExpireDate)
              const expiryMonth= addMonths(today,2)
              if(isBefore(expiryDate,today))return false
              if(isAfter(expiryDate, expiryMonth)) return false
              return true;
          })
          expiringLicenes.sort(function(a, b){ //Sort expiring licences in order of the closest to expire. Set dates to a single case and sort.
          var x = a.ExpireDate.toLowerCase();
          var y = b.ExpireDate.toLowerCase();
          if (x < y) {return -1;}
          if (x > y) {return 1;}
          return 0;
          })
          // console.log(expiringLicenes)
          this.updateValues(expiringLicenes/*, expiredLicences*/);
        })
        .catch((error)=> {
          // handle error
          console.log(error);
          this.error=true;
        });
    },
    fakeValues(){ // Generate Dummy Values to populate list DELETE WHEN I'M GONE
     let licence2 = [{     
       id:faker.random.number(),
       creator:faker.name.findName(),
       Title: faker.commerce.product(), 
       ExpireDate: faker.date.future()
      },{     
       id:faker.random.number(),
       creator:faker.name.findName(),
       Title: faker.commerce.product(), 
       ExpireDate: faker.date.future()
      },{     
       id:faker.random.number(),
       creator:faker.name.findName(),
       Title: faker.commerce.product(), 
       ExpireDate: faker.date.future()
      },{     
       id:faker.random.number(),
       creator:faker.name.findName(),
       Title: faker.commerce.product(), 
       ExpireDate: faker.date.future()
      },{     
       id:faker.random.number(),
       creator:faker.name.findName(),
       Title: faker.commerce.product(), 
       ExpireDate: faker.date.future()
      }]
          this.updateValues(licence2);
        
    },
    
    updateValues(expiringLicences){ // update values in the list
      this.licence=expiringLicences;
      this.numberOfLicences= expiringLicences.length;
      localStorage.setItem("Expiring Licences", JSON.stringify(expiringLicences));
      localStorage.setItem("No of Expiring Licences", JSON.stringify(expiringLicences.length)); 
    }
  }
};
</script>

