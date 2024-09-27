function toggleForm(form) {
    const signInBtn = document.getElementById('signin-btn')
    const signUpBtn = document.getElementById('signup-btn')
    const title = document.getElementById('login-title')
    const actionButton = document.getElementById('action-btn')
    if (form == 'signIn'){
        if (!signUpBtn.classList.contains('buttonclick')){
            // this section is for that when the OTHER BUTTON is NOT selected
            // aka the div is NOT visibile, it would toggle it to view it.
            // if its ALREADY out, dont toggle it to go back to hidden again
            document.getElementById('log-div').classList.toggle('visible')
            document.getElementById('auth-container').classList.toggle('addgap')
        }
        signUpBtn.classList.remove('buttonclick')
        signInBtn.classList.add('buttonclick')
        title.textContent = 'Happy to have you back!'
        actionButton.textContent = 'Sign In'
        actionButton.onclick = signIn

    } else if (form == 'signUp'){
        if (!signInBtn.classList.contains('buttonclick')){
            document.getElementById('log-div').classList.toggle('visible')
            document.getElementById('auth-container').classList.toggle('addgap')
        }
        signUpBtn.classList.add('buttonclick')
        signInBtn.classList.remove('buttonclick')
        title.textContent = 'Welcome to the Shop!'
        actionButton.textContent = 'Sign Up'
        actionButton.onclick = signUp
    }
}

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

const users = JSON.parse(localStorage.getItem('users')) || admins



function signIn() {
    const userId = document.getElementById('username').value
    const userPass = document.getElementById('password').value
    if (userId == '' || userPass == ''){
        return 
    }
    if (userId in users && users[userId].passWord == userPass) {
        users[userId].isLogged = true
        if (users[userId].isAdmin == true){
            alert(`hey ${userId}, welcome to the site, Admin!`)
        } else {
            alert(`hey ${userId}, welcome to the site, User!`)
        }
    } else {
        alert('Incorrect user/pass, try again!')
        userId.value = ''
        userPass.value = ''
    }
}

function signUp() {
    const userId = document.getElementById('username').value
    const userPass = document.getElementById('password').value

    if (userId === '' || userPass === '') return
    
    if (userId in users) {
        alert(`Name's already taken! Try again`)
        userId.value = ''
        userPass.value = ''
    } else {
        users[userId] = {
            'userName': userId,
            'passWord': userPass,
            'isAdmin': false,
            'isLogged':true
        }
        alert(`Welcome to the site! ${userId}!`);
    }
}
