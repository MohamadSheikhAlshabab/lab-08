'use strict';
function yelpHandler(request, response) {
    superagent(
        (`https://api.yelp.com/v3/businesses/search?location=${request.query.search_query}`) .set({ "Authorization": `Bearer ${process.env.YELP_API_KEY}` })
        
    
       
    ).then((yelpRes) => {
            console.log(yelpRes);
            const yelpSummary = yelpRes.body.data.map((yelpData) => {
                return new Yelp(yelpData);
            });
            response.status(200).json(yelpSummary);
        })
    .catch((err) => errorHandler(err, request, response));
}

function Yelp(yelpData) {

    this.name = yelpData.name;
    this.image_url = yelpData.image_url;
    this.price = yelpData.price;
    this.rating = yelpData.rating;
    this.url = yelpData.url;

}

module.exports=yelpHandler;