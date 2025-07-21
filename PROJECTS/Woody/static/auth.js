const loginForm = document.getElementById('login-form')
const registerForm = document.getElementById('register-form')
const showLoginButton = document.getElementById('show-login')
const showRegisterButton = document.getElementById('show-register')
const formHeader = document.getElementById('form-header')

showLoginButton.addEventListener('click', () => {
    loginForm.classList.add('active')
    registerForm.classList.remove('active')
    formHeader.textContent = "Please log in to continue."
})

showRegisterButton.addEventListener('click', () => {
    registerForm.classList.add('active')
    loginForm.classList.remove('active')
    formHeader.textContent = "Create an account to get started."
})
