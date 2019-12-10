console.log('Starting notes.js');

const fs = require('fs');
console.log(fs);
var addNote = (title, body) => {
	var notes = [];
	var note = {
		title,
		body
	};

	//If the file notes-data.json not exist --> throw error when readFileSync
	try {
		var notesString = fs.readFileSync('notes-data.json');
		notes = JSON.parse(notesString);
	} catch (e) {

	}

	var duplicatesNotes = notes.filter((note) => note.title === title)
	if (duplicatesNotes.length === 0) {
		notes.push(note);
		fs.writeFileSync('notes-data.json', JSON.stringify(notes));
	}

};

var getAll = () => {
	console.log('Getting all notes');
};
var readNote = (title) => {
	console.log('Reading note', title);
};
var removeNote = (title) => {
	console.log('Removing note', title);
};
module.exports = {
	addNote,
	getAll,
	readNote,
	removeNote
}

// node app.js add --title=secret --body="This is my secret"
// node app.js list