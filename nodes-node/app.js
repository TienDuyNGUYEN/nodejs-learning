console.log('Starting app.');

const fs = require('fs');
const _ = require('lodash');

const notes = require('./notes.js');


console.log(_.isString(true));
console.log(_.isString('Duy'));
//_.uniq: Get the unique item in the array
console.log(_.uniq('Tien-Duy'));
var filteredArray = _.uniq(['TienDuy',1,'TienDuy','Duy','TienDuy',1,2,1,2]);
console.log(filteredArray);
//Using Ctrl+C to stop nodemon
