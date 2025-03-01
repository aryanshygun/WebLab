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

const cards = [
    ['Mathematics', 'mathematics', '/mathematics'],
    ['Languages', 'languages', '/languages'],
    ['Programming', 'programming', '/programming'],
]

cards.forEach(card => {
    const address = document.createElement('a')
    address.classList.add("style")
    address.href = card[2]
    address.id = card[1]
    address.textContent = card[0]
    botDiv.appendChild(address)
});

document.getElementById('body').appendChild(topDiv)
document.getElementById('body').appendChild(botDiv)
