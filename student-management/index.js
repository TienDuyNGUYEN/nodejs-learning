const express= require('express');
const pg = require('pg');
const dotenv = require('dotenv');
const bodyParser =require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './views');

const server = require('http').Server(app);

server.listen(port, function(){
    console.log('App is listening on port : '+ port);
})


dotenv.config();
const userdb = process.env.DB_USER
const passdb = process.env.DB_PASS;
const dbname = process.env.DB_NAME;
const { Client } = require('pg')
const connectionString = `postgresql://${userdb}:${passdb}@localhost:5432/${dbname}`;
const client = new Client({
    connectionString: connectionString
});
client.connect();



const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function(req,res){
    client.query("select * from student", (err, result) => {
        if (err) {
            res.status(400).send(err);
            return console.error('Error running query', err);
        }
        res.render('main', { data: result });
        // console.log(result);
        // res.status(200).send(result.rows);
    });
});

app.get('/student/list', function(req,res){
    client.query("select * from student", (err, result) => {
        if (err) {
            res.status(400).send(err);
            return console.error('Error running query', err);
        }
        res.render('students', { data: result });
        // res.status(200).send(result.rows);
    });
});

app.get('/student/add', function (req, res) {
        res.render('add');
});

app.post('/student/add', urlencodedParser, function (req, res) {
        let sql= `insert into student(name, email) values('${req.body.name}', '${req.body.email}')`
        client.query(sql, (err, result) => {
            if (err) {
                res.status(400).send(err);
                return console.error('Error running query', err);
            }
            res.redirect('./list')
        });
});


app.get('/student/edit/:id', function (req, res) {
    let id = req.params.id;
    client.query("select * from student where id=" + id, (err, result) => {
        if (err) {
            res.status(400).send(err);
            return console.error('Error running query', err);
        }
        res.render('edit', { data: result.rows[0] });
    });
});

app.post('/student/edit/:id', urlencodedParser, function (req, res) {
    let id = req.params.id;
        let sql= `update student set name='${req.body.name}' ,email='${req.body.email}' where id=${id}`;

        client.query(sql, (err, result) => {
            if (err) {
                res.status(400).send(err);
                return console.error('Error running query', err);
            }
            res.redirect('../list')
        });
});


app.get('/student/delete/:id', function(req,res){
    let id =req.params.id;
    client.query('delete from student where id='+ id, (err, result) =>{
        if(err){
            res.status(400).send(err);
            return console.error('Error running query', err);
        }
        res.redirect('../list');
    })
})


