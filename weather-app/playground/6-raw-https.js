const https = require('https');

const url = 'https://api.darksky.net/forecast/007d3c82c58fc972f142c6006e77055b/40,-75';
const request = https.request(url, (response) => {
    let data = '';
    response.on('data', (chunk) => {
        data = data + chunk.toString();
    })

    response.on('end', () => {
        const body = JSON.parse(data);
        console.log(body);
    })
})

request.on('error',(error)=>{
console.log('An error', error);
});
request.end();