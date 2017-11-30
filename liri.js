var key = require("./keys.js");

function runTime() {
    switch (process.argv[2]) {
        case 'my-tweets':
            myTweets();
            break;
        case 'spotify-this-song':
            spotifyThisSong();
            break;
        case 'movie-this':
            movieThis();
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
            console.log('Commands:');
            console.log('my-tweets');
            console.log('spotify-this-song');
            console.log('movie-this');
            console.log('do-what-it-says');
    }
}
// Display Tweets
function myTweets() {
    var twitter = require('twitter');
    var client = new twitter(key.twitterKeys);
    var screenName = { screen_name: 'Orabilis_' };
    client.get('statuses/user_timeline', screenName, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                var date = tweets[i].created_at;
                console.log("@Orabilis: " + tweets[i].text + " Created At: " + date.substring(0, 19));
                console.log("-----------------------");
            }
        }
        else {
            console.log('Error occurred');
        }
    });
}

// Fetch a spotify song
function spotifyThisSong() {
    var Spotify = require('node-spotify-api');

    var spotify = new Spotify({
        // id: '7ee1079a57994de6beeac80fb83495d9',
        // secret: 'f9e7f3bfb2e248779c33a726961b8ea4'
        id: key.spotifyKeys.id,
        secret: key.spotifyKeys.secret
    });

    var songName = process.argv[3];
    if (!process.argv[3]) {
        songName = "The Sign artist:Ace of Base";
    }


    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        //        console.log(data);
        //console.log(JSON.stringify(data.tracks.items[0], null, 4));

        var artists = [];
        for (let i in data.tracks.items[0].artists) {
            artists.push(data.tracks.items[0].artists[i].name);
        }

        console.log("Artist(s): " + artists.join(", "));
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Preview Link: " + data.tracks.items[0].preview_url);
        console.log("From Album: " + data.tracks.items[0].album.name);
    });
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

function doWhatItSays() {
    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data
        // console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.
        // console.log(dataArr);

        // Modify the commands to those in the text file.
        for (let i = 0; i < dataArr.length; i++) {
            process.argv[i + 2] = dataArr[i];
        }

        runTime();
    });

}
runTime();
