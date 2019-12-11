const chalk = require('chalk');
const yargs = require('yargs');

const getNotes= require('./notes.js');
const titleOption = {
    describe: 'Note title',
    demandOption: true, 
    type: 'string'
}
const bodyOption = {
    describe: 'Description of note',
    demandOption: false,
    type: 'string'
}
//Crreate add command
yargs.command({
    command:'add',
    describe:'Add a new note',
    builder:{
        title:titleOption,
        body: bodyOption
    },
    handler: function(argv){
        console.log('Adding a new note!',argv);
    }
})

//Create remove command
yargs.command({
    command:'remove',
    describe: 'Remove a note',
    builder:{
        title:titleOption
    },
    handler:function(argv){
        console.log('Removing a note!', argv);
    }
})

//Create read command
yargs.command({
    command: 'read',
    describe:'Read a note',
    builder:{
        title:titleOption
    },
    handler:function(argv){
        console.log('Reading a note!', argv);
    }
})

yargs.argv;