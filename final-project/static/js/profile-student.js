export function createPersonalInfoDiv(dataDetails) {
    const form = document.createElement('form');
    form.id = 'personal-div';
    form.classList.add('content-div');
    form.method = "POST";

    // Update top
    const topDiv = document.createElement('div');
    topDiv.classList.add('style', 'row-div');
    topDiv.innerHTML = `
        <h1> ${dataDetails.username} </h1>
        <h2> ${dataDetails.status}</h2>
    `;
    form.appendChild(topDiv);

    // Automating user list
    const userList = [
        ['First Name:', 'first-name', 'text', dataDetails.first_name],
        ['Last Name:', 'last-name', 'text', dataDetails.last_name],
        ['Password:', 'password', 'text', dataDetails.password],
        ['City:', 'city', 'text', dataDetails.city],
        ['Age:', 'age', 'number', dataDetails.age]
    ];

    userList.forEach(([labelTextContent, name, type, inputTextContent]) => {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('style', 'row-div');

        const label = document.createElement('label');
        label.setAttribute('for', name);
        label.textContent = labelTextContent;

        const input = document.createElement('input');
        input.classList.add('style', 'input');
        input.type = type;
        input.name = name;
        input.value = inputTextContent;

        rowDiv.appendChild(label);
        rowDiv.appendChild(input);
        form.appendChild(rowDiv);
    });

    // Update button
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('style', 'row-div', 'btn-row-div');
    buttonDiv.innerHTML = `
        <p id='success-message' style="display: none;">Update Successful!</p>
        <button type='submit' class='style btn'> Update </button>
    `;
    form.appendChild(buttonDiv);

    // Handle form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        fetch('/update-user', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById('success-message').style.display = 'inline';
                }
            });
    });

    // document.getElementById('div-section').appendChild(form);
    document.getElementById('body').appendChild(form);
}

// function createAllCoursesDiv(dataDetails) {
//     const div = document.createElement('div');
//     div.id = 'courses-div';
//     div.classList.add('content-div', 'style');

//     const createCourseSection = (courses, title) => {
//         courses.forEach(([courseName, courseScore]) => {
//             let newName = courseName.replace(/ /g, '&');

//             const courseDiv = document.createElement('div');
//             courseDiv.classList.add('course-div', 'style');

//             const infoRow = document.createElement('div');
//             const topicHead = document.createElement('h1');
//             topicHead.textContent = title;

//             const courseText = document.createElement('p');
//             courseText.textContent = courseName;

//             const scoreText = document.createElement('p');
//             scoreText.textContent = `Current Score: ${courseScore}`;

//             infoRow.appendChild(topicHead);
//             infoRow.appendChild(courseText);
//             infoRow.appendChild(scoreText);

//             const actionRow = document.createElement('div');
//             const openCourse = document.createElement('a');
//             openCourse.textContent = 'View Course';
//             openCourse.classList.add('style', 'btn');
//             openCourse.href = `/profile/study/${newName}`;

//             const openExam = document.createElement('a');
//             openExam.textContent = 'View Exam';
//             openExam.classList.add('style', 'btn');
//             openExam.href = `/profile/exam/${newName}`;

//             actionRow.appendChild(openCourse);
//             actionRow.appendChild(openExam);

//             courseDiv.appendChild(infoRow);
//             courseDiv.appendChild(actionRow);

//             div.appendChild(courseDiv);
//         });
//     };

//     createCourseSection(dataDetails.courses_finished, 'Finished');
//     createCourseSection(dataDetails.courses_in_progress, 'In Progress');

//     document.querySelector('.right').appendChild(div);
// }

// function createAllCoursesDiv(dataDetails) {
//     const div = document.createElement('div');
//     div.id = 'courses-div';
//     div.classList.add('content-div', 'style');

//     const createCourseSection = (courses, title) => {

//         dataDetails.courses_finished.forEach(([courseName, courseScore]) => {
//             let newName = courseName.replace(/ /g, '&');

//             const courseDiv = document.createElement('div');
//             courseDiv.classList.add('course-div', 'style');

//             const infoRow = document.createElement('div');
//             // const topicHead = document.createElement('h1');
//             // topicHead.textContent = title;

//             const courseText = document.createElement('p');
//             courseText.textContent = courseName;

//             const scoreText = document.createElement('p');
//             scoreText.textContent = `Current Score: ${courseScore}`;

//             infoRow.appendChild(topicHead);
//             infoRow.appendChild(courseText);
//             infoRow.appendChild(scoreText);

//             const actionRow = document.createElement('div');
//             const openCourse = document.createElement('a');
//             openCourse.textContent = 'View Course';
//             openCourse.classList.add('style', 'btn');
//             openCourse.href = `/profile/study/${newName}`;

//             const openExam = document.createElement('a');
//             openExam.textContent = 'View Exam';
//             openExam.classList.add('style', 'btn');
//             openExam.href = `/profile/exam/${newName}`;

//             actionRow.appendChild(openCourse);
//             actionRow.appendChild(openExam);

//             courseDiv.appendChild(infoRow);
//             courseDiv.appendChild(actionRow);

//             div.appendChild(courseDiv);
//         });
//     };

//     createCourseSection(dataDetails.courses_finished, 'Finished');
//     createCourseSection(dataDetails.courses_in_progress, 'In Progress');

//     document.querySelector('.right').appendChild(div);
// }

function createFinishedCoursesDiv(dataDetails){
    const div = document.createElement('div')
    div.id = 'finished-courses-div'
    div.classList.add('content-div');

    div.style.display = 'none'
    dataDetails.courses_finished.forEach(([courseName, courseScore]) => {
        let newName = courseName.replace(/ /g, '&');

        const courseDiv = document.createElement('div');
        courseDiv.classList.add('course-div', 'style');

        const infoRow = document.createElement('div');
        const courseText = document.createElement('p');
        courseText.textContent = courseName;

        const scoreText = document.createElement('p');
        scoreText.textContent = `Current Score: ${courseScore}`;

        // infoRow.appendChild(topicHead);
        infoRow.appendChild(courseText);
        infoRow.appendChild(scoreText);

        const actionRow = document.createElement('div');
        const openCourse = document.createElement('a');
        openCourse.textContent = 'View Course';
        openCourse.classList.add('style', 'btn');
        openCourse.href = `/profile/study/${newName}`;

        const openExam = document.createElement('a');
        openExam.textContent = 'View Exam';
        openExam.classList.add('style', 'btn');
        openExam.href = `/profile/exam/${newName}`;

        actionRow.appendChild(openCourse);
        actionRow.appendChild(openExam);

        courseDiv.appendChild(infoRow);
        courseDiv.appendChild(actionRow);

        div.appendChild(courseDiv);
    });

    // document.getElementById('div-section').appendChild(div);
    document.getElementById('body').appendChild(div);
}

function createInProgressDivs(dataDetails){
    const div = document.createElement('div')
    div.id = 'in-progress-courses-div'
    div.classList.add('content-div');
    div.style.display = 'none'

    dataDetails.courses_in_progress.forEach(([courseName, courseScore]) => {
        let newName = courseName.replace(/ /g, '&');

        const courseDiv = document.createElement('div');
        courseDiv.classList.add('course-div', 'style');

        const infoRow = document.createElement('div');
        const courseText = document.createElement('p');
        courseText.textContent = courseName;

        const scoreText = document.createElement('p');
        scoreText.textContent = `Current Score: ${courseScore}`;

        // infoRow.appendChild(topicHead);
        infoRow.appendChild(courseText);
        infoRow.appendChild(scoreText);

        const actionRow = document.createElement('div');
        const openCourse = document.createElement('a');
        openCourse.textContent = 'View Course';
        openCourse.classList.add('style', 'btn');
        openCourse.href = `/profile/study/${newName}`;

        const openExam = document.createElement('a');
        openExam.textContent = 'View Exam';
        openExam.classList.add('style', 'btn');
        openExam.href = `/profile/exam/${newName}`;

        actionRow.appendChild(openCourse);
        actionRow.appendChild(openExam);

        courseDiv.appendChild(infoRow);
        courseDiv.appendChild(actionRow);

        div.appendChild(courseDiv);
    });

    // document.getElementById('div-section').appendChild(div);
    document.getElementById('body').appendChild(div);
}

export function studentDivs() {
    fetch('/get-info')
        .then(response => response.json())
        .then(data => {
            const dataDetails = data.details;
            createPersonalInfoDiv(dataDetails);
            createFinishedCoursesDiv(dataDetails)
            createInProgressDivs(dataDetails)
        });
}
