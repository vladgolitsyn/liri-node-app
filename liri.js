// adding per homework instructions
require("dotenv").config();

// adding per homework instructions
var keys = require("./keys.js"); // using reference in Spotify logic instead 

// requiring axios for API calls
var axios = require('axios');

// requiring moment for date conversions
var moment = require('moment');

// requiring fs
var fs = require('fs');

// requiring Spotify NPM package  
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
})

// adding two variables to represent command line user inputs
var requestType = process.argv[2];
var requestVal = process.argv.slice(3).join(" ");

// Bands in Town Artist Events API call function
function concertInfo() {

    var bitApiURL = 'https://rest.bandsintown.com/artists/'
    var bitArtist = requestVal;
    var bitEventsKey = '/events?';
    var bitApiKey = 'app_id=codingbootcamp&date=all';

    axios.get(bitApiURL + bitArtist + bitEventsKey + bitApiKey)
        .then(response => {
            for (i = 0; i < response.data.length; i++) {
                console.log(
                    'Venue: ' + response.data[i].venue.name +
                    '\nLocation: ' + response.data[i].venue.city + ', ' + response.data[i].venue.country +
                    '\nDate & Time: ' + moment(response.data[i].datetime).format("MM/DD/YYYY") +
                    '\n----------------------------------'
                );
            }

        })
        .catch(err => {
            console.log('Error occurred: ' + err);
        });
}

// IMDB API call function
function movieInfo() {

    var imdbApiURL = 'https://www.omdbapi.com/?t='
    var imdbMovie = requestVal;
    var imdbApiKey = '&apikey=trilogy';

    axios.get(imdbApiURL + imdbMovie + imdbApiKey)
        .then(response => {
            console.log(
                'Title: ' + response.data.Title +
                '\nYear: ' + response.data.Year +
                '\nIMDB Rating: ' + response.data.Ratings + // need to break down details
                '\nRotten Tomatoes Rating: ' + response.data.Ratings + // need to break down details
                '\nCountry: ' + response.data.Country +
                '\nLanguage: ' + response.data.Language +
                '\nPlot: ' + response.data.Plot +
                '\nActors: ' + response.data.Actors
            )
        })
        .catch(err => {
            console.log('Error occurred: ' + err);
        });
}

// Spotify API logic
function songInfo() {


    spotify.search({
        type: 'track',
        query: requestVal
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    });
}

// Do What is Says Function
function doWhatItSays() {
    fs.readFile("./random.txt", "utf-8", function (err, data) {

        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);

        var dataArr = data.split(",");

        if (dataArr[0] = 'spotify-this-song') {
            requestVal = dataArr[1];
            songInfo()
        }
    });
};



// if statement which determines which function to invoke based on the requestType entered by user
if (requestType == 'concert-this') {
    concertInfo();
} else if (requestType == 'movie-this') {
    movieInfo();
} else if (requestType == 'spotify-this-song') {
    songInfo();
} else if (requestType == 'do-what-it-says') {
    doWhatItSays();
} else {
    console.log('you need to submit the correct request type, concert-this, movie-this, or spotify-this-song')
}