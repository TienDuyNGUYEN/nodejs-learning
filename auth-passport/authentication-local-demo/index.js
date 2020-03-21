// server.js
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

mongoose.connect(configDB.url,  {
    useUnifiedTopology: true,
    useNewUrlParser: true
}); // connect tới database 
// mongoose.connection.once('open', () => { console.log('MongoDB Connected'); });
// mongoose.connection.on('error', (err) => { console.log('MongoDB connection error: ', err); });

require('./config/passport')(passport); // 

// Cấu hình ứng dụng express
app.use(morgan('dev')); // sử dụng để log mọi request ra console
app.use(cookieParser()); // sử dụng để đọc thông tin từ cookie
app.use(bodyParser.urlencoded({ extended: false })) // lấy thông tin từ form HTML

app.set('view engine', 'ejs'); // chỉ định view engine là ejs


app.use(session({
    secret: 'xxxxxxxxxxxxx',
    resave: true,
  }))
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 

require('./app/routes.js')(app, passport); // load các routes từ các nguồn

app.listen(port,() =>{
    console.log('App is listening on port: ' + 3000);
})