console.log('Starting app.');
//File stream
//Follow the link to understand require, modules and modules.exports
//https://viblo.asia/p/nodejs-require-exports-and-moduleexports-djeZ18PQKWz
//We will referent to a module and save it in a variable 'fs'

const fs = require('fs');
const os = require('os');
const notes = require('./notes.js');
const _ = require('lodash');

console.log(_.isString(true));
console.log(_.isString('Duy'));
console.log(_.uniq('Tien-Duy'));
var filteredArray = _.uniq(['TienDuy',1,'Tien','Duy','TienDuy','1','2',1,2]);
console.log(filteredArray);



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

// console.log('Result:', notes.add(110,39));
