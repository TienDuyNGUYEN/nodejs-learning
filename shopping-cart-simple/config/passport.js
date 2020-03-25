const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const { check, validationResult } = require('express-validator');

//*****************LOCAL SIGNUP********************/
passport.use('local.signup', new LocalStrategy({
    // mặc định local strategy sử dụng username và password
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true //Cho phep chung ta gui request lai ham callback
}, function (req, email, password, done) {
    [
        check('email', 'Invalid does not Empty').not().isEmpty(),
        check('email', 'Invalid email').isEmail(),
        check('password', 'Password more than 4 degits')
        .isLength({ min: 4 })
        .custom((val, { req, loc, path }) => {
            if (val !== req.body.confirm_password) {
                throw new Error("Passwords don't match");
            } else {
                return value;
            }
        })
    ]

    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        let messages = [];
        errors.forEach((error) => {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }

    // asynchronous
    // Hàm callback của nextTick chỉ được thực hiện khi hàm trên nó trong stack (LIFO) được thực hiện
    // User.findOne sẽ không được gọi cho tới khi dữ liệu được gửi lại
    process.nextTick(function () {
        // Tìm một user theo email
        // chúng ta kiểm tra xem user đã tồn tại hay không
        User.findOne({ 'local.email': email }, function (err, user) {
            if (err)
                return done(err);
            if (user) {
                return done(null, false, { message: 'Email is already taken.' });
            } else {
                // Nếu chưa user nào sử dụng email này
                // tạo mới user
                var newUser = new User();
                // lưu thông tin cho tài khoản local
                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);
                // lưu user
                newUser.save(function (err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });
    });
}))


// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session

// used to serialize the user for the session
passport.serializeUser((user, done) => {
    done(null, user.id); //Dau tien se ghi ra ten hoac id cua user
});

//Sau do tim kiem ten hoac id da ghi ra
passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (err, user) => {
        done(err, user);
    })
});

