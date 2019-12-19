//CRUD Create Read Update Delete

const mongodb = require('mongodb');
const mongoose = require('mongoose');

const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27107';
const databaseName = 'task-manager';

MongoClient.connect(
	connectionURL,
	 { useNewUrlParser: true },
	  (err, client) => {
		if (err) return console.log(err);
	
	  const db = client.db(databaseName);
	  db.collection('user').insertOne({
		  name:'TienDuy',
		  age:26
	  })
	  }
	);


	// const options = {
	// 	autoIndex: false, // Don't build indexes
	// 	reconnectTries: 30, // Retry up to 30 times
	// 	reconnectInterval: 500, // Reconnect every 500ms
	// 	poolSize: 10, // Maintain up to 10 socket connections
	// 	// If not connected, return errors immediately rather than waiting for reconnect
	// 	bufferMaxEntries: 0
	//   }
	
	// const connectWithRetry = () => {
	//   console.log('MongoDB connection with retry')
	//   mongoose.connect("mongodb://127.0.0.1:27017", options).then(()=>{
	// 	console.log('MongoDB is connected')
	//   }).catch(err=>{
	// 	console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
	// 	setTimeout(connectWithRetry, 5000)
	//   })
	// }
	
	// connectWithRetry()