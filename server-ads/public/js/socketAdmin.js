'use strict';
const socket = io('http://localhost:3000/');


window.addEventListener('DOMContentLoaded',(event) =>{
    let option = document.getElementById('listAds');
    option.addEventListener('change',function(){
        let selectedImg = option[option.selectedIndex].value;
        document.getElementById('imgAd').setAttribute('src','ads/'+selectedImg );
    });

    let btnSend = document.getElementById('btnSendAds');
    btnSend.addEventListener('click', function(){
        let selectedId = document.getElementById('listAds');
        let selImg = selectedId[selectedId.selectedIndex].value;
        socket.emit('admin-send-ads', {image : selImg});
    })
})