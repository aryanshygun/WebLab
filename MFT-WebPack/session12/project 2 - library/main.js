
// localStorage.setItem(firstName + lastName, JSON.stringify(user));
// const users = JSON.parse(localStorage.getItem('users')) || usersdict

// function submit_data(){

//     const firstName = document.getElementById('first-name').value
//     const lastName = document.getElementById('last-name').value
//     const birthDate = document.getElementById('birth-date').value
//     const phoneNumber = document.getElementById('phone-number').value
//     const emailAddress = document.getElementById('email').value
//     const homeAddress = document.getElementById('address').value
//     const cityName = document.getElementById('city').value
//     const stateName = document.getElementById('state').value

//     const cardDuration = document.querySelector('input[name="card"]:checked').nextSibling.textContent.trim();

//     // Check if the user wants periodic updates
//     const wantsUpdates = document.getElementById('understand').checked ? "Yes" : "No";

//     usersdict[firstName + lastName] = {
//         "First Name" : firstName,
//         "Last Name" : lastName,
//         "Birth Date" : birthDate,
//         "Email Address" : emailAddress,
//         "Phone Number" : phoneNumber,
//         "Home Address" : homeAddress,
//         "City Name" : cityName,
//         "State Name" : stateName,
//         "Library Card Duration": cardDuration,
//         "Wants Updates": wantsUpdates
//     }
//     Object.assign(users, usersdict);
//     localStorage.setItem('users', JSON.stringify(users));

// }

const usersdict = {}

$(".button").click(function (submit) {
    let firstName = $("#first-name").val()
    let lastName = $("#last-name").val()
    let birthDate = $("#birth-date").val()
    $(".results").clear()
    $(".results").append(`<h1> First Name : ${firstName} </h1>`)
    $(".results").append(`<h1> Last Name : ${lastName} </h1>`)
    $(".results").append(`<h1> Birth Date : ${birthDate} </h1>`)
})