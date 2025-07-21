function createTestsDiv(course_name, data) {
    const form = document.createElement('form');
    form.id = 'quiz-form';

    data.forEach((test, index) => {
        const testRow = document.createElement('div');
        testRow.classList.add('test', 'style');

        const questionP = document.createElement('h3')
        questionP.textContent = test.question
        testRow.appendChild(questionP)

        const optionsRow = document.createElement('div');
        optionsRow.classList.add('options');

        test.options.forEach(option => {
            const label = document.createElement('label');
            label.innerHTML = `
                <input type="radio" name="question${index}" value="${option}"> <p>${option}</p>
            `;
            optionsRow.appendChild(label);
        });

        testRow.appendChild(optionsRow);
        form.appendChild(testRow);
    });

    const submitRow = document.createElement('div');
    submitRow.classList.add('submit-row', 'style');

    const resultText = document.createElement('p')
    resultText.id = 'resultText'
    resultText.style.display = 'none'
    submitRow.appendChild(resultText)

    const submitButton = document.createElement('button');
    submitButton.classList.add('style', 'btn')
    submitButton.type = 'button';
    submitButton.textContent = 'Submit';
    submitButton.onclick = function() {
        let score = 0;
        data.forEach((test, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            if (selectedOption.value === test["correct-answer"]) {
                score++;
            }
        });

        percentage = (score / 5) * 100

        submitRow.style.justifyContent = 'space-evenly'
        resultText.style.display = 'flex'
        resultText.textContent = `Your Score is ${percentage}%!`

        fetch(`/update/add/score`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                exam_name: course_name,
                score: percentage
            })
        })
        .then(response => response.json())
        .then(data =>{
            

        })

    };

    submitRow.appendChild(submitButton);
    form.appendChild(submitRow);
    return form
}


function fillExamPage(){
    const url_exam = window.location.pathname.split("/")[2]
    const body = document.getElementById('body')
    
    fetch(`/get/exam/${url_exam}`)
    .then (response => response.json())
    .then (data => {
        course_name = url_exam.replace(/&/g, " ")
        body.appendChild(createTestsDiv(course_name, data.tests))
    })
}

fillExamPage()