
//Phone to server
const socket = io('http://localhost:3000/');


socket.on('Server-send-color', function (data) {
    document.body.style.backgroundColor = data;
});

socket.on('server-send-register-failed', function () {
    alert('Error: Something went wrong. User empty or existed!')
});
socket.on('server-send-register-succes', function (data) {
    let loginForm = document.getElementById('loginForm');
    let chatForm = document.getElementById('chatForm');
    let currentUser = document.getElementById('currentUser');
    currentUser.innerHTML = data;
    loginForm.style.display = 'none';
    chatForm.style.display = 'block';

});
socket.on('server-send-userList', function (data) {
    document.querySelector('#boxContent').innerHTML = '';
    data.forEach(function (i) {
        let div = document.createElement('div');
        div.setAttribute('class', 'user');
        div.innerHTML = i;
        document.querySelector('#boxContent').appendChild(div)
    });
});

socket.on('server-send-logout', function (data) {
    document.querySelector('#boxContent').innerHTML = '';
    data.forEach(function (i) {
        let div = document.createElement('div');
        div.setAttribute('class', 'user');
        div.innerHTML = i;
        document.querySelector('#boxContent').appendChild(div)
    });
});

socket.on('server-send-message', function (data) {
    let div = document.createElement('div');
    div.setAttribute('class', 'ms');
    div.innerHTML = data.user + ': ' + data.msg;
    document.getElementById('listMessages').appendChild(div);

});
socket.on('server-is-typing', function () {
    let div = document.createElement('div');
    div.setAttribute('class', 'notify');
    div.innerHTML = "<img src = 'tenor.gif' width='25px'></img>Someone is typing";
    document.getElementById('notification').appendChild(div);

});
socket.on('server-stop-typing', function () {
    document.getElementById('notification').innerHTML = '';

});
window.addEventListener("DOMContentLoaded", (event) => {
    let loginForm = document.getElementById('loginForm');
    let chatForm = document.getElementById('chatForm');
    // Show form
    loginForm.style.display = '' | 'inline' | 'inline-block' | 'inline-table' | 'block';
    chatForm.style.display = 'none';

    //socket.io
    let txtUsername = document.getElementById('txtUsername');
    document.getElementById('btnRegister').addEventListener('click', function () {
        socket.emit('client-send-username', txtUsername.value);
    })
    document.getElementById('btnLogout').addEventListener('click', function () {
        socket.emit('client-send-logout');
        let loginForm = document.getElementById('loginForm');
        let chatForm = document.getElementById('chatForm');
        chatForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    document.getElementById('btnSendMessage').addEventListener('click', function () {

        let txtMessage = document.getElementById('textMessage').value;
        if (!isNullOrWhitespace(txtMessage)) {
            socket.emit('client-send-message', txtMessage);
            document.getElementById('textMessage').innerHTML = '';
        }
    });
    document.getElementById('textMessage').addEventListener('focusin', function () {
        socket.emit('client-is-typing');
    });
    document.getElementById('textMessage').addEventListener('focusout', function () {
        socket.emit('client-stop-typing');
    });

});

//Check if string is null or whitespace like in C#
function isNullOrWhitespace(input) {
    if (typeof input === 'undefined' || input == null) return true;
    return input.replace(/\s/g, '').length < 1;
}