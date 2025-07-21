const xName = prompt("Please enter your name");

function welcome(x) {
    const statement = 'Hello there, ' + x + '!';
    return statement;  // Return the greeting message
}


document.getElementById("greeting").innerText = welcome(xName);  