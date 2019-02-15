const express = require('express')
const app = express()
const port = 3002
const request = require('request');
require('dotenv').config()
console.log(process.env.DARK_SKY_API_KEY)


var weather = {};
//setInterval(getWeather, 600000)
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/', (req, res) => res.send(
    weather
))

app.listen(port, () => console.log(`weather app listening on port ${port}!`))

function getWeather() {
    request(`https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/55.8611,-4.2502?units=uk2`, { json: false }, (err, res, body) => {
        if (err) { return console.log(err); }
        weather = res.body
        console.log(weather)
    });
};
getWeather()