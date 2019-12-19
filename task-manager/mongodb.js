//CRUD Create Read Update Delete

const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27107';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {
	useUnifiedTopology: true
}, (error, client) => {
	if (error) {
		return console.log('Unable to connect to database');
	}
	// const db = client.db(databaseName);
	// db.collection('user').insertOne({
	// 	name: 'TDuy',
	// 	age: 26
	// })
	console.log('Successful to connect the database!')
});



