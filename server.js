'use strict'

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const pg = require('pg');
const superagent = require('superagent');
const PORT = process.env.PORT || 4000;

let app = express();
app.use(cors());

const locationHandler = require('./modules/location.js');
const weatherHandler = require('./modules/weather.js');
const trailHandler = require('./modules/events.js');
const movieHandler = require('./modules/movies.js');
const yelpHandler = require('./modules/yelp.js');
const functions = require('./modules/functions.js');
app.get('/', (request, response) => {
    response.send('Welcome to Home Page!!');
});

app.get('/location', locationHandler);

app.get('/weather', weatherHandler);
app.get('/trails', trailHandler);
app.get('/movies', movieHandler);
app.get('/yelp', yelpHandler);


app.get('/add', (request, response) => {
    let search_query = request.query.search_query;
    const SQL = 'INSERT INTO locations(search_query)VALUES($1)';
    const safeValues = [search_query];
    client.query(SQL, safeValues).then((results) => {
        response.status(200).json(results);
    }).catch((err) => {
        response.status(500).send(err);
    });
})
app.get('/locations', (request, response) => {
  
    const SQL = 'SELECT * FROM locations ';
    client.query(SQL).then((results) => {
        response.status(200).json(results);
    }).catch((err) => {
        response.status(500).send(err);
    });
});



app.get('/movies', (request, response) => {

    const SQL = 'SELECT * FROM locations ';
    client.query(SQL).then((results) => {
        response.status(200).json(results);
    }).catch((err) => {
        response.status(500).send(err);
    });
});

app.use('*', functions.notFoundHandler);
app.use(functions.errorHandler);

const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', (err) => {
    throw new Error(err);
});
client.connect().then(() => {
    app.listen(PORT, () => console.log(`The Server is Up and Running on Port ${PORT}`));

}).catch(err => {
    throw new Error(`Startup Error ${err}`)
});
app.listen(PORT, () => console.log(`Server is Running well on PORT ${PORT}`));
