const fs = require('fs');

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
const readNote = (title) => {
    const notes = loadNotes();
    console.log(notes);

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

module.exports = {
    getNotes,
    addNote,
    readNote,
}