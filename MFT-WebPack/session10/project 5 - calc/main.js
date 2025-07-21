var num1 = document.getElementById('num1').value
var operator = document.getElementById('operator').value
var num2 = document.getElementById('num2').value
num1 = parseInt(num1)
num2 = parseInt(num2)
var result

if (operator == '+') {
    result = num1 + num2
} else if (operator == '-') {
    result = num1 - num2
} else if (operator == '*') {
    result = num1 * num2
} else if (operator == '/') {
    result = num1 / num2
}

// console.log(result)
document.getElementById('show').innerHTML = result
