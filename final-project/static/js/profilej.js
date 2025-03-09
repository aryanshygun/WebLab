const body = document.getElementById('body')

// left sdide options
const leftList = [
    ["Personal Info", 'personal-div'],
    ["Courses", 'courses-div'],
    ["Study", 'study-div'],
    ["Exam", 'exam-div'],
]

// load left options
function loadLeft() {
    const leftSection = document.createElement('section')
    leftSection.classList.add('left')

    leftList.forEach(([sectionName, sectionId], index) => {
        const btn = document.createElement('a')
        btn.classList.add('style', 'btn')
        btn.textContent = sectionName
        btn.onclick = function () {
            showDiv(sectionId, btn)
        }

        // profile first option highlighted
        if (index === 0) {
            btn.classList.add('active');
        }
        leftSection.appendChild(btn)
    })

    // costumize the logout btn
    const logOut = document.createElement('a')
    logOut.textContent = 'Log Out'
    logOut.href = '/logout'
    logOut.classList.add("style", "btn", "logout-btn")
    leftSection.appendChild(logOut)
    

    body.append(leftSection)
}

function loadRight() {
    const rightSection = document.createElement('section');
    rightSection.classList.add('right');

    createPersonalInfoDiv();
    createCoursesDiv()

    rightSection.appendChild(createExamDiv())
    rightSection.appendChild(createStudyDiv())



    body.appendChild(rightSection);
}

// personal info div
function createPersonalInfoDiv() {
    fetch('/get-info')
    .then(response => response.json())
    .then(data => {
        const dataDetails = data.details;
        const form = document.createElement('form');
        form.id = 'personal-div';
        form.classList.add('content-div');
        form.method = "POST";
        // form.style.display = 'none'

        //  update top
        const topDiv = document.createElement('div');
        topDiv.classList.add('style', 'row-div');
        topDiv.innerHTML = `
            <h1> ${dataDetails.username} </h1>
            <h2> ${dataDetails.status}</h2>
        `;
        form.appendChild(topDiv);

        // automating
        const userList = [
            ['First Name:', 'first-name', 'text', dataDetails.first_name],
            ['Last Name:', 'last-name', 'text', dataDetails.last_name],
            ['Password:', 'password', 'text', dataDetails.password],
            ['City:', 'city', 'text', dataDetails.city],
            ['Age:', 'age', 'number', dataDetails.age]
        ];

        // update rows
        userList.forEach(([labelTextContent, name, type, inputTextContent]) => {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('style', 'row-div');

            const label = document.createElement('label');
            label.setAttribute('for', name);
            label.textContent = labelTextContent;

            const input = document.createElement('input');
            input.classList.add('style', 'input')
            input.type = type;
            input.name = name;
            input.value = inputTextContent;

            rowDiv.appendChild(label);
            rowDiv.appendChild(input);
            form.appendChild(rowDiv);
        });


        // update btn
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('style', 'row-div', 'btn-row-div');
        buttonDiv.innerHTML = `
        <p id='success-message' style="display: none;" >Update Successfull!</p>
        <button type='submit' class='style btn'> Update </button>
        `
        form.appendChild(buttonDiv);

        // Add the event listener to handle the form submission
        form.addEventListener('submit', function(event) {
            event.preventDefault()

            // instead of writing down the form inputs one by one, use tihs
            const formData = new FormData(form);
            fetch('/update-user', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById('success-message').style.display = 'inline'
                }
            })
        })
        document.querySelector('.right').appendChild(form)
    })
}



function createCoursesDiv() {
    fetch('/get-info')
    .then(response => response.json())
    .then(data => {
        const dataDetails = data.details;
    
        const div = document.createElement('div');
        div.id = 'courses-div';
        div.classList.add('content-div');
        div.style.display = 'none';

        dataDetails.courses_finished.forEach(([courseName, courseScore]) => {
            
            let newName = courseName.replace(/ /g, '&')

            const courseDiv = document.createElement('div');
            courseDiv.classList.add('course-div', 'style');

            const infoRow = document.createElement('div')

            const topicHead = document.createElement('h1')
            topicHead.textContent = 'Finished'

            const courseText = document.createElement('p')
            courseText.textContent = courseName

            const scoreText = document.createElement('p')
            scoreText.textContent = `Current Score: ${courseScore}`

            infoRow.appendChild(topicHead);
            infoRow.appendChild(courseText);
            infoRow.appendChild(scoreText);

            const actionRow = document.createElement('div')

            const openCourse = document.createElement('a')
            openCourse.textContent = 'View Course'
            openCourse.classList.add('style', 'btn')
            openCourse.href = `/study/${newName}`


            const openExam = document.createElement('a')
            openExam.textContent = 'View Exam'
            openExam.classList.add('style', 'btn')
            openExam.href = `/exam/${newName}`

            actionRow.appendChild(openCourse)
            actionRow.appendChild(openExam)

            courseDiv.appendChild(infoRow)
            courseDiv.appendChild(actionRow)

            div.appendChild(courseDiv);
        });

        dataDetails.courses_in_progress.forEach(([courseName, courseScore]) => {
            
            let newName = courseName.replace(/ /g, '&')

            const courseDiv = document.createElement('div');
            courseDiv.classList.add('course-div', 'style');

            const infoRow = document.createElement('div')

            const topicHead = document.createElement('h1')
            topicHead.textContent = 'In Progress'

            const courseText = document.createElement('p')
            courseText.textContent = courseName

            const scoreText = document.createElement('p')
            scoreText.textContent = `Current Score: ${courseScore}`

            infoRow.appendChild(topicHead);
            infoRow.appendChild(courseText);
            infoRow.appendChild(scoreText);

            const actionRow = document.createElement('div')

            const openCourse = document.createElement('a')
            openCourse.textContent = 'View Course'
            openCourse.classList.add('style', 'btn')
            openCourse.href = `/study/${newName}`


            const openExam = document.createElement('a')
            openExam.textContent = 'View Exam'
            openExam.classList.add('style', 'btn')
            openExam.href = `/exam/${newName}`

            actionRow.appendChild(openCourse)
            actionRow.appendChild(openExam)

            courseDiv.appendChild(infoRow)
            courseDiv.appendChild(actionRow)

            div.appendChild(courseDiv);
        });

        document.querySelector('.right').appendChild(div)
    })
}



function createExamDiv() {
    const div = document.createElement('div');
    div.id = 'exam-div';
    div.classList.add('content-div');
    div.textContent = 'This is the Exam section';
    div.style.display = 'none'; // Initially hidden
    return div
}


function createStudyDiv() {
    const div = document.createElement('div')
    div.id = 'study-div'
    div.classList.add('content-div')
    div.textContent = 'This is the Study section'
    div.style.display = 'none'
    return div

}


function showDiv(sectionId, btn) {
    document.querySelectorAll('.left .btn').forEach(button => {
        button.classList.remove('active')
    })
    btn.classList.add('active')
    document.querySelectorAll('.content-div').forEach(div => {
        div.style.display = 'none'
    })
    const targetDiv = document.getElementById(sectionId)
    if (targetDiv) {
        targetDiv.style.display = 'flex'
    }
}

loadLeft()
loadRight()

