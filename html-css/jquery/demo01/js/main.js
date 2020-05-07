

//**************Document loaded*****************//

// $(document).ready(function(){
//     console.log('Hi from Jquery')
// });
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('Hi from DOM LOADED')
})


//**************Click function*****************//

// $(document).ready(function () {
//     $('body').click(function (event) {
//         $('h1').animate({
//             marginLeft: 500,
//             opacity: 0
//         },
//             500,
//             function () {
//                 // Animation complete.
//             }
//         )
//     })

// })

document.addEventListener('DOMContentLoaded', (event) =>{
    document.querySelector('body').addEventListener('click',(event) =>{
        move(document.querySelector('h1'))
    })
})
function move(elem) {
    var left = 0
    function frame() {
        left = 500;  // update parameters
        elem.style.left = left + 'px' // show frame
        if (left == 100)  // check finish condition
            clearInterval(id)
    }
    var id = setInterval(frame, 10) // draw every 10ms
}

