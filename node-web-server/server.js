const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

//millwaire express
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log',log +'\n',(err)=>{
        if(err){
            console.log('Unable to append to server.log.')
        }
    });
    next();
});

//Using when site error to maintenance
// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// })

//Methode static of express to call html
app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) =>{
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage:'Welcome to  my website', 
        currentYear: new Date().getFullYear()
    });
    
});

//Using partials to create functions and call thems in .hbs
hbs.registerHelper('getCurrentYear',()=>{
return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text) =>{
    return text.toUpperCase();
})

//The methos normal to get this datas in .hbs
app.get('/about',(req,res)=>{
    res.render('./about.hbs',{
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
})


// /bad -send back json with errorMessage
app.get('/bad', (req,res)=>{
    res.send({
        errorMessage: 'Unable to handle request'
    })
})
app.listen(3000, () =>{
    console.log('Server is up on port 3000');
});