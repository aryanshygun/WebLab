let inputs = document.querySelectorAll('.blank-space')
let currentIndex = 0

function enterLetter(letter) {
    if (currentIndex < inputs.length) {
        inputs[currentIndex].value = letter
        currentIndex++
    }
}

function deleteDigit() {
    if (currentIndex > 0) {
        currentIndex--
        inputs[currentIndex].value = ''
    }
}

function check(selected_word) {
    let word = ""

    for (let i = 0; i < inputs.length; i++) {
        word += inputs[i].value
    }
    if (word === selected_word){
        console.log('congrats!')
    } else {
        console.log('failure')
    }

    console.log(word)
}
// console.log(letters)