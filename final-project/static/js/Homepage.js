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

const botDiv = document.createElement("section")
const jsonTopicsPath = 'static/json/topics.json'

fetch(jsonTopicsPath)
    .then(response => response.json())
    .then(topics => {
        Object.keys(topics).forEach(topic => {

            const address = document.createElement('a')
            address.classList.add("style")
            address.href = `/courses/${topic}`
            address.id = `${topic.toLowerCase()}`
            address.textContent = topic
            
            const backgroundImage = document.createElement('img')
            backgroundImage.classList.add('a-img')
            backgroundImage.src = `static/img/${topic}.jpg`
            address.appendChild(backgroundImage)

            botDiv.appendChild(address)
        })
    
        document.getElementById('body').appendChild(topDiv)
        document.getElementById('body').appendChild(botDiv)
    })