function createAuthFormDiv(){
    const formDiv = document.createElement("form")
    formDiv.classList.add('style')

    const welcomeText = document.createElement("h1")
    welcomeText.textContent = "Welcome!"
    
    const instructionText = document.createElement('p')
    instructionText.textContent = "Please log in to continue."
    

    const userNameLabel = document.createElement("label");
    userNameLabel.textContent = "Enter your username:";
    
    const userNameInput = document.createElement("input");
    userNameInput.classList.add("style", "input");
    userNameInput.type = "text";
    userNameInput.name = "username";
    userNameInput.id = "username";
    
    const passWordLabel = document.createElement("label")
    passWordLabel.textContent = "Enter your password:"

    const passWordInput = document.createElement("input")
    passWordInput.classList.add('style', 'input')
    passWordInput.type = "text"
    passWordInput.name = "password"


    const actionDiv = document.createElement("div")
    actionDiv.id = 'action-div'

    actionDiv.innerHTML = `
    <button class="style btn" onclick="checkLog('login', event)">Log In</button>
    <button class="style btn" onclick="checkLog('register', event)">Register</button>
    `

    formDiv.appendChild(welcomeText)
    formDiv.appendChild(instructionText)
    formDiv.appendChild(userNameLabel)
    formDiv.appendChild(userNameInput)
    formDiv.appendChild(passWordLabel)
    formDiv.appendChild(passWordInput)
    formDiv.appendChild(actionDiv)
    return formDiv
}

function fillAuthPage(){
    document.getElementById('body').appendChild(createAuthFormDiv())
}

function checkLog(status, event){
    event.preventDefault()
    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;
    if (username && password) {
        const data = { username, password };
        fetch(`authorization/${status}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            
            const resultDiv = document.createElement('div')
            const statusText = document.createElement('p')
            const actionBtn = document.createElement('a')
            actionBtn.classList.add('style', 'btn')
            actionBtn.href = '/'
            document.getElementById('action-div').style.display = 'none'
            if (data.success) {
                statusText.textContent = data.message;
                actionBtn.textContent = 'Proceed'
            } else {
                statusText.textContent = data.message;
                actionBtn.textContent = 'Retry'
            }
            resultDiv.appendChild(statusText)
            resultDiv.appendChild(actionBtn)
            document.querySelector('form').appendChild(resultDiv)
        })
    }
}

fillAuthPage()