const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id:String,
    name:String,
    email:String
});

const user = mongoose.model('user',userSchema, 'user'); //user thu 2 dam bao ten collections khong bi them s tu dong trong mongodb
module.exports = user;