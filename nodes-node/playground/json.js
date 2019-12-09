
// var obj = {
// 	name: 'TienDuy'
// };
// var stringObj = JSON.stringify(obj);
// console.log(typeof stringObj);
// console.log(stringObj);

// var personString  ='{"name":"TienDuy","age":25}';
// var person = JSON.parse(personString);
// console.log(typeof personString);
// console.log(personString);
// console.log(person);

const fs = require('fs');
var originalNote = {
	title:'Some title',
	body: 'Some body'
};

var originalString = JSON.stringify(originalNote);

fs.writeFileSync('notes.json',originalString);
var noteString = fs.readFileSync('notes.json');

// fs.writeFile('notes.json', originalString, (err) => {
//   if (err) throw err;
// });
// var noteString = fs.readFile('notes.json', (err) => {
// 	if(err) throw err;
// });

var note = JSON.parse(noteString);

console.log(typeof note);
console.log(note.title);

