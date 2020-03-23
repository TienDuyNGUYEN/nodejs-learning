// async function add(){
//     console.log('Xin chao');
// }
// let add = async() =>{
//     console.log('Xin chao');
// }

// add();

//Tu khoa await + promise
//No cho promise tra ve ket qua
//Tu khoa await luon luon phai de trong async function

let addPr = (a,b) =>{
    return new Promise((resole, reject) =>{
        setTimeout(() =>{
            if(typeof a != 'number' || typeof b != 'number'){
                return reject (new Error ('Tham so phai la kieu number'));
            }
            resole(a +b);
        },2000)
    })
}

let add = async() =>{
    let res = await addPr(4,5); //Cho cho den khi chay ket qua cua promise
    console.log(res);
}

add();