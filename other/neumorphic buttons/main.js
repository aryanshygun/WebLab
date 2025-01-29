let backgrounds = document.querySelectorAll('section')

backgrounds.forEach(bg => {
    let div = bg.closest('article').querySelector('div');
    let link = div.querySelector('a')

    div.addEventListener('mouseover', () => {
        bg.style.width = '220px'
        bg.style.height = '50px'
        bg.style.borderRadius = '50px'
        link.style.letterSpacing = '3px'
        link.style.color = '#262626'
    })
    
    div.addEventListener('mouseout', () => {
        bg.style.width = '40px'
        bg.style.height = '70px'
        bg.style.borderRadius = '5px'
        link.style.letterSpacing = 'unset'
        link.style.color = 'white'
    })
});