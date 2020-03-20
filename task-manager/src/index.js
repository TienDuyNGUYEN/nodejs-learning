const express = require('express');
require ('./db/mongoose');
const User = require('./models/user');


const app = express();

app.use(express.json());

const port = process.env.process || 3000;

app.post('/users',(req,res) =>{
    const user  = new User(req,res);

    
    res.send('testing!');
})

app.listen(port, () => {
    console.log('Server is up on port' + port);
})

