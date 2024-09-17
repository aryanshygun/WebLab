import React, { useState } from "react";

function App() {
  // State for holding tasks
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  // Add new task
  const addTask = () => {
    if (task !== "") {
      setTasks([...tasks, { text: task }]);
      setTask(""); // Clear the input
    }
  };

  // Delete task
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, idx) => idx !== index);
    setTasks(newTasks);
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <div className="task-input">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="task-list">
        {tasks.map((item, index) => (
          <div key={index} className="task">
            <span>{item.text}</span>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
