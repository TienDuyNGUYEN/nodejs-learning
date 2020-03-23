
let square = (a,b,h) => (a+b)*h/2;

console.log('Dien tich', + square(2,3,2));

// let add = (a,b,callback) =>{
//     setTimeout(() => {
//         let err, result;
//         if(typeof a != 'number' || typeof b!= 'number'){
//             err = 'Tham so phai co kieu number';
//             return callback(err, result);
//         }
//         result = a+b;
//         callback(err, result);
//     }, 1000)
// }
// //Nguoi viet ra callback function se quyet dinh trong callback co bao nhieu tham so
// //Tu do khi su dung callback nay phai dam bao so tham so dua vao
// //Tham so dau tien luon la err


// add(4,5, (err, result)=>{
//     if(err) return console.log('Error: ' +err);
//     console.log('Ket qua ' + result);
// })

//viet thu gon lai

let add = (a,b,callback) =>{
    setTimeout(() => {
        let err, result;
        if(typeof a != 'number' || typeof b!= 'number'){
            return callback(new Error('Tham so phai co kieu number'));
        }
        callback(undefined, a+b);
    }, 1000)
}


add(4,5, (err, result)=>{
    if(err) return console.log('Error: ' +err);
    console.log('Ket qua ' + result);
})