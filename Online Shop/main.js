// this essentially selects what we see in the log div
// also selects which function is called when clicking line 36 action button
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


// checks if userid and userpass is correct then says proper regards and logs the user
// as logged in
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
// checks if username isnt taken and also logs the user as logged in
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
