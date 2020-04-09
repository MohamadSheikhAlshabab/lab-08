'use strict';

function locationHandler(request, response) {
    const city = request.query.city;
    superagent(
        `https://eu1.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API_KEY}&q=${city}&format=json`
    ).then((res) => {
        console.log(res);
        const geoData = res.body;
        const locationData = new Locations(city, geoData);
        response.status(200).json(locationData);
    }).catch((err) => errorHandler(err, request, respone));

}



function Locations(city, geoData) {
    this.search_query = city;
    this.formatted_qurey = geoData[0].display_name;
    this.latitude = geoData[0].lat;
    this.longitude = geoData[0].lon;

}

module.exports=locationHandler;