console.log('Starting notes.js');

const fs = require('fs');

var fetchNode = () => {
	try {
		var notesString = fs.readFileSync('notes-data.json');
		return JSON.parse(notesString);
	} catch (e) {
		return [];
	}

}

var saveNotes = (notes) => {
	fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}
var addNote = (title, body) => {
	var notes = fetchNode();
	var note = {
		title,
		body
	};
	var duplicatesNotes = notes.filter((note) => note.title === title);
	if (duplicatesNotes.length === 0) {
		notes.push(note);
		saveNotes(notes);
		return note;
	}
};

var getAll = () => {
	console.log('Getting all notes');
};
var readNote = (title) => {
	console.log('Reading note', title);
};
var removeNote = (title) => {
	var notes = fetchNode();
	var filteredNode = notes.filter((note) => note.title !== title);
	saveNotes(filteredNode);
	return notes.length !== filteredNode.length;
};
module.exports = {
	addNote,
	getAll,
	readNote,
	removeNote
}

// node app.js add --title=secret --body="This is my secret"
// node app.js list