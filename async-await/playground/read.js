const fs = require('fs');

fs.readFile('./a.txt', 'utf8',(err,data) =>{
    if(err) return console.log('Error: '+ err);
    console.log('Du lieu:' + data);
})

console.log('End');