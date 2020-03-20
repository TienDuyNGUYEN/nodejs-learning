//Module nay co nhiem vu kich hoat va xu ly su kien

function Emitter(){
    this.events ={}; //Tao mot event rong
};

//Lang nghe su kien
Emitter.prototype.on = function(type, listener){
    this.events[type]  = this.events[type] || [];//Bo sung va event khai vao ben tren mot ham listerner
    this.events[type].push(listener);
}

//Pha ra su kien
Emitter.prototype.emit = function(type){
    //Kiem tra neu co su kien type trong Emitter khong
    if(this.events[type]){
        //Neu sukien type ton tai thi ta se tien hanh phat ra su kien listener
        //Duyet ca phan tu strong mang event type va goi ra su kien listener cho moi cai
        this.events[type].forEach(function(listener){
            //Kich hoat su kien bang cach goi lai ham listener
            listener();
        });
    }
};


module.exports = Emitter;
