const Emitter = require('./emitter');
const emitter  = new Emitter(); //Khai bao 1 su kien moi

emitter.on('bad',function(){
    console.log('Mot mon nao do bi diem kem!');
});

emitter.on('bad', function(){
    console.log('Da co diem kem, can thong bao toi phu huynh');
})

//Khai bao mot bang diem
const scores = [10, 4];

scores.forEach(s => {
    if(s<5){
        console.log('Diem thap qua');
        emitter.emit('bad');
    }
})