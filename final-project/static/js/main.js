function createHeader(){
    const headerDiv = document.querySelector('header')
    headerDiv.classList.add('style')

    const logoName = document.createElement('a')
    logoName.textContent = 'LOGO'

    const navBar = document.createElement('div')
    navBar.classList.add('nav-bar')
    const pages = ["Home", "Courses", "Opinions", "Contact Us"]
    pages.forEach(page => {
        const link = document.createElement("a")
        link.classList.add("style", "btn")
        link.textContent = page
        navBar.appendChild(link)
    })

    const profilePage = document.createElement('a')
    profilePage.classList.add('style', 'alt', 'btn', 'order')
    profilePage.textContent = 'PROFILE'

    headerDiv.appendChild(logoName)
    headerDiv.appendChild(navBar)
    headerDiv.appendChild(profilePage)

}

function createFooter(){
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
}

createHeader()
createFooter()