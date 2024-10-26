// https://quera.org/college/16059/chapter/64208/lesson/218138/?comments_page=1&comments_filter=ALL

const numbersArray = [];

function storeNumberOrEnd(number) {
    if (number !== 'End') {
        numbersArray.push(number)
        return true
    } else {

        return false
    }
}

function printReverse(number){
    return parseInt(number.toString().split('').reverse().join(''))
}

while (storeNumberOrEnd(readline())) {}

numbersArray.reverse();

for (let i = 0; i < numbersArray.length; i++) {
    console.log(printReverse(numbersArray[i]));
}
