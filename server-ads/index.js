const express  = require('express');
const app = express();
app.use(express.static('./public'));
app.use(express.static('./views'));
app.set('view engine', 'ejs');
app.set('views','./views');

const port = process.env.PORT || 3000;
const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(port,function(){
    console.log('App listening on port: ' + port);
});


class Ads{
    constructor(image, link){
        this.image = image;
        this.link = link;
    }
}

let arrayAds = [
    new Ads('kteam.png','https://www.howkteam.vn'),
    new Ads('udemy.png','https://www.udemy.com'),
    new Ads('khoapham.png','https://khoapham.vn'),
    new Ads('freeCodeCamp.png','https://www.freecodecamp.org')

]

//Connection io
io.on('connection', function(socket){
    console.log('Someone just has been connected with id: ' + socket.id);

    //alert if socket client disconnected
    socket.on('diconnect', function(){
        console.log(socket.id + 'has been diconnected');
    })

    socket.on('admin-send-ads', function(data){
        let li = searchLink(data.image);
        if(!isNullOrEmpty(li)){
            io.sockets.emit('server-send-ads',{image : data.image, link: li});
            // console.log(data);
        }
    })

})

//Page admin
app.get('/admin',function(req,res){
    res.render('admin', {arrayAd : arrayAds});
});

app.get('/web', function(req,res){
    res.render('web');
})



//utilties
function searchLink(img){
    let result = '';
    arrayAds.forEach(function(ad){
        if(ad.image == img){
            result = ad.link;
            return result;
        }
    })
    return result;
}

function isNullOrEmpty(input){
    if(typeof input === 'undefined' || input== null) return true;
    return input.replace(/\s/g,'').lenght <1;
}