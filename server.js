'use strict'
require('dotenv').config();
const express = require('express');
const pg = require('pg');
const PORT = process.env.PORT || 4000;
const app = express();

const client =new pg.client(process.env.DATABASE_URL);
client.on('error', (err) => {
    throw new Error(err);
});
client.connect().then(() => {
    app.listen(PORT, () => console.log(`The Server is Up and Running on Port ${PORT}`));

}).catch(err => {
    throw new Error(`Startup Error ${err}`)
});

// app.get('/add', (request, response) => {
//     let cityName = request.query.cityName;
//     let cityLocation = request.query.cityLocation;
//     const SQL = 'INSERT INTO mytable(cityName,cityLocation)VALUES($1,$2)';
//     const safeValues = [cityName, cityLocation];
//     client.query(SQL, safeValues).then((results) => {
//         response.status(200).json(results);
//     }).catch((err) => {
//         response.status(500).send(err);
//     });
// })
// app.get('/mytable', (request, response) => {
//     const SQL = 'SELECT * FROM mytable ';
//     client.query(SQL).then((results) => {
//         response.status(200).json(results);
//     }).catch((err) => {
//         response.status(500).send(err);
//     });
// });


