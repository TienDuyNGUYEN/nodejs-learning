window.addEventListener('DOMContentLoaded', (event)=>{
    let aPwd = document.getElementById('showHidePwd');
    aPwd.addEventListener('click', (event)=>{
        event.preventDefault(); //Huy bo event, neu no co the huy ma khong dung su lan trong cua event toi phan khac
        let ps = document.getElementById('inputPwd');
        let i  = document.getElementById('eyeIcon');
        if(ps.type === "password"){
            ps.type = "text";
            i.setAttribute('class', 'fa fa-eye')
        } else{
            ps.type ="password";
            i.setAttribute('class', 'fa fa-eye-slash')
        }
    });
});