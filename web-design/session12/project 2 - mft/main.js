

const toggle = document.getElementById('toggle')

const enElements = document.querySelectorAll('.en');
const irElements = document.querySelectorAll('.ir');
const inputDiv = document.querySelectorAll('.input-div')
const formDiv = document.getElementById('form-div')
const titleDiv = document.getElementById('title-div')


function colorize() {
    if (toggle.classList == 'ri-toggle-line ri-3x') {
        toggle.classList = 'ri-toggle-fill ri-3x';

        enElements.forEach(element => {
            element.style.display = 'flex'
        })
        irElements.forEach(element => {
            element.style.display = 'none'
        })

        formDiv.dir = 'ltr'
        titleDiv.dir = 'ltr'

    } else {
        toggle.classList = 'ri-toggle-line ri-3x';

        enElements.forEach(element => {
            element.style.display = 'none'
        })
        irElements.forEach(element => {
            element.style.display = 'flex'
        })

        formDiv.dir = 'rtl'
        titleDiv.dir = 'ltr'

    }
}