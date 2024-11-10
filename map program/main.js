const resultP = document.getElementById('result')

const usersMap = new Map([
    ['ryan', ['ryan@gmail', '123']],
    ['fatemeh', ['fatemeh@gmail', '456']],
    ['shayan', ['shayan@gmail', '789']],
    ['nona', ['nona@gmail', '101']],
    ['ailin', ['ailin@gmail', '202']],
])

function handleAuth(){

    const userId = document.getElementById('username').value
    const userEmail = document.getElementById('username').value
    const userPass = document.getElementById('password').value
    const userPassConfirm = document.getElementById('password-repeat').value
    
    if (userPass !== userPassConfirm){
        resultP.textContent = 'passwords dont match'
    } else {

        if (usersMap.has(userId) && usersMap.has(userEmail)){
            resultP.textContent = 'username or email already exists'
        } else {
            resultP.textContent = 'sign up successful!'
            usersMap.set(userId, [userEmail, userPass])
        }
    }
}