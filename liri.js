var key = require("./keys.js");
console.log(key);
// 8. Make it so liri.js can take in one of the following commands:
//   * 'my-tweets'
//   * 'spotify-this-song'
//   * 'movie-this'
//   * 'do-what-it-says's


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
        movieThis;
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
    var request = require("request");

    // Then run a request to the OMDB API with the movie specified
    request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
        }
    });
}
