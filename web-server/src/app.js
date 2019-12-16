const express = require('express');
const path= require('path');


const publicDir = path.join(__dirname,'../public');
const viewDirPath = path.join(__dirname,'../views');
const viewIndexFile = path.join(viewDirPath,'index.hbs');
const viewAboutFile = path.join(viewDirPath,'about.hbs');
const viewHelpFile = path.join(viewDirPath,'help.hbs');

const app = express();

//Using handlebars
app.set('view engine','hbs');

//use the static file from a folder
app.use(express.static(publicDir));

//handle bars: create a dynamic web
// --Reuse code
// --create website and render easier

//Using express nomal to create a new page
// app.get('',(req,res) =>{
//     res.send('<h1>Weather</h1>');
// })


//Now we use handle bars to make it easier
app.get('',(req,res)=>{
    res.render(viewIndexFile,{
        title:'TienDuy',
        name:'Huong'
    });
});

app.get('/about',(req,res)=>{
    res.render(viewAboutFile,{
        title: 'About me',
        about:'Tien Duy is a Civil Engineer. He is now working for Vinci Construction France Company in Paris.',
        name: 'Tien Duy  NGUYEN'
    });
});


app.get('/help',(req,res)=>{
    res.render(viewHelpFile,{
        title: 'Help',
        helpText:'Need some help?',
    });
});
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