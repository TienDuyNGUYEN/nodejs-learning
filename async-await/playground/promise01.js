const fs = require('fs');

// let promiseRead = new Promise((resolve, reject) =>{
//     fs.readFile('./a.txt','utf8',(err,data) =>{
//         if(err) return reject(err);
//         resolve(data);
//     })
// })

// promiseRead.then( data => console.log(data), err  => console.log(err + ''));

let read = (filename) =>{
    return new Promise((resole,reject) =>{
        fs.readFile(filename,'utf8',(err, data)=>{
            if(err) return reject(err);
            resole(data);
        })
    })
}

read('./a.txt')
.then(data => console.log(data), err => console.log(err.toString()));