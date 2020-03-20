const mongoose = require('mongoose');

//Tao database trong mongodb
mongoose.connect('mongodb://127.0.0.1:27017/task-manager',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology: true 

})


const Task = mongoose.model('Task',{
    description:{
        type: String,
        require:true,
        trim:true
    },
    completed:{
        type:Boolean,
        defaut:false
    }
})
