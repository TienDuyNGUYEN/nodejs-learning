const express = require('express');
const path= require('path');


const publicDir = path.join(__dirname,'../public')

const app = express();

//use the static file from a folder
app.use(express.static(publicDir));

//hander ball: create a dynamic web
// --Reuse code
// --create website and render easier


app.get('',(req,res) =>{
    res.send('<h1>Weather</h1>');
})

app.get('/help',(req,res)=>{
    res.send([{
        name:'TienDuy',
        age:26
    },{
        name: 'Huong',
        age:26
    }]);
})

app.get('/about',(req,res)=>{
    res.send('About Page');
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000');
})