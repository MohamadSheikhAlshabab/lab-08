'use strict';


function weatherHandler(request, response) {
    superagent(
        `https://api.weatherbit.io/v2.0/forecast/daily?city=${request.query.search_query}&key=${process.env.WEATHER_API_KEY}`
    ).then((weatherRes) => {
        console.log(weatherRes);
        const weatherSummary = weatherRes.body.data.map((weatherData) => {
            return new Weather(weatherData);
        });
        response.status(200).json(weatherSummary);
    })
        .catch((err) => errorHandler(err, request, response));

}
function Weather(weatherData) {

    this.forecast = weatherData.weather.description;
    this.time = new Date(weatherData.valid_date).toDateString();
}

module.exports=weatherHandler;