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
		notes.addNote(argv.title, argv.body);
		break;
	case 'list':
		notes.getAll();
		break;
	case 'read':
		notes.readNote(argv.title);
		break;
	case 'remove':
		notes.removeNote(argv.title);
		break;
	default:
		console.log('Command note recognize');
		break;
}