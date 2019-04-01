# liri-node-app

### Liri-node-app

The liri-node-app CLI application perfoms the following four functions:
1. Retrieves concert information based on user-entered band name using the Bands in Town API.
2. Provides movie information based on user-entered movie name using the IMDB API.
3. Retreives song and artist information bsed on user-entered song name using the Spotify API.
4. Executes a do-what-it-says command which reads the random.txt file.

#### Technical Prerequisites

In order for the liri-node-app javascript logic to function, the following NPM packages need to be installed:
1. 'node-spotify-api' - required for Spotify API call
2. 'axios' - require for all API calls
3. 'moment' - required for data/time conversion for concert date/time in Bands in Town API response
4. 'dotenv' - required for secure storage of Spotify API keys

A package.json file was created and stores all of these NPM package dependencies.


