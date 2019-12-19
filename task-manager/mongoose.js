const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology: true 

})

const user = mongoose.model('User',{
    name:{
        type: String
    },
    age:{
        type:Number
    }
});

const me = new user({
    name: 'Huong',
    age:26
});

me.save().then(() =>{
console.log(me);
}).catch((error)=>{
    console.log('Error', error);
})