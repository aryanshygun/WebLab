let placeHolder = document.querySelectorAll('.blank-space')
let turn = 0
// const earnableScore = document.getElementById('earnable-score')
const result = document.getElementById('result')
const resultDiv = document.getElementById('result-div')

function enterLetter(letter) {
    if (turn < placeHolder.length) {
        placeHolder[turn].value = letter.toUpperCase()
        turn++
    }
}

function deleteLetter() {
    if (turn > 0) {
        turn--
        placeHolder[turn].value = ''
    }
}

let hintCount = 0
let defaultScore = 50
result.textContent = `Earnable Score - ${defaultScore}`
// earnableScore.textContent = 100


function revealLetter(word) {
    if (hintCount === word.length){
        return
    }

    let randomIndex = Math.floor(Math.random() * word.length)
    if (turn < placeHolder.length){
        if (!placeHolder[randomIndex].placeholder){
            placeHolder[randomIndex].placeholder = word[randomIndex].toUpperCase();
            hintCount++
            defaultScore -= 5
            result.textContent = `Earnable Score - ${defaultScore}`
            return
        }
        revealLetter(word)
    }
}


const tryBtn = document.getElementById('try-again')


function check(selectedWord, userScore) {
    let word = ""
    let endpoint;
    for (let i = 0; i < placeHolder.length; i++) {
        word += placeHolder[i].value
    }
    score = parseInt(userScore)
    tryBtn.style.display = 'flex'
    resultDiv.style.justifyContent = 'space-between'

    if (word.toLowerCase() === selectedWord){
        // result.textContent = `Success! - You earned ${defaultScore}`
        score += defaultScore
        console.log(typeof userScore)
        console.log(typeof defaultScore)
        result.textContent = `Current Score: ${userScore}`
        resultDiv.style.backgroundColor = 'green'

        // endpoint = '/success'
        // location.href = `success/${defaultScore}`


    } else {
        score -= defaultScore
        console.log(typeof userScore)
        console.log(typeof defaultScore)
        result.textContent = `Current Score: ${userScore}`
        resultDiv.style.backgroundColor = 'red'

        // endpoint = '/fail'
        // location.href = `fail/${defaultScore}`
    }


    fetch('/result', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ updated_score: score })
    })

}
