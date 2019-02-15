const express = require('express')
const app = express()
const port = 3000

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const tickets = [
        {
            id: 11985,
            subject: 'My computer is broken',
            user: 'jane.doe@glasgow.ac.uk'
        },
        {
            id: 11984,
            subject: 'Something else',
            user: 'john.smith@glasgow.ac.uk'
        },
        {
            id: 11983,
            subject: 'I have deleted all of my files',
            user: 'carol.jones@glasgow.ac.uk'
        },
        {
            id: 11982,
            subject: 'My computer is broken',
            user: 'jane.doe@glasgow.ac.uk'
        },
        {
            id: 11981,
            subject: 'Something else',
            user: 'john.smith@glasgow.ac.uk'
        },
        {
            id: 11980,
            subject: 'I have deleted all of my files',
            user: 'carol.jones@glasgow.ac.uk'
        },
        {
            id: 11979,
            subject: 'My computer is broken',
            user: 'jane.doe@glasgow.ac.uk'
        },
        {
            id: 11978,
            subject: 'Something else',
            user: 'john.smith@glasgow.ac.uk'
        },
        {
            id: 11977,
            subject: 'I have deleted all of my files',
            user: 'carol.jones@glasgow.ac.uk'
        },
        {
            id: 11976,
            subject: 'My computer is broken',
            user: 'jane.doe@glasgow.ac.uk'
        },
        {
            id: 11975,
            subject: 'Something else',
            user: 'john.smith@glasgow.ac.uk'
        },
        {
            id: 11974,
            subject: 'I have deleted all of my files',
            user: 'carol.jones@glasgow.ac.uk'
        },
        {
            id: 11973,
            subject: 'My computer is broken',
            user: 'jane.doe@glasgow.ac.uk'
        },
        {
            id: 11972,
            subject: 'Something else',
            user: 'john.smith@glasgow.ac.uk'
        },
        {
            id: 11971,
            subject: 'I have deleted all of my files',
            user: 'carol.jones@glasgow.ac.uk'
        }
    ];

app.get('/', (req, res) => res.send({
    stats: {
        unowned: 10,
        new_this_week: 100,
        resolved_this_week: 80,
        total: 12031
    },
    tickets: tickets.slice(0, Math.random() * (tickets.length - 3) + 3)
}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
