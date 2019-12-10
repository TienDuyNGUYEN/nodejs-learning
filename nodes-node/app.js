console.log('Starting app.');

const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
var command = process.argv[2];
console.log('Command: ',command);
console.log(process.argv);
console.log('Yargs',argv);

switch (command){
	case 'add':
		var note = notes.addNote(argv.title, argv.body);
		if(note){
			console.log('Node created');
			console.log('__');
			console.log(`Title: ${note.title}`);
			console.log(`Body: ${note.body}`);
		}else{
			console.log('Node title taken');
		}
		break;
	case 'list':
		notes.getAll();
		break;
	case 'read':
		notes.readNote(argv.title);
		break;
	case 'remove':
		console.log(JSON.stringify(notes));
		var noteRemoved =  notes.removeNote(argv.title);
		var message = noteRemoved? 'Note was remove' : 'Note not found';
		console.log(message);
		break;
	default:
		console.log('Command note recognize');
		break;
}