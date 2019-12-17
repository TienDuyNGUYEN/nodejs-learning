setTimeout(()=>{
    console.log('Two secons are up.')
}, 2000);

const geocode = (address, callback)=>{
    setTimeout(()=>{
        data = {
            latidute:0,
            longitude:0
        }
    },2000);
    return data;
   
}

const countCandy =((name, callback) =>{
    console.log('Name: ',name);
    const a = b = 5;
    return callback(a+b)
})
countCandy('Duy', (sum) =>{
    console.log(`has ${sum} candies`)
})