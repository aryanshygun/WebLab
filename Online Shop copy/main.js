const loggDiv = document.getElementById('logger-div')
const moveDiv = document.getElementById('move-div')
const authDiv = document.getElementById('auth-div')

function showLogger(){
    if (moveDiv.classList.contains('show')){
        moveDiv.classList.remove('show')
    }
    const btn = event.target
    btn.classList.toggle('click')
    loggDiv.classList.toggle('show') 
    authDiv.classList.toggle('gap')
}

const userId = document.getElementById('username').value
const userPass = document.getElementById('password').value

const greetText = document.getElementById('greet-text')
const greetBtn = document.getElementById('greet-btn')

function handleAuth(action) {
    const userId = document.getElementById('username').value
    const userPass = document.getElementById('password').value
    const greetBtn = document.getElementById('greet-btn')
    const moveDiv = document.getElementById('move-div')
    const greetText = document.getElementById('greet-text')
    const greetState = document.getElementById('greet-state')

    if (userId === '' || userPass === '') return

    if (!moveDiv.classList.contains('show')) {
        moveDiv.classList.toggle('show')
    }

    function setGreet(x, y){
        function openPage(page) {
            window.location.href = page;
        }        

        if (x =='success'){
            greetBtn.disabled = false
            greetText.textContent = `Hi there! Welcome abroad, ${userId}!`
            if (y == true){
                greetState.textContent = 'State: Admin'
                greetBtn.onclick = function() { openPage('adminView.html') }
            } else {
                greetState.textContent = 'State: User'
                greetBtn.onclick = function() { openPage('userView.html') }

            }
        } else {
            greetBtn.disabled = true
            greetState.textContent = `State: Unknown`
            if (x == 'incorrect'){
                greetText.textContent = 'Incorrect user/pass, try again!'
            } else if (x == 'taken'){
                greetText.textContent = "Name's already taken! Try again"
            }
        }
    }

    if (action === 'sign-in') {
        if (userId in users && users[userId].passWord === userPass) {
            users[userId].isLogged = true
            greetBtn.disabled = false
            setGreet('success', users[userId].isAdmin)
        } else {
            setGreet('incorrect', users[userId].isAdmin)
        }
    } else if (action === 'sign-up') {
        if (userId in users) {
            setGreet('taken', users[userId].isAdmin)
        } else {
            users[userId] = {
                'userName': userId,
                'passWord': userPass,
                'isAdmin': false,
                'isLogged': true
            }
            localStorage.setItem('users', JSON.stringify(users));
            setGreet('success', users[userId].isAdmin)
        }
    }
}

// this is the base admins that are pre-added. they have a different front page
// from normal users. they can see the lists of all users and can add products
// feel free to change ur passkey lol
const admins = {
    "ryan": {
        "userName": "ryan",
        "passWord": "123",
        "isAdmin": true,
        "isLogged": false
    },
    "nona": {
        "userName": "charlie",
        "passWord": "456",
        "isAdmin": true,
        "isLogged": false
    }
}
// here it works with local storage of your own web browser so i wont be able to see
// your added users. havent learnt how to properly export to json file so this is the
// best we can do
const users = JSON.parse(localStorage.getItem('users')) || admins