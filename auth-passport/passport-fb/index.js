const express=  require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./config/db');
const passport = require('passport');
const passportfb =require('passport-facebook').Strategy;
const session = require('express-session');

const server = require('http').Server(app);
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 3000;
server.listen(port,() =>{
    console.log('App is listening on port: ' + 3000);
})

const mongoURI = 'mongodb://127.0.0.1:27017/userDB';
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.MONGODB_URI || mongoURI,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
// console.log(config.getDbConnectionString());
mongoose.connection.once('open', () => { console.log('MongoDB Connected'); });
mongoose.connection.on('error', (err) => { console.log('MongoDB connection error: ', err); });


app.get('/', (req,res) =>{res.render('home');})
app.get('/login', (req,res) =>{ res.render('login');})
app.get('/auth/fb', passport.authenticate('facebook',{scope:['email']}));
app.get('/auth/fb/cb', passport.authenticate('facebook',{
    failureRedirect:'/',
    successRedirect:'/'
}));


 passport.use(new passportfb(
     {
         clientID:'4241001932592190',
         clientSecret:'032cd16ddde7797b89f183c7ae386f30',
         callbackURL:'http://localhost:3000/auth/fb/cb',
         profileFields: ['email','gender','locale','displayName']
     },
     (accessToken, refreshToken,profile, done) =>{
         console.log(profile);
         db.findOne({id:profile._json.id},(err,user) =>{
             if(err) return done(err);
             if(user) return done(null, user);
             const newUser = new db({
                 id: profile._json.id,
                 name: profile._json.name,
                 email: profile._json.email
             });
             newUser.save((err) => {
                 return done(null, newUser);
             })
             console.log('user' + newUser)
         })
     }
 ));

 //Luu vao cookie
passport.serializeUser((user,done)=>{
    done(null, user.id);
})

//Doc tu cookie, va tim kiem trong database cai id tuong ung trong cookie da luu
passport.deserializeUser((id, done)=>{
    db.findOne({id},(err, user)=>{
        done(null, user);
    })
})
