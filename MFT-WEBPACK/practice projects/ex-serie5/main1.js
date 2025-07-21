function getRandomColor() {
    const pastelColors = [
        "#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF",
        "#E6E6FA", "#FFD1DC", "#FFCCE5", "#D5AAFF", "#C5E1A5"
    ];
    return pastelColors[Math.floor(Math.random() * pastelColors.length)];
}



const Usernames1 = ["jack", "kate"]
const Passwords1 = ["secret", '1234']
const Dates1 = ['02:23 PM', '04:23 AM']
let table1 = document.getElementById("registered-users-1")
for (let i = 0; i < Usernames1.length; i++) {
    let row = document.createElement("tr");
    let rowColor = getRandomColor()
    row.innerHTML = `
        <td style='background-color: ${rowColor};'>${Usernames1[i]}</td>
        <td style='background-color: ${rowColor};'>${Passwords1[i]}</td>
        <td style='background-color: ${rowColor};'>${Dates1[i]}</td>
    `;
    table1.appendChild(row)
}
function register1() {
    event.preventDefault()
    let user = document.getElementById("username-1").value
    let pass = document.getElementById("password-1").value
    let datetime = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    Usernames1.push(user)
    Passwords1.push(pass)
    Dates1.push(datetime)
    let row = document.createElement("tr")
    let rowColor = getRandomColor()
    row.innerHTML = `
        <td style='background-color: ${rowColor};'>${user}</td>
        <td style='background-color: ${rowColor};'>${pass}</td>
        <td style='background-color: ${rowColor};'>${datetime}</td>
    `;
    table1.appendChild(row)
}



const Users = [["jack", "secret", "jack@gmail", "09:21 AM"], ["kate",'1234','kate@gmail', '02:21 PM']]
let table2 = document.getElementById("registered-users-2")
for (let i = 0; i < Users.length; i++) {
    let row = document.createElement("tr");
    let rowColor = getRandomColor()

    row.innerHTML = `
        <td style='background-color: ${rowColor};'>${Users[i][0]}</td>
        <td style='background-color: ${rowColor};'>${Users[i][1]}</td>
        <td style='background-color: ${rowColor};'>${Users[i][2]}</td>
        <td style='background-color: ${rowColor};'>${Users[i][3]}</td>
    `;
    table2.appendChild(row)
}
function register2() {
    event.preventDefault()
    let user = document.getElementById("username-2").value
    let pass = document.getElementById("password-2").value
    let email = document.getElementById("email-2").value
    let datetime = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    let tempList = [user, pass, email, datetime]
    Users.push(tempList)

    let row = document.createElement("tr")
    let rowColor = getRandomColor()
    row.innerHTML = `
        <td style='background-color: ${rowColor};'>${user}</td>
        <td style='background-color: ${rowColor};'>${pass}</td>
        <td style='background-color: ${rowColor};'>${email}</td>
        <td style='background-color: ${rowColor};'>${datetime}</td>
    `;
    table2.appendChild(row)
}



function showLogin() {  
    event.preventDefault()

    const showLoginBtn = document.getElementById('show-login')
    const loginDiv = document.getElementById('login-div')
    const statusDiv = document.getElementById('status-div')

    if (loginDiv.style.display === 'none') {
        loginDiv.style.display = 'flex'
        statusDiv.style.display = 'flex'
        showLoginBtn.textContent = 'Hide Login'
    } else {
        loginDiv.style.display = 'none'
        statusDiv.style.display = 'none'
        showLoginBtn.textContent = 'Show Login'
    }
}


function login(){
    event.preventDefault()

    let user = document.getElementById("username-3").value
    let pass = document.getElementById("password-3").value


    for (let i = 0; i < Usernames1.length; i++) {

        if ( user === Usernames1[i] && pass === Passwords1[i]){
            logState('success')
            return
        }
    }

    for (let i = 0; i < Users.length; i++) {
        if ( user === Usernames1[i][0] && pass === Passwords1[i][1]){
            logState('success')
            return
        }
    }
    logState('failure')

}

function logState(check){
    const status = document.getElementById('status')
    if (check === 'success') {
        status.textContent = 'Status: Success! You are now Logged in'
    } else {
        status.textContent = 'Status: Failure! Try again'

    }
}