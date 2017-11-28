var key = require("./keys.js");
// console.log(key);


// process.argv.forEach(function(element) {
//     console.log(element);
// });
//
switch (process.argv[2]) {
    case 'my-tweets':
        console.log('* my-tweets');
        //TODO
        break;
    case 'spotify-this-song':
        console.log('* spotify-this-song');
        //TODO
        break;
    case 'movie-this':
        console.log('* movie-this');
        //TODO
        movieThis();
        break;
    case 'do-what-it-says':
        console.log('* do-what-it-says');
        //TODO
        break;
    default:
        console.log('Commands:');
        console.log('my-tweets');
        console.log('spotify-this-song');
        console.log('movie-this');
        console.log('do-what-it-says');
}


//Fetch movie information from IMDB
function movieThis() {
    var movieName = process.argv[3];

    // undefined & blank strings are falsy
    if (!process.argv[3]) {
        movieName = "Mr. Nobody";
    }

    // replace all empty spaces with '+' for API
    movieName = movieName.replace(/ /g, "+");

    var request = require("request");

    // Then run a request to the OMDB API with the movie specified
    request("http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy", function(error, response, body) {
        // request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {}

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
}
