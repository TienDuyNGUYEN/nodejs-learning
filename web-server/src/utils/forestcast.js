const request = require('request');

const forestcast = ((latitude, longitude, callback) => {
    request({
        url: `https://api.darksky.net/forecast/007d3c82c58fc972f142c6006e77055b/${latitude},${longitude}`,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to forescast services!', undefined);
        } else if (response.body.err) {
            callback('Unable to find the location');
        }else {
            callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
        }
    })
});


module.exports = forestcast;