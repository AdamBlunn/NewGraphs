<template>
  <p class="text-md text-center text-white" :class="{'bg-white': error}">
    <strong>{{this.tickets.length}} Tickets to be handled.</strong>
    <br>
    <br>
    <ul class="text-sm text-left ">
        <li class="mb-2 border-b pb-2 text-sm" v-for="ticket in tickets" :key="ticket.link"><span class="text-gold">{{ticket.creator}}</span> - {{ticket.title}} <br/></li>
    </ul>
    <br>
  </p>
</template>
<script>
//Set up dependancies
const axios = require("axios");
import proxy from "../modules/cors-client.js";
import wrapper from "../modules/axiosWrapper.js";
import { promised } from 'q';
const faker = require('faker')
export default {
  props: ['refreshSeconds'], 
  mounted() {
    if (process.env.VUE_APP_ENVIROMENT === 'Demo'){ // Check for demo version
      setInterval(this.generateFaker,this.refreshSeconds*1000)   //generate dummy values
    }else{
      setInterval(this.refresh, this.refreshSeconds*1000); //proceed as normal
      }
     //get data from local storage  
    let ticketsCache = localStorage.getItem("Tickets");
    if(ticketsCache){
      //this.tickets=JSON.parse(ticketsCache);
    }//Check for demo version on component load
    if (process.env.VUE_APP_ENVIROMENT == 'Demo'){
      this.generateFaker() //generate fake values
    }else{this.refresh();}    
  },
  data() {
    return {
      error:false,
      tickets: [{}]
    };
  },
  methods: {
   async refresh() {
     console.log('fred')
     let ticket= await wrapper
        .get(`http://${process.env.VUE_APP_API_IP}:3018/`).catch(error=>console.log(error))
       console.log(ticket)
                 this.error=false;  
                 console.log("ticket")      
         this.updateValues(ticket);
    },
    generateFaker(){ //Generate Dummy Data
      let ticket2 =[{
        content: faker.lorem.words(),
        contentSnippet: faker.lorem.words(),
        creator: faker.name.findName(),
        date: faker.date.recent(),
         link: faker.internet.url(),
        title: faker.lorem.words()
      },{
        content: faker.lorem.words(),
        contentSnippet: faker.lorem.words(),
        creator: faker.name.findName(),
        date: faker.date.recent(),
        link: faker.internet.url(),
        title: faker.lorem.words()
      },{
        content: faker.lorem.words(),
        contentSnippet: faker.lorem.words(),
        creator: faker.name.findName(),
        date: faker.date.recent(),
        link: faker.internet.url(),
        title: faker.lorem.words()
      },{
        content: faker.lorem.words(),
        contentSnippet: faker.lorem.words(),
        creator: faker.name.findName(),
        date: faker.date.recent(),
        link: faker.internet.url(),
        title: faker.lorem.words()
      }
      ]
      this.updateValues(ticket2)
    },
    updateValues(newTickets){ //Update Values
      this.tickets=newTickets.slice(0,10) 
      console.log(this.tickets) 
      localStorage.setItem("Tickets",JSON.stringify(newTickets)); //Assign to Local storage
    }
  }
};
</script>