const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');
const titleOptions ={
	describe: 'Title of note',
	demand: true,
	alias: 't'
}
const bodyOptions = {
	describe: 'Body of note',
			demand: true,
			alias: 'b'
}
const argv = yargs
	.command('add', 'Add a new note', {
		title:titleOptions,
		body: bodyOptions
	})
	.command('list', 'List all notes')
	.command('read', 'Read a note', {
		title: titleOptions
		
	})
	.command('remove', 'Remove a note', {
		title: titleOptions
	})
	.help()
	.argv;
var command = argv._[0];
console.log('Command: ', command);
console.log(process.argv);
console.log('Yargs', argv);

switch (command) {
	case 'add':
		var note = notes.addNote(argv.title, argv.body);
		if (note) {
			console.log('Note created');
			logNote(note);
		} else {
			console.log('Node title taken');
		}
		break;
	case 'list':
		var allNotes = notes.getAll();
		console.log(`Printing ${allNotes.length} notes(s).`);
		allNotes.forEach(note => {
			logNote(note);
		});
		break;
	case 'read':
		var note = notes.readNote(argv.title);
		if (note) {
			console.log('Node found');
			logNote(note);
		} else {
			console.log('Node not found');
		}
		break;
	case 'remove':
		console.log(JSON.stringify(notes));
		var noteRemoved = notes.removeNote(argv.title);
		var message = noteRemoved ? 'Note was remove' : 'Note not found';
		console.log(message);
		break;
	default:
		console.log('Command note recognize');
		break;
}

function logNote(note) {
	console.log('__');
	console.log(`Title: ${note.title}`);
	console.log(`Body: ${note.body}`);
}
