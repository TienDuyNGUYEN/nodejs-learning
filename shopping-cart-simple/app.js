const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const expressHbs = require('express-handlebars');
const mongoose= require('mongoose');
const configDB = require('./config/configDB');
const passport = require('passport');
const flash = require('connect-flash');
const validator = require('express-validator');


const indexRouter = require('./routes/index');
const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// const publicDir = path.join(__dirname,'./public');
// const viewPath = path.join(__dirname,'./views');
// const partialsPath = path.join(__dirname,'../views/partials');
// app.set('views',viewPath);
// hbs.registerPartials(partialsPath);

app.engine('.hbs',expressHbs({defaultLayout: 'layout',extname:'.hbs'}))
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); //// parse cookies
app.use(session({
  secret:'mysupersecret1',
  resave:false, //Save on to sever on each request change or not
  saveUninitialized:true,//The session wil be store on the server eventhough not ben initialize
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);


mongoose.connect(process.env.MONGODB_URI|| configDB.url,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true,
  useFindAndModify:false
})
mongoose.connection.once('open',() => {console.log('MongoDB connected!')});
mongoose.connection.on('error', (err) => {console.log('MongoDB connection error: '+ err)});
//Call passport to app understand it
require('./config/passport');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
