console.log('Starting app.');
//File stream
//Follow the link to understand require, modules and modules.exports
//https://viblo.asia/p/nodejs-require-exports-and-moduleexports-djeZ18PQKWz
//We will referent to a module and save it in a variable 'fs'

const fs = require('fs');
const os = require('os');
const notes = require('./notes.js');

// var user = os.userInfo();
// console.log(user);

// fs.appendFile('greetings.txt', '\nHello ' + user.username, (err) => {
// 	if (err) throw err;
// 	console.log('The "Hello world!" was appended to file!');
// });

// fs.appendFile('greetings.txt', `\nHello ${user.username} with age = ${notes.age}`, (err) => {
// 	if (err) throw err;
// 	console.log('The "Hello world!" was appended to file!');
// });


// var res = notes.addNote();
// console.log(res);

console.log('Result:', notes.add(110,39));