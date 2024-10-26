// https://quera.org/college/16059/chapter/64208/lesson/218133/?comments_page=1&comments_filter=ALL

function countNumbersAboveAverage(text) {
    let sum = 0
    for (let i = 0; i <text.length; i++) {
        sum += text[i]
    }


    let avg = sum / text.length
    let count = 0
    for (let i = 0; i < text.length; i++) {
        if (text[i] > avg) {
            count += 1
        }
    }
    return count
}

const inputText = readline().split(' ').map(Number);
console.log(countNumbersAboveAverage(inputText));