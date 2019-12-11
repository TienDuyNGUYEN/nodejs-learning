const fs = require('fs');

const getNotes = () => {
    return 'Yours notes ...';
};

const addNote = (title, body) => {
    const notes = loadNotes();
    notes.push({
        title:title,
        body:body
    })
    saveNotes(notes);

}
const readNote = (title,) => {
    const notes = loadNotes();
    console.log(notes);

}

const saveNotes = (notes) =>{
        const dataJSON = JSON.stringify(notes);
        fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(data);
    } catch (error) {
        return []
    }
}

module.exports = {
    getNotes,
    addNote,
    readNote,
}