const express = require('express')
const app = express()
const port = 3001

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/', (req, res) => res.send({
    stats: {
        pending: Math.floor(Math.random() * (350 - 200) + 200),
        running: Math.floor(Math.random() * (350 - 200) + 200),
    }
}))

app.listen(port, () => console.log(`Gridengine app listening on port ${port}!`))
