console.log('Starting app');

setTimeout(() => {
	console.log('Inside of call back');
},2000);

setTimeout(() => {
	console.log('Second SetTimeout);
},0);


console.log('Finishing app');

//Using callback hell

