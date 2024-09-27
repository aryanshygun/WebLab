document.addEventListener('DOMContentLoaded', function () {
    const taskNameInput = document.getElementById('task-name');
    const taskDateInput = document.getElementById('task-date');
    const taskPriorityInput = document.getElementById('task-priority');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage on page load
    let tasks = JSON.parse(localStorage.getItem('tasks')) || {};
    renderTasks();

    // Add task on button click
    addTaskBtn.addEventListener('click', addTask);

    function addTask() {
        const taskName = taskNameInput.value.trim();
        const taskDate = taskDateInput.value.trim();
        const taskPriority = taskPriorityInput.value.trim();

        if (taskName !== '' && taskDate !== '' && taskPriority !== '') {
            const taskId = Date.now().toString();  // Use current timestamp as unique key
            tasks[taskId] = {
                name: taskName,
                date: taskDate,
                priority: taskPriority
            };
            updateLocalStorage();
            renderTasks();
            clearInputs();  // Clear the input fields after adding
        }
    }

    function renderTasks() {
        taskList.innerHTML = ''; // Clear the current list
        for (let taskId in tasks) {
            const li = document.createElement('li');
            li.innerHTML = `<strong>Name:</strong> ${tasks[taskId].name}<br>
                            <strong>Date:</strong> ${tasks[taskId].date}<br>
                            <strong>Priority:</strong> ${tasks[taskId].priority}`;
            taskList.appendChild(li);
        }
    }

    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function clearInputs() {
        taskNameInput.value = '';
        taskDateInput.value = '';
        taskPriorityInput.value = '';
    }
});
