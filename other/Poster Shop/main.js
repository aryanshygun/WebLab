const admins = {
    "ryan": {
        "userName": "Ryan",
        "passWord": "111",
        "isAdmin": true,
    },
    "nona": {
        "userName": "Nona",
        "passWord": "222",
        "isAdmin": false,
    }
}
const users = JSON.parse(localStorage.getItem('users')) || admins


$(document).ready(function() {
    // $('.container').hover(
    //     function() {
    //         $(this).addClass('div-hovered')
    //     },
    //     function() {
    //         $(this).removeClass('div-hovered')
    //     }
    // )
    $('article').hover(
        function() {
            $(this).addClass('div-hovered')
        },
        function() {
            $(this).removeClass('div-hovered')
        }
    )

    $('button').hover(
        function(){
            $(this).addClass('btn-hovered')
        },
        function(){
            $(this).removeClass('btn-hovered')
        }
    )
})

const authDiv = document.getElementById('auther-div')
const loggDiv = document.getElementById('login-div')
const moveDiv = document.getElementById('move-div')
const logoName = document.getElementById('logo-id')
function showLogger(){

    event.target.classList.toggle('btn-clicked')
    authDiv.classList.toggle('add-gap')
    loggDiv.classList.toggle('show-login-div')
    logoName.classList.toggle('scale-up')
    setTimeout(() => {
        loggDiv.classList.toggle('overflow-visible')
    }, 200)
}

function handleAuth(action){
    event.target.classList.toggle('btn-clicked')
    loggDiv.classList.add('add-gap')
    moveDiv.classList.add('show-move-div')

    const userId = document.getElementById('username').value
    const userPass = document.getElementById('password').value
    const greetText = document.getElementById('greet-text')
    const greetBtn = document.getElementById('greet-btn')

    // if (userId === '' || userPass === '') {
    //     greetText.textContent = `Please feel the details!`
    // }

    // } else {
    // }
    
    // authDiv.style.height = '80%'
    if (action === 'sign-in') {
        if (userId === '' || userPass === '') {
            greetText.textContent = `Please feel the details!`
        } else if (userId in users && userPass === users[userId].passWord) {
            if (users[userId].isAdmin === true){
                greetText.textContent = `Hi there Admin ${users[userId].userName}!`
                greetBtn.onclick = function() {
                    showPage('admin')
                }
                greetBtn.disabled = false
            } else {
                greetText.textContent = `Hi there User ${users[userId].userName}!`
                greetBtn.onclick = function () {
                    showPage('user')
                }
                greetBtn.disabled = false
            }
        } else {
            greetText.textContent = 'Incorrect user/pass, try again!'
            greetBtn.disabled = true

        }
    } else if (action === 'sign-up') {
        if (userId in users) {
            greetText.textContent = "Name's already taken! Try again"
            greetBtn.disabled = true
            
        } else {
            users[userId] = {
                'userName': userId,
                'passWord': userPass,
                'isAdmin': false
            }
            localStorage.setItem('users', JSON.stringify(users));
            greetText.textContent = `Welcome abroad User ${users[userId].userName}!`
            greetBtn.onclick = function () {
                showPage('user')
            }
            greetBtn.disabled = false
        }
    }
}
