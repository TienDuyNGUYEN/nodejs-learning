const express = require('express');
const path= require('path');
const hbs = require('hbs');
const forescast = require('./utils/forestcast.js');
const geocode = require('./utils/geocode.js');

const app = express();

//Define paths for Express config
const publicDir = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');


//Using handlebars
//Setup handler bars engine and view locations
app.set('view engine','hbs');
app.set('views',viewPath);

//Using patials to create functions for hbs files
hbs.registerPartials(partialsPath);


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
    res.render('index',{
        title:'Weather',
        name:'Tien Duy NGUYEN',
        friend:"Huong"
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        about:'Tien Duy is a Civil Engineer. He is now working for Vinci Construction France Company in Paris.',
        name: 'Tien Duy  NGUYEN'
    });
});


app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        helpText:'Need some help?',
        name: 'Tien Duy NGUYEN'
    });
});

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Yous must provide an address!'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error});
        }
        forescast(latitude, longitude, (error,forescastData)=>{
            if(error){
                return res.send({error});
            }
            res.send({
                forescast:forescastData,
                location,
                address:req.query.address
            })
        })
    });

    // res.send({
    //     forescast:'It is snowing',
    //     location:'Vietnam',
    //     address:req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        res.send({
            error: 'Yous must provide a search term'
        })
    } 
    res.send({
        products:[]
    })
   
});

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        errorMessage:'Help article not found!'

    })
})

//handle error if link of page does not match
app.get('*',(req, res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'Page not found'
    })
});

app.listen(3000, ()=>{
    console.log('Server is up on port 3000');
});