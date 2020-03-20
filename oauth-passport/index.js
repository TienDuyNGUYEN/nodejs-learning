const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const localStrategy = require('passport-local').Strategy;
const fs = require('fs');
const path = require('path');


const configDB = path.join(__dirname,'./config/database.js');

app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './views');

const port = process.env.PORT || 3000;
const server = require('http').Server(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        maxAge: 1000 * 60 * 60 //Token 1 hours
    }
}))

app.use(passport.initialize());
app.use(passport.session());

server.listen(port, function () {
    console.log('App is listening on port : ' + port);
})



app.get('/', function (req, res) {
    res.render('index');
});

app.route('/login')
    .get((req, res) => res.render('login'))
    .post(passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/loginOK'
    }));


app.get('/private', (req, res) => {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        res.send('Welcome to private page');
    } else {
        res.send('Ban chua login');
    }
});

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        res.redirect("/login");
    }
}

app.get('/loginOK', (req, res) => {
    res.send('login ok');
})

//Su dung kieu chung thuc local voi passport-local --> strategy
passport.use(new localStrategy(
    (username, password, done) => {

        fs.readFile(configDB, (err, data) => {
            if (err) { return done(err); }
            const db = JSON.parse(data);
            const userRecord = db.find(user => user.usr == username)
            if (!userRecord) { return done(null, false); }
            if (userRecord.pwd == password) {
                return done(null, userRecord);
            } else {
                return done(null, false);
            }
        })
    }
));

//KHi chung thuc thanh cong, ta se su dung ham tiep theo
passport.serializeUser((user, done) => {
    //Day ra nguoi dung va ghi ra cookie
    done(null, user.usr);
    // console.log(user);
});


passport.deserializeUser((username, done) => {
    fs.readFile(configDB, (err, data) => {
        if (err) { return done(err) };
        const db = JSON.parse(data);
        const userRecord = db.find(user => user.usr == username);
        if (!userRecord) { return done(null, false) };
        if (userRecord.pwd == password) {
            return done(null, userRecord);
        } else {
            return done(null, false);
        }
    })
})