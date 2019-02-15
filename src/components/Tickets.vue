<template>
  <p class="text-md text-center text-white" :class="{'bg-white': error}">
    <strong>{{this.tickets.length}} Tickets to be handled.</strong>
    <br>
    <br>
    <ul class="text-sm text-left ">
        <!-- {{this.tickets[0].title}} -->
        <li class="mb-2 border-b pb-2 text-sm" v-for="ticket in tickets" :key="ticket.link"><span class="text-gold">{{ticket.creator}}</span> - {{ticket.title}} <br/></li>
    </ul>
    <br>
  </p>
</template>
<script>
const axios = require("axios");
const faker = require('faker')
export default {
  props: ['refreshSeconds'], 
  mounted() {
    if (process.env.VUE_APP_ENVIROMENT === 'Demo'){
      setInterval(this.generateFaker,this.refreshSeconds*1000)   
    }else{
      setInterval(this.refresh, this.refreshSeconds*1000);
      }
     
    let statsCache = localStorage.getItem("Stats");
    if (statsCache){
      this.stats=JSON.parse(statsCache)
    }
    let ticketsCache = localStorage.getItem("Tickets");
    if(ticketsCache){
      this.tickets=JSON.parse(ticketsCache);
    }
    if (process.env.VUE_APP_ENVIROMENT == 'Demo'){
      this.generateFaker()
    }else{this.refresh();}    
  },
  data() {
    return {
      error:false,
      // stats: {},
      tickets: []
    };
  },
  methods: {
    refresh() {
      axios
        .get(`http://${process.env.VUE_APP_API_IP}:3018/`)
        .then(response => {
          // handle success
          // console.log(response);
         let ticket = response.data.items
        //  let stats = 0
         this.error=false;        
         this.updateValues(ticket);
        })
        .catch((error)=> {
          // handle error 
          console.log(error);
          this.error=true;
        });
    },
    generateFaker(){
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
    updateValues(newTickets){
      // this.stats=newStats;
      this.tickets=newTickets.slice(0,10)  
      localStorage.setItem("Tickets",JSON.stringify(newTickets));
    }
  }
};
</script>