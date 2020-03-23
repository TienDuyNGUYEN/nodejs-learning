
let square = (a,b,h) => (a+b)*h/2;

console.log('Dien tich', + square(2,3,2));

let add = (a,b,callback) =>{
    setTimeout(() => {
        let err, result;
        if(typeof a != 'number' || typeof b!= 'number'){
            return callback(new Error('Tham so phai co kieu number'));
        }
        callback(undefined, a+b);
    }, 1000)
}
let multiply = (a,b,callback) =>{
    setTimeout(() => {
        let err, result;
        if(typeof a != 'number' || typeof b!= 'number'){
            return callback(new Error('Tham so phai co kieu number'));
        }
        callback(undefined, a+b);
    }, 1000)
}
let divide = (a,b,callback) =>{
    setTimeout(() => {
        let err, result;
        if(typeof a != 'number' || typeof b!= 'number'){
            return callback(new Error('Tham so phai co kieu number'));
        }
        if(b == 0) return callback(new Error('Chia cho 0'));
        callback(undefined, a/b);
    }, 1000)
}


let tinhDienTichHinhThang = (a,b,h, callback) =>{
    add(a,b,(err,result) =>{
        if(err) return callback(err);
        multiply(result, h,(err,result) =>{
            if(err) return callback(err);
            divide(result, 2, (err,square)=>{
                if(err) return callback(err);
                callback(undefined,square);
            })
        })
    })
}

tinhDienTichHinhThang(2,3,2, (err, result) =>{
    if(err) return console.log(err.toString());
    console.log('Dien tich hinh thang: ' + result);
})