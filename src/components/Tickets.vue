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
const faker = require('faker')
export default {
  props: ['refreshSeconds'], 
  mounted() {
    if (process.env.VUE_APP_ENVIROMENT === 'Demo'){ // Check for demo version DELETE WHEN I'M GONE, USE setInterval(this.refresh, 100000); INSTEAD
      setInterval(this.generateFaker,this.refreshSeconds*1000)   //generate dummy values DELETE WHEN I'M GONE
    }else{
      setInterval(this.refresh, this.refreshSeconds*1000); //proceed as normal
      }
     //get data from local storage  
    let ticketsCache = localStorage.getItem("Tickets");
    if(ticketsCache){
      this.tickets=JSON.parse(ticketsCache);
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
    refresh() {
      proxy
        .get(`http://${process.env.VUE_APP_API_IP}:3018/`) //fetch data from the tickets enviroment variables
        .then(response => {
          // handle success
         let ticket = response.data.items
         this.error=false;        
         this.updateValues(ticket);
        })
        .catch((error)=> {
          // handle error 
          console.log(error);
          this.error=true;
        });
    },
    generateFaker(){ //Generate Dummy Data DELETE WHEN I'M GONE
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
      localStorage.setItem("Tickets",JSON.stringify(newTickets)); //Assign to Local storage
    }
  }
};
</script>