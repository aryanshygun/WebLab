function createDefaultDiv(text){
    const div = document.createElement('div')
    div.classList.add('style', 'default-div')
    
    const p = document.createElement('p')
    p.textContent = text
    div.appendChild(p)
    return div
}

function createStudyDiv(course){
    const div = document.createElement('div')
    div.classList.add('study-div')

    function createLeftDiv(course){
        const leftDiv = document.createElement('div')
        leftDiv.classList.add('style', 'left-div')
        
        const titleText = document.createElement('h2')
        titleText.textContent = course.title

        const paragraphText = document.createElement('p')
        paragraphText.textContent = course.body

        leftDiv.appendChild(titleText)
        leftDiv.appendChild(paragraphText)
        return leftDiv
    }

    function createRightDiv(course){
        const rightDiv = document.createElement('div')
        rightDiv.classList.add('right-div')

        course.examples.forEach(example => {

            const div = document.createElement('div')
            div.classList.add('style', 'example')

            const topRow = document.createElement('div')
            topRow.classList.add('top-row')

            const exampleText = document.createElement('h3')
            exampleText.textContent = example.example

            const answerText = document.createElement('p')
            answerText.textContent = example.answer

            topRow.appendChild(exampleText)
            topRow.appendChild(answerText)


            const explanationText = document.createElement('p')
            explanationText.textContent = example.explanation

            div.appendChild(topRow)
            div.appendChild(explanationText)

            rightDiv.appendChild(div)

        });
        return rightDiv
    }

    div.appendChild(createLeftDiv(course))
    div.appendChild(createRightDiv(course))
    return div
}

function fillCoursePage(){

    const url_course = window.location.pathname.split("/")[2]
    const body = document.getElementById('body')
    
    fetch(`/get/course/${url_course}`)
    .then (response => response.json())
    .then (data => {
        if (data.message === 'not logged'){
            body.appendChild(createDefaultDiv('You need to first Log in!'))
        } else if (data.message === 'not student'){
            body.appendChild(createDefaultDiv('You need to be a student!'))
        } else if (data.message === 'no course selected'){
            body.appendChild(createDefaultDiv('Select a course from your profile!'))
        } else {
            body.appendChild(createStudyDiv(data.course))
        }
    })
}

fillCoursePage()