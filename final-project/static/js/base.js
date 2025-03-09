const headerDiv = document.querySelector('header')
headerDiv.classList.add('style')

const logo = document.createElement('img')
logo.src = "/static/img/logo.png"

const navBar = document.createElement('div')
navBar.classList.add('nav-bar')
const pages = [
    ["Home", "/"],
    ["Courses", "/courses/all"],
    ["Opinions", "/opinions"],
    ["About Us", "/about"],
    ["Contact", "/contact"],
]
pages.forEach(page => {
    const link = document.createElement("a")
    link.classList.add("style", "btn")
    link.textContent = page[0]
    link.href = page[1]
    navBar.appendChild(link)
})

const logOutBtn = document.createElement('a')
logOutBtn.classList.add('style', 'alt', 'btn', 'order')
logOutBtn.textContent = 'Profile'
logOutBtn.href = "/profile"

headerDiv.appendChild(logo)
headerDiv.appendChild(navBar)
headerDiv.appendChild(logOutBtn)









const footerDiv = document.querySelector('footer')
footerDiv.classList.add('style')

const legalText = document.createElement('p')
legalText.textContent = 'All Content © Copyright WooDY International 2024. All Rights Reserved.'

const socialDiv = document.createElement('div')
socialDiv.classList.add('socials')
const socials = ["youtube", "instagram", "twitter-x", "reddit", "discord"]
socials.forEach(social => {
    const socialIcon = document.createElement("i")
    socialIcon.classList.add(`ri-${social}-line`, `ri-xl`)
    socialDiv.appendChild(socialIcon)
})

footerDiv.appendChild(legalText)
footerDiv.appendChild(socialDiv)