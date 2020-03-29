
//Phone to server
const socket = io('http://localhost:3000/');

socket.on('server-send-rooms', function(data){
    let roomList = document.querySelector('#roomList');
    roomList.innerHTML='';
    data.map(function(r){
        let h5 = document.createElement('h5');
        h5.setAttribute('class','room');
        h5.innerHTML = r;
        roomList.appendChild(h5);
    })
});
socket.on('server-chat-in-room', function(data){
    console.log(data);
    let textMessage = document.querySelector('#listMessages');
    let div = document.createElement('div');
    div.setAttribute('class', 'msg');
    div.innerHTML = data;
    textMessage.appendChild(div);
});

window.addEventListener("DOMContentLoaded", (event) => {
    let btnCreateRoom = document.getElementById('btnCreateRoom');
    btnCreateRoom.addEventListener('click', function(){
        let txtRoom = document.getElementById('txtRoom');
        if(!isNullOrWhitespace(txtRoom.value)){
            socket.emit('client-create-room', txtRoom.value);
        }
    })

    let btnSendMessage = document.getElementById('btnSendMessage');
    btnSendMessage.addEventListener('click', function(){
        let txtMessage = document.getElementById('textMessage');
        if(!isNullOrWhitespace(txtMessage.value)){
            socket.emit('client-send-message', txtMessage.value);
        }
    })
    
});

//Check if string is null or whitespace like in C#
function isNullOrWhitespace(input) {
    if (typeof input === 'undefined' || input == null) return true;
    return input.replace(/\s/g, '').length < 1;
}