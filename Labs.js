const express = require('express')
const app = express()
const port = 3004
const request = require('request');
require('dotenv').config()
// console.log(process.env.DARK_SKY_API_KEY)


var labs = {};
//setInterval(getWeather, 600000)
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/', (req, res) => res.send(
    labs
))

app.listen(port, () => console.log(`licence app listening on port ${port}!`))

function getLab() {
    request(`http://puppet.eng.gla.ac.uk:5555/countlab?labname=Rankine_329`, { json: false }, (err, res, body) => {
        if (err) { return console.log(err); }
        labs = res.body
        console.log(labs)

    });
};
getLab()