const userName = document.getElementById('user-name').value
const userPass = document.getElementById('user-pass').value

const authDiv = document.getElementById('auth-div')
const examDiv = document.getElementById('exam-div')
const examQuestionsDiv = document.getElementById('exam-questions')

const users = {
    'amir': {
        'username': 'amir',
        'password': '111'
    },
    'hosein': {
        'username': 'hosein',
        'password': '222'
    },
    'aryan': {
        'username': 'aryan',
        'password': '333'
    },
    'shayan': {
        'username': 'shayan',
        'password': '444'
    },
    'nazanin': {
        'username': 'nazanin',
        'password': '555'
    }
}

let questions = {
    'q1' : {
        'text': '2+2',
        'ans1': '4',
        'ans2': '3',
        'ans3': '6',
        'ans4': '10',
        'trueans': 'ans1'
    },
    'q2' : {
        'text': '5-3',
        'ans1': '2',
        'ans2': '3',
        'ans3': '1',
        'ans4': '0',
        'trueans': 'ans1'
    },
    'q3' : {
        'text': '3+7',
        'ans1': '10',
        'ans2': '8',
        'ans3': '12',
        'ans4': '9',
        'trueans': 'ans1'
    },
    'q4' : {
        'text': '6*2',
        'ans1': '10',
        'ans2': '12',
        'ans3': '14',
        'ans4': '8',
        'trueans': 'ans2'
    },
    'q5' : {
        'text': '9/3',
        'ans1': '2',
        'ans2': '4',
        'ans3': '3',
        'ans4': '6',
        'trueans': 'ans3'
    }
}

function addQuestions(){
    for (i in questions){
        let question = document.createElement('article')
        question.innerHTML = `
        <p class="question-p">question: ${questions[i]['text']}</p>
        <div class="question-options">
            <div class="question-row">
                <input class="radioBtn" type="radio" name="${i}" value="ans1">
                <p>${questions[i]['ans1']}</p>
            </div>
            <div class="question-row">
                <input class="radioBtn" type="radio" name="${i}" value="ans2">
                <p>${questions[i]['ans2']}</p>
            </div>
            <div class="question-row">
                <input class="radioBtn" type="radio" name="${i}" value="ans3">
                <p>${questions[i]['ans3']}</p>
            </div>
            <div class="question-row">
                <input class="radioBtn" type="radio" name="${i}" value="ans4">
                <p>${questions[i]['ans4']}</p>
            </div>
        </div>
        `
        examQuestionsDiv.appendChild(question)
    }
}

function userLogin(){
    if (userName in users && users[userName]['password'] == userPass){
        alert("Welcome to the test")
        authDiv.style.display = 'none'
        examDiv.style.display = 'flex'
        addQuestions()
    } else {
        alert("Wrong details, Try again")
    }
}

function evaluateExam() {
    let score = 0;
    for (let i in questions) {
        const selectedAnswer = document.querySelector(`input[name="${i}"]:checked`).value

        if (selectedAnswer === questions[i]['trueans']) {
            score += 10;
        }
    }
    if (score >= 30){
        alert(`Congrats! you passed with score: ${score}`)
    } else {
        alert(`You failed with score: ${score}`)
    }
}

