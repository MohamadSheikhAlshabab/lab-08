'use strict';
function trailHandler(request, response) {
    superagent(

        // `https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200721689-7e619a9e9f5056b3876932f9a719a82f` 

        // `https://www.hikingproject.com/data/get-trails?lat=${request.query.latitude}&lon=${request.query.longitude}&maxDistance=10&key=${TRAIL_API_KEY}`
      
     
         `https://www.hikingproject.com/data/get-trails?lat=${request.query.latitude}&lon=${request.query.longitude}&maxDistance=10&key=200721689-7e619a9e9f5056b3876932f9a719a82f`
    ).then((trailRes) => {
            console.log(trailRes);
            const trailSummary = trailRes.body.data.map((trailData) => {
                return new Trail(trailData);
            });
            response.status(200).json(trailSummary);
        })
    .catch((err) => errorHandler(err, request, response));
}

function Trail(trailData) {

    this.name = trailData.name;
    this.location = trailData.location;
    this.length = trailData.length;
    this.stars = trailData.stars;
    this.star_votes = trailData.star_votes;
    this.summary = trailData.summary;
    this.trail_url = trailData.trail_url;
    this.conditions = trailData.conditions;
    this.condition_date = trailData.condition_date;
    this.condition_time = trailData.condition_time;
}


module.exports=trailHandler;