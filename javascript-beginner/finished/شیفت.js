// https://quera.org/college/16059/chapter/64208/lesson/218147/?comments_page=1&comments_filter=ALL&submissions_page=1

function shiftArray(n, shiftSteps, originalArray) {
    for (let i = 0; i < shiftSteps; i++) {
        originalArray.unshift(originalArray[originalArray.length - 1])
        originalArray.pop()
    }
    return originalArray;
}

const [n, x] = readline().split(' ').map(Number)
const inputArray = readline().split(' ').map(Number)
console.log(shiftArray(n, x, inputArray).join(' '))