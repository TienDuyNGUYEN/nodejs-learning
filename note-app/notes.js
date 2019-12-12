const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return 'Yours notes ...';
};

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter((note) => {
        return note.title === title;
    });
    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => {
        return note.title !== title;
    });

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'));
        saveNotes(notesToKeep);
    } else {
        console.log(chalk.red.inverse('Node notes found!'));
    }


}
const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) =>  note.title === title);
    if(note){
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    }else{
        console.log(chalk.red.inverse('Node note found'));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return []
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse('Your notes'));
    notes.forEach((note) => {
        console.log(note.title);
    })
}

module.exports = {
    getNotes,
    addNote,
    removeNote,
    readNote,
    listNotes
}