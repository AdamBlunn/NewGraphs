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
  props: ["refreshSeconds", /*"apiconfig"*/],
  mounted() {
    //Check for demo version
      if (process.env.VUE_APP_ENVIROMENT === 'Demo'){
      setInterval(this.fakeValues,this.refreshSeconds*1000)   
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
     if (process.env.VUE_APP_ENVIROMENT == 'Demo'){ //check for dem version
      this.fakeValues() //generate dummy values 
    }else{this.refresh();}  
  },
  data() {
    return {
      //initialise varibles
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
          //console.log(response);
        //   console.log(response.data)
          const licences = response.data.Data;
          //console.log(licences)
          const expiringLicenes = licences.filter(lic=>{ // filter to display licences that will expire in the next two months 
              const today = new Date();
              const expiryDate = parse(lic.ExpireDate)
              const expiryMonth= addMonths(today,2)
              console.log(expiringLicenes)
              if(isBefore(expiryDate,today))return false

              if(isAfter(expiryDate, expiryMonth)) return false

              return true;
          })
          const expiredLicences = licences.filter(lic=>{ //Outdated, can delete safely 
            const today = new Date();
            const expiryDate = parse(lic.ExpireDate)
            const expiryMonth = subMonths(today, 12)
            if(isBefore(expiryDate, today)){
              if(isBefore(expiryDate, expiryMonth )) return false
            }if(isAfter(expiryDate,today))return false
            
            return true;           
          })
          expiringLicenes.sort(function(a, b){ //Sort expiring licences in order of the closest to expire. Set dates to a single case and sort.
          var x = a.ExpireDate.toLowerCase();
          var y = b.ExpireDate.toLowerCase();
          if (x < y) {return -1;}
          if (x > y) {return 1;}
          return 0;
          })
          console.log(expiringLicenes)
          this.updateValues(expiringLicenes/*, expiredLicences*/);
        })
        .catch((error)=> {
          // handle error
          console.log(error);
          this.error=true;
        });
    },
    fakeValues(){ // Generate Dummy Values to populate list 
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
      // licence2.sort(function(a, b){
      //     var x = a.ExpireDate.toLowerCase();
      //     var y = b.ExpireDate.toLowerCase();
      //     if (x < y) {return -1;}
      //     if (x > y) {return 1;}
      //     return 0;
      //     })
          console.log(licence2)
          this.updateValues(licence2/*expiredLicences*/);
        
    },
    
    updateValues(expiringLicences/*, expiredLicences*/){ // update values in the list
      this.licence=expiringLicences;
      //this.licenceExpired = expiredLicences
      this.numberOfLicences= expiringLicences.length;
      localStorage.setItem("Expiring Licences", JSON.stringify(expiringLicences));
      localStorage.setItem("No of Expiring Licences", JSON.stringify(expiringLicences.length)); 
      //localStorage.setItem("Expired Licences", JSON.stringify(expiredLicences));     
    }
  }
};
</script>

