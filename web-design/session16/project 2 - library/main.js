
// const usersdict = {}
// // localStorage.setItem(firstName + lastName, JSON.stringify(user));
// const users = JSON.parse(localStorage.getItem('users')) || usersdict

function submit_data(){

    const firstName = document.getElementById('first-name').value
    const lastName = document.getElementById('last-name').value
    const birthDate = document.getElementById('birth-date').value
    const phoneNumber = document.getElementById('phone-number').value
    const emailAddress = document.getElementById('email').value
    const homeAddress = document.getElementById('address').value
    const cityName = document.getElementById('city').value
    const stateName = document.getElementById('state').value

    const cardDuration = document.querySelector('input[name="card"]:checked').nextSibling.textContent.trim();

    const wantsUpdates = document.getElementById('understand').checked ? "Yes" : "No";

    usersdict[firstName + lastName] = {
        "First Name" : firstName,
        "Last Name" : lastName,
        "Birth Date" : birthDate,
        "Email Address" : emailAddress,
        "Phone Number" : phoneNumber,
        "Home Address" : homeAddress,
        "City Name" : cityName,
        "State Name" : stateName,
        "Library Card Duration": cardDuration,
        "Wants Updates": wantsUpdates
    }
    // Object.assign(users, usersdict);
    // localStorage.setItem('users', JSON.stringify(users));

}