const productsBtn = document.getElementById('products-btn')
const usersBtn = document.getElementById('users-btn')

const productsDiv = document.getElementById('products-div')
const usersDiv = document.getElementById('users-div')

productsBtn.addEventListener('click', () => {
    productsBtn.style.backgroundColor = 'royalblue'
    usersBtn.style.backgroundColor = 'unset'

    productsDiv.classList.add("show")
    usersDiv.classList.remove("show")
})

usersBtn.addEventListener('click', () => {
    usersBtn.style.backgroundColor = 'royalblue'
    productsBtn.style.backgroundColor = 'unset'

    usersDiv.classList.add('show');
    productsDiv.classList.remove('show'); 
})

document.addEventListener('DOMContentLoaded', () => {
    // Get the div you want to "click" programmatically
    // const divToClick = document.getElementById('products-div');

    // Simulate a click on the div
    if (usersBtn) {
        usersBtn.click();
    }
});
