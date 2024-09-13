const heroSection = document.querySelector('.hero');
const heroDivs = document.querySelectorAll('.hero-div')
const heroButtons = document.querySelectorAll('.hero-div .button')

let currentTallDiv = null
const baseHeight = '100px'

heroButtons.forEach(btn => {
    btn.style.display = 'none'
})

heroDivs.forEach(div => {
    div.addEventListener('mouseover', () => {
        if (currentTallDiv && currentTallDiv !== div) {
            currentTallDiv.style.height = baseHeight
            const prevBtn = currentTallDiv.querySelector('.button')
            prevBtn.style.display = 'none'
        }

        div.style.height = '150px'
        currentTallDiv = div

        const bgImage = div.getAttribute('data-bg')
        heroSection.style.backgroundImage = `url(images/${bgImage})`
        
        const btn = div.querySelector('.button')
        btn.style.display = 'flex'

    })
})
