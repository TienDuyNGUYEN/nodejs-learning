const request = require('request');

const url = 'https://api.darksky.net/forecast/007d3c82c58fc972f142c6006e77055b/37.8267,-122.4233';


//Geocoding
//Address -> Lat/Long -> weather
const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoidGllbmR1eS1uZ3V5ZW4iLCJhIjoiY2s0MzllMmhlMDUzaDNtbzVmMDZ5azk2diJ9.Ihh8EPoujCbudDD-aPkW6Q';
request({url:geocodeURL,json:true},(error, response)=>{
    const latitude = response.body.features[0].center[0];
    const longitude = response.body.features[0].center[1];
    console.log(latitude,longitude);
});