'use strict';
function movieHandler(request, response) {
    superagent(

        (`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${request.query.search_query}`)
    ).then((moiveRes) => {
            console.log(moiveRes);
            const movieSummary = moiveRes.body.data.map((movieData) => {
                return new Movie(movieData);
            });
            response.status(200).json(movieSummary);
        })
    .catch((err) => errorHandler(err, request, response));
}


function Movie(movieData) {

    this.title = movieData.title;
    this.overview = movieData.overview;
    this.average_votes = movieData.average_votes;
    this.total_votes = movieData.total_votes;
    this.image_url = movieData.image_url;
    this.popularity = movieData.popularity;
    this.released_on = movieData.released_on;
 
}

module.exports=movieHandler;