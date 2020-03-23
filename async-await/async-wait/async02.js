let add = (a,b) =>{
    return new Promise((resole, reject) =>{
        setTimeout(() =>{
            if(typeof a != 'number' || typeof b != 'number'){
                return reject (new Error ('Tham so phai la kieu number'));
            }
            resole(a +b);
        },100)
    })
}

let multiply = (a,b) =>{
    return new Promise((resole, reject) =>{
        setTimeout(() =>{
            if(typeof a != 'number' || typeof b != 'number'){
                return reject (new Error ('Tham so phai la kieu number'));
            }
            resole(a*b);
        },1000)
    })
}
let divide = (a,b) =>{
    return new Promise((resole, reject) =>{
        setTimeout(() =>{
            if(typeof a != 'number' || typeof b != 'number'){
                return reject (new Error ('Tham so phai la kieu number'));
            }
            if(b === 0) return reject(new Error ('Loi chi cho O'));
            resole(a/b);
        },1000)
    })
}

let tinhDienTichHinhThang = async (a,b,h, callback) =>{
    try{
        let ab = await add(a,b);
    let abh = await multiply(ab,h);
    let square = await divide(abh,2);
    callback(undefined,square);
    }catch (err){
        callback(err);
    }
    
}

tinhDienTichHinhThang('4',5,6, (err, result) =>{
    if(err) return console.log(err.toString());
    console.log(result);
});