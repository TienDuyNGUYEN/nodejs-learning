const fs = require('fs');
var path = require('path');

const dataBuffer = fs.readFileSync(path.join(__dirname, '1-json.json'));
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);
data.forEach((note) =>console.log(note.title));
console.log(data);
console.log(path.join(__dirname, 'file.json'))