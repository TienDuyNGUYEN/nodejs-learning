let add = (a,b) =>{
    return new Promise((resole, reject) =>{
        setTimeout(() =>{
            if(typeof a != 'number' || typeof b != 'number'){
                return reject (new Error ('Tham so phai la kieu number'));
            }
            resole(a +b);
        },2000)
    })
}

let multiply = (a,b) =>{
    return new Promise((resole, reject) =>{
        setTimeout(() =>{
            if(typeof a != 'number' || typeof b != 'number'){
                return reject (new Error ('Tham so phai la kieu number'));
            }
            resole(a*b);
        },2000)
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
        },2000)
    })
}

// add('4',4)
// .then(res =>add(res,5), err => console.log(err + ''))
// .then(res => console.log(res), err => console.log(err + ''))
//Tuy nhien neu viet nhu tren, thi cau lenh cua function se khong dung lai khi gap loi
//Vi vay ta can them .catch()

// add('4',4)
// .then(res =>add(res,5))
// .then(res => console.log(res))
// .catch(err => console.log('Error: '+ err))


let tinhDienTichHinhThang = (a,b,h) =>{
    return add(a,b)
    .then(res => multiply(res, h))
    .then(res => divide(res,2))
}

tinhDienTichHinhThang(5,52,32)
.then(s => console.log(s))
.catch(err => console.log('Error: '+ err));