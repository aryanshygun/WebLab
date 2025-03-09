export function createPersonalInfoDiv(dataDetails) {
    const form = document.createElement('form');
    form.id = 'personal-div';
    form.classList.add('content-div');
    form.method = "POST";

    const topDiv = document.createElement('div');
    topDiv.classList.add('style', 'row-div');
    topDiv.innerHTML = `
        <h1> ${dataDetails.username} </h1>
        <h2> ${dataDetails.status}</h2>
    `;
    form.appendChild(topDiv);

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

    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('style', 'row-div', 'btn-row-div');
    buttonDiv.innerHTML = `
        <p id='success-message' style="display: none;">Update Successful!</p>
        <button type='submit' class='style btn'> Update </button>
    `;
    form.appendChild(buttonDiv);

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
    document.getElementById('body').appendChild(form);
}

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
    document.getElementById('body').appendChild(div);
}

function createWalletDiv(dataDetails){
    const mainDiv = document.createElement('div')
    mainDiv.classList.add('content-div')
    mainDiv.id = 'wallet-div'
    mainDiv.style.display = 'none'

    const statusDiv = document.createElement('div')
    statusDiv.classList.add("style")
    const WalletAmount = document.createElement('h1')
    WalletAmount.textContent = dataDetails.wallet

    const chargeDiv = document.createElement('div')

    const inputField = document.createElement('input')
    inputField.classList.add('style', 'input')

    const chargeBtn = document.createElement('button')
    chargeBtn.classList.add('style', 'btn')
    chargeBtn.textContent = 'Charge Account'

    chargeDiv.appendChild(inputField)
    chargeDiv.appendChild(chargeBtn)

    
    statusDiv.appendChild(WalletAmount)
    statusDiv.appendChild(chargeDiv)

    const transactionHistoryDiv = document.createElement('div')

    dataDetails.transaction_history.forEach(record => {
        const recordDiv = document.createElement('div');
        recordDiv.classList.add("transaction-record");

        const actionText = document.createElement('p');
        actionText.textContent = record.action === "charge" ? "Charged" : "Spent";

        const topicText = document.createElement('p');
        topicText.textContent = record.topic ? `Course: ${record.topic}` : "—";

        const amountText = document.createElement('p');
        amountText.textContent = `Amount: ${record.amount} Coins`;

        const timeText = document.createElement('p');
        timeText.textContent = `Time: ${record.time}`;

        // Append details to the record div
        recordDiv.appendChild(actionText);
        recordDiv.appendChild(topicText);
        recordDiv.appendChild(amountText);
        recordDiv.appendChild(timeText);

        // Add the record row to the transaction history div
        transactionHistoryDiv.appendChild(recordDiv);
    });

    mainDiv.appendChild(statusDiv)
    mainDiv.appendChild(transactionHistoryDiv)


    document.getElementById('body').appendChild(mainDiv)

}


export function studentDivs() {
    fetch('/get-info')
        .then(response => response.json())
        .then(data => {
            const dataDetails = data.details;
            createPersonalInfoDiv(dataDetails);
            createFinishedCoursesDiv(dataDetails)
            createInProgressDivs(dataDetails)
            createWalletDiv(dataDetails)
        });
}
