console.log('Starting notes.js');

var addNote = (title, body) => {
	console.log('Adding new node', title, body);
}
var getAll = () => {
	console.log('Getting all notes');
}
var readNote = (title) => {
	console.log('Reading note', title);
}
var removeNote = (title) => {
	console.log('Removing note',title);
}
module.exports ={
	addNote,
	getAll,
	readNote,
	removeNote
}

// node app.js add --title=secret --body="This is my secret"
// node app.js list