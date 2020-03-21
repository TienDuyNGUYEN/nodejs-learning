const sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();


const db= new sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    dialect:"postgres",
    dialectOption: {
        ssl:false
    },
    define:{
        freezeTableName: true
    }
});


db.authenticate()
.then(() => console.log("Connect database succesfully!"))
.catch(err => console.log('Connect database failed!'));

//Create a table in database
const user = db.define('user',{
    username: sequelize.STRING,
    password: sequelize.STRING
}
);

db.sync();

//Create, update, delete models in database

//user.create: la de tao 1 doi tuong
// user.create({
//     username:'user1',
//     password:'user1pass'
// }).then(user => console.log(user.get({plain: true})));

//De tao nhieu doi tuong ta se su dung user.bulkCreate
// user.bulkCreate([
//     {username: 'user2', password: 'user2pass'},
//     {username: 'user3', password:'user3pass'},
//     {username: 'user4', password:'user4pass'}
// ]).then(arrayUser => arrayUser.forEach( x => console.log(x.get({plain:true}))));

//Delete a row
// user.destroy({
//     where: {
//         id:2
//     }
// }).then(row => console.log(row));


//Update document
// user.update({
//     username :"user10",
//     password:"user10pass"
// }, {
//     where: {
//         id:5
//     }
// }).then(row => console.log(row));


//Search a row in database
//tim kien 1 phan tu trong database
//Neu trong findOne k co tham so nao, thi no se tra ra ban gi dau tien
// user.findOne({raw: true})
// .then(u => console.log(u));

//Dua ra tat ca cac ban fhi
// user.findAll({raw :true})
// .then(u => console.log(u));
// user.findAll({
//     where:{
//         id:4
//     }
// },{raw: true})
// .then(u => console.log(u));


//Tim kiem dua vao Id
user.findByPk(5, {raw:true})
.then(u => console.log(u));
