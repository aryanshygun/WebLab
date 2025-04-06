function createAuthFormDiv(){
    const formDiv = document.createElement("form")
    formDiv.classList.add('style')
    formDiv.id = 'auth-form'

    const welcomeText = document.createElement("h1")
    welcomeText.textContent = "WELCOME TO LEARNIT"
    
    const instructionText = document.createElement('p')
    instructionText.textContent = "- PLEASE LOGIN TO CONTINUE -"
    

    const userNameLabel = document.createElement("label");
    userNameLabel.textContent = "- USERNAME -";
    
    const userNameInput = document.createElement("input");
    userNameInput.classList.add("style", "input");
    userNameInput.type = "text";
    userNameInput.name = "username";
    userNameInput.id = "username";
    
    const passWordLabel = document.createElement("label")
    passWordLabel.textContent = "- PASSWORD -"

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
            document.getElementById('action-div').innerHTML = `
            <p id="statusText">${data.message}</p>
            <a class="style btn" href="/">${data.action}</a>
            `
        })
    }
}

fillAuthPage()