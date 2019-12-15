const request = require('request');


const geocode = (address, callback) => {
    // const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidGllbmR1eS1uZ3V5ZW4iLCJhIjoiY2s0MzllMmhlMDUzaDNtbzVmMDZ5azk2diJ9.Ihh8EPoujCbudDD-aPkW6Q`;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidGllbmR1eS1uZ3V5ZW4iLCJhIjoiY2s0MzllMmhlMDUzaDNtbzVmMDZ5azk2diJ9.Ihh8EPoujCbudDD-aPkW6Q`;
    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            callbackg('Unable to connect to location services!', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to connect to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    })
}


module.exports = geocode;