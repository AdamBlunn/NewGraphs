const express = require('express')
const app = express()
const port = 3003
const request = require('request');
require('dotenv').config()
// console.log(process.env.DARK_SKY_API_KEY)


var licences = {};
//setInterval(getWeather, 600000)
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/', (req, res) => res.send(
    licences
))

app.listen(port, () => console.log(`licence app listening on port ${port}!`))

function getLicences() {
    request(`http://webapps.eng.gla.ac.uk/licinfo/index.php?action=api_exportjson`, { json: false }, (err, res, body) => {
        if (err) { return console.log(err); }
        licences = res.body
        console.log(licences)
    });
};
getLicences()