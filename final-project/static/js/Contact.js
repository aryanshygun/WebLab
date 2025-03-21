function createLeftDiv(){
    const leftSection = document.createElement("section")
    leftSection.classList.add("style", "left")
    
    const leftSectionTexts = [
        ["- PHONE -", "+1 (123) 456-7890"],
        ["- EMAIL -", "info@example.com"],
        ["- ADDRESS -", "1234 Elm Street, Suite 567, Your City, Your Country"],
        ["- BUSINESS HOURS -", "Monday - Friday, 9:00 AM - 5:00 PM"]
    ]
    
    leftSectionTexts.forEach(text => {
        const h1 = document.createElement("h2")
        h1.textContent = text[0]
        const p = document.createElement("p")
        p.textContent = text[1]
        leftSection.appendChild(h1)
        leftSection.appendChild(p)
    })
    return leftSection
}

function createRightDiv(){
    const rightSection = document.createElement("section")
    rightSection.classList.add("right")
    
    const rightSectionTopDiv = document.createElement("div")
    rightSectionTopDiv.classList.add("style")
    
    const h1 = document.createElement("h2")
    h1.textContent = "CONTACT US"        
    
    const p = document.createElement("p")
    p.textContent = "- 24/7 SUPPORT ALL DAY EVERYDAY -"
    rightSectionTopDiv.appendChild(h1)
    rightSectionTopDiv.appendChild(p)

    
    const rightSectionBotDiv = document.createElement("form")
    rightSectionBotDiv.classList.add("style")
    const formFields = [
        ["Full Name:", "text", "name"],
        ["Email:", "text", "email"],
        ["Subject:", "text", "subject"],
        ["Message:", "textarea", "message"]
    ]
    formFields.forEach(([labelText, type, id]) => {
        const rowDiv = document.createElement('div')
        rowDiv.classList.add('form-row-div')
    
        const label = document.createElement("label")
        label.setAttribute("for", id)
        label.textContent = labelText
        
        let input
        if (type === "textarea") {
            input = document.createElement("textarea")
            input.rows = 2
        } else {
            input = document.createElement("input")
            input.type = type
        }
    
        input.classList.add("style", "input")
        input.name = id
        input.id = id
    
        rowDiv.appendChild(label)
        rowDiv.appendChild(input)
        rightSectionBotDiv.appendChild(rowDiv)
    })
    
    const submitDiv = document.createElement("div")
    submitDiv.classList.add('submit-btn-div')
    submitDiv.style.flexDirection = 'row !important'
    submitDiv.style.height = '43px'
    submitDiv.innerHTML = `
    <p id="resultText" style="display:none;"></p>
    <button class="style btn" onclick="submitOpinion(event)" >Submit</button>
    `
    rightSectionBotDiv.appendChild(submitDiv)


    rightSection.appendChild(rightSectionTopDiv)
    rightSection.appendChild(rightSectionBotDiv)

    return rightSection
}

function fillContactPage(){
    const mainBody = document.getElementById('body')
    mainBody.appendChild(createLeftDiv())
    mainBody.appendChild(createRightDiv())
}

function submitOpinion(event) {
    if (event) event.preventDefault()

    const name = document.querySelector('input[name="name"]').value
    const subject = document.querySelector('input[name="subject"]').value
    const email = document.querySelector('input[name="email"]').value
    const message = document.querySelector('textarea[name="message"]').value
    const dataTime = new Date().toLocaleString()

    if (name && subject && email && message) {
        fetch(`/contact/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, subject, message, datatime: dataTime }),
        })
        .then(response => response.json())
        .then(data => {
            const resultText = document.getElementById('resultText')
            resultText.style.display = 'block'
            resultText.textContent = data.message
        })
    }
}


fillContactPage()