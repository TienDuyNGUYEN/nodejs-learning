
var asyncAdd = (a, b) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (typeof a === 'number' && typeof b === 'number') {
				resolve(a + b);
			} else {
				reject('Argument must be numbers');
			}
		}, 1500);
	})
}

//Using the promise
//Principe:
//startProcess1 --> return the result of process1 --> startProcess2 --> return result of process2...

asyncAdd(5, 5)
	.then((res) => {
		console.log('Result: ', res);
		return asyncAdd(res, 33);
	}).then((res) => {
		console.log('Result2:', res);
		return asyncAdd(res, '2');
	}).then((res) => {
		console.log(res);
		return asyncAdd(res, 0);
	}).then((res) => {
		if (res === 45) {
			console.log('Excellence!')
		} else if (typeof res === 'number') {
			console.log('Should be 45');
		}
	}).catch((error) => {
		console.log('Error: ', error);
	});

//Using Async, Await, ES7
var sum = (a, b)=>{
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (typeof a === 'number' && typeof b === 'number') {
				resolve(a + b);
			} else {
				reject('Argument must be numbers');
			}
		}, 1500);
	})
}


async function doGreatThing() {
	try {
		const firstResult = await sum(5,5);
		console.log(firstResult);
		const secondResult = await sum(firstResult,33);
		console.log(secondResult);
		const thirdResult = await sum(secondResult,2);
		console.log(thirdResult);
		const resultFinal = await sum(thirdResult,0)
		
		if (resultFinal === 45) {
			console.log('Excellence!')
			console.log('Result : ',thirdResult);
		} else if (typeof resultFinal === 'number') {
			console.log('Should be 45');
		}
	} catch (error) {
		console.log('Error: ', error);
	}
}
doGreatThing();


// somePromise = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		resolve('Hey. It worked!');
// 		// resolve();
// 		// reject('Unable to fullfil promise');
// 	}, 3000);
// });

// somePromise.then(message => {
// 	console.log(`Success: ${message}`);
// }, (errorMessage) => {
// 	console.log('Error:', errorMessage);
// });