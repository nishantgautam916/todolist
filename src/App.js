import React, { useState } from 'react';
import './App.css';

function App() {
  // State variable to store tasks
  const [tasks, setTasks] = useState([]);
  // State variable to store the input value
  const [inputValue, setInputValue] = useState('');

  // Function to handle adding a new task
  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  // Function to handle marking a task as completed
  const handleCompleteTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Function to handle deleting a task
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do List</h1>
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new task"
          />
          <button onClick={handleAddTask}>Add</button>
        </div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              <span>{task.text}</span>
              <div>
                <button onClick={() => handleCompleteTask(task.id)}>
                  {task.completed ? 'Undo' : 'Done'}
                </button>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
