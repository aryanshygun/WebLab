// profile-student.js
export function loadStudentProfile() {
    // Code to load the student's profile
    console.log('Loading student profile...');
    // Additional student-related code
}
export function createPersonalInfoDiv() {
    fetch('/get-info')
    .then(response => response.json())
    .then(data => {
        const dataDetails = data.details;
        const form = document.createElement('form');
        form.id = 'personal-div';
        form.classList.add('content-div','style');
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



export function teacherDivs(){
    createPersonalInfoDiv()
    createCreatedCoursesDiv()
    // createNewCourseDiv()
    createCreatedQuestionsDiv()
    // createNewQuestionDiv()
}