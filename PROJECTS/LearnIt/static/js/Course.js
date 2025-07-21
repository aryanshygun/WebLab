
function createStudyDiv(dataSuccess, dataMessage){
    if (!dataSuccess){
        const div = document.createElement('div')
        div.classList.add('style', 'default-div')
        const p = document.createElement('p')
        p.textContent = dataMessage
        div.appendChild(p)
        return div
    }
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

    div.appendChild(createLeftDiv(dataMessage))
    div.appendChild(createRightDiv(dataMessage))
    return div
}

function fillCoursePage(){

    const url_course = window.location.pathname.split("/")[2]
    const body = document.getElementById('body')
    
    console.log(url_course)
    fetch(`/get/course/${url_course}`)
    .then (response => response.json())
    .then (data => {
        console.log(data)
        body.appendChild(createStudyDiv(data.success, data.message))
    })
}

fillCoursePage()
