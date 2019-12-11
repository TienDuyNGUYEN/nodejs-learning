// const yargs = require('yargs');
// const geocode = require('./geocode/geocode.js');

// const argv = yargs
// 	.options({
// 		a: {
// 			demand: true,
// 			alias: 'address',
// 			describe: 'Address to get weather for',
// 			string: true
// 		}
// 	})
// 	.help()
// 	.alias('help', 'h')
// 	.argv;
// geocode.geocodeAddress(argv.address, (errorMessage,results)=>{
// 	if(errorMessage){
// 		console.log(errorMessage);
// 	} else{
// 		console.log(JSON.stringify(results.undefined,2));
// 	}
// });

// 007d3c82c58fc972f142c6006e77055b

request = require('request');
request({
	url: 'https://api.darksky.net/forecast/007d3c82c58fc972f142c6006e77055b/39.9396284,-75.18663959999999',
	json: true
}, (error, response, body) => {
	if(error){
		console.log('Unable to connect to forecast.io server.');
	} else if(response.statusCode === 400){
		console.log('Unable to get weather');
	} else if(response.statusCode === 200){
		console.log(body.currently.temperature);
	}
	
})