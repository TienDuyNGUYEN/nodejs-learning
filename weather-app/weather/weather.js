// const request = require('request');

// var getWeather = (lat, lng, callback)=> {
// 	// console.log(`url = https://api.darksky.net/forecast/007d3c82c58fc972f142c6006e77055b/${lat},${lng}`);
// 	request({
// 		url: `https://api.darksky.net/forecast/007d3c82c58fc972f142c6006e77055b/${lat},${lng}`,
// 		json: true
// 	}, (error, response, body) => {
// 		if(error){
// 			callback('Unable to connect to forecast.io server.');

// 		} else if(response.statusCode === 400){
// 			callback('Unable to get weather');
// 			// console.log(`url = ${url}`);
// 		} else if(response.statusCode === 200){
// 			callback(undefined, {
// 				temperature: body.currently.temperature,
// 				apparentTemperature: body.currently.apparentTemperature
// 			});
// 			// console.log(`url = ${url}`);
// 		}

// 	})

// }
// module.exports.getWeather = getWeather;
'use strict';

const request = require('request');
const https = require('https');
var agentOptions;
var agent;

const lat = 39.9396284;
const lng = -75.18663959999999;

agentOptions = {
	host: 'api.darksky.net'
	, port: '443'
	, path: '/'
	, rejectUnauthorized: false
};

agent = new https.Agent(agentOptions);

request({
	url: `https://api.darksky.net/forecast/007d3c82c58fc972f142c6006e77055b/${lat},${lng}`, 
	json: true,
	method: 'GET',
	agent: agent,
	

}, function (error, response, body) {
	if (error) {
		console.log('Unable to connect to forecast.io server.');
		console.log(error);
	} else if (response.statusCode === 400) {
		console.log('Unable to get weather');
	} else if (response.statusCode === 200) {
		try {
			console.log(body.currently.temperature);
			console.log(body.currently.apparentTemperature);
		}
		catch (e) {
			console.log('Something go wrong!')
			console.log(e);
		}

	}
});
