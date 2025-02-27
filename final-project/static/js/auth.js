function createAuthor() {
    const authorDiv = document.createElement("section")
    authorDiv.classList.add("style")
    authorDiv.id = "form-article"

    const welcomeText = document.createElement("h1")
    welcomeText.textContent = "Welcome!"

    const instructionText = document.createElement('p')
    instructionText.textContent = "Please log in to continue."

    instructionText.id = "form-header"

    const formDiv = document.createElement("form")
    formDiv.id = "login-form"

    const userNameLabel = document.createElement("label")
    userNameLabel.htmlFor = 'username'
    userNameLabel.textContent = "Enter your username:"

    const userNameInput = document.createElement("input")
    userNameInput.classList.add('style', 'input')
    userNameInput.type = "text"
    userNameInput.name = "username"
    userNameInput.required = true

    const passWordLabel = document.createElement("label")
    passWordLabel.htmlFor = 'password'
    passWordLabel.textContent = "Enter your password:"

    const passWordInput = document.createElement("input")
    passWordInput.classList.add('style', 'input')
    passWordInput.type = "text"
    passWordInput.name = "password"
    passWordInput.required = true

    const actionDiv = document.createElement("div")

    actionDiv.innerHTML = `
    <button class="style btn" onclick="checkLog('login', event)">Log In</button>
    <button class="style btn" onclick="checkLog('register', event)">Register</button>
    `
    formDiv.appendChild(userNameLabel)
    formDiv.appendChild(userNameInput)
    formDiv.appendChild(passWordLabel)
    formDiv.appendChild(passWordInput)
    formDiv.appendChild(actionDiv)

    authorDiv.appendChild(welcomeText)
    authorDiv.appendChild(instructionText)
    authorDiv.appendChild(formDiv)

    document.querySelector('.body').appendChild(authorDiv)

}

function checkLog(status, event){
    
    event.preventDefault()
    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;
    if (username && password) {
        const data = { username, password };
        fetch(`auth/${status}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            const backDiv = document.getElementById('form-article')

            const statusText = document.createElement('p')
            const actionBtn = document.createElement('a')
            actionBtn.classList.add('style', 'btn')
            actionBtn.textContent = 'Proceed'
            actionBtn.href = '/home'


            if (data.success) {
                statusText.textContent = data.message;
                actionBtn.disabled = false
            } else {
                statusText.textContent = data.message;
                actionBtn.disabled = true
            }
            backDiv.appendChild(statusText)
            backDiv.appendChild(actionBtn)
    
        })
    } else {
        alert('Please fill in both fields.');
    }
}












createAuthor()