var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
// định nghĩ cấu trúc user model
var userSchema = mongoose.Schema({
    local: {
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user'
        }
    }
}, {
    timestamps: true
});
// methods ======================
// phương thực sinh chuỗi hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, 8);
};
userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.local.password);
}

//Async method
// userSchema.pre('save', function(next){
//     var user = this;
//     var SALT_FACTOR = 10;
//     if(!user.isModified('password')){
//         return next();
//     } 
//     bcrypt.genSalt(SALT_FACTOR, function(err, salt){
//         if(err){
//             return next(err);
//         }
//         bcrypt.hash(user.local.password, salt, null, function(err, hash){
//             if(err){
//                 return next(err);
//             }
//             user.local.password = hash;
//             next();
//         });
//     });
// });
// // kiểm tra password có hợp lệ không
// userSchema.methods.validPassword = function(passwordAttempt, cb){

//     bcrypt.compare(passwordAttempt, this.local.password, function(err, isMatch){

//         if(err){
//             return cb(err);
//         } else {
//             cb(null, isMatch);
//         }
//     });

// }
module.exports = mongoose.model('user', userSchema,'user');