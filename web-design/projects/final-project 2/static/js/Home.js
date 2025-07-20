function createHeroDiv(){
    const topDiv = document.createElement("section")
    topDiv.classList.add("style", "hero")
    
    const texts = [
        "THE ONE PLACE YOU CAN GET EVERYTHING",
        "- WEB DESIGN TEST CASE -"
    ]
    texts.forEach(text => {
        const p = document.createElement('p')
        p.textContent = text
        topDiv.appendChild(p)
    });

    return topDiv
}
    
function createTopicsDiv(){
    const botDiv = document.createElement("section")  
    botDiv.classList.add('topics')  
    fetch('get/topics')
        .then(response => response.json())
        .then(data => {
            Object.keys(data.topics).forEach(topic => {
    
                const address = document.createElement('a')
                address.classList.add("style")
                address.href = `/shop/${topic}`
                
                const addressText = document.createElement('p')
                addressText.textContent = topic
                address.appendChild(addressText)

                const backgroundImage = document.createElement('img')
                backgroundImage.classList.add('a-img')
                backgroundImage.src = `static/img/${topic}.jpg`
                address.appendChild(backgroundImage)
    
                botDiv.appendChild(address)
            })
        })
    return botDiv
}

function fillHomePage(){
    const body = document.getElementById('body')

    body.appendChild(createHeroDiv())
    body.appendChild(createTopicsDiv())
}    

fillHomePage()
