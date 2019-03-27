//RSS Parser for the live ticket feed component
const express = require('express');
const app = express();
const port = 3018;
let Parser = require('rss-parser');
let parser = new Parser();
try {
    (async () => {
        let Url = 'http://itsupport-rss:abcd1234@oaoa.eng.gla.ac.uk/rt/NoAuth/rss/wallan/655a8620b7032c76/?Order=DESC%7CASC%7CASC%7CASC&Query=Owner+%3D+%27Nobody%27+AND+Status+%3D+%27new%27+AND+Queue+%3D+%27General%27&OrderBy=id%7C%7C%7C' * / process.env.VUE_APP_TICKETS_URL;
        let feed = await parser.parseURL(Url);
        console.log(feed.title);
        feed.items.forEach(item => {
            console.log(item.title + ':' + item.link)
        });
        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        app.get('/', (req, res) => res.send(
            feed
        ))
        app.listen(port, () => console.log(`RSS PARSER app listening on port ${port}!`))
    })();
} catch (e) {
    throw Error(e);
}