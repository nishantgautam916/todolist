import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [timeValue, setTimeValue] = useState('');

 
  const handleAddTask = () => {
    if (inputValue.trim() !== '' && timeValue !== '') {
      const taskTime = new Date();
      const [hours, minutes] = timeValue.split(':');
      taskTime.setHours(hours);
      taskTime.setMinutes(minutes);

      setTasks([...tasks, { id: Date.now(), text: inputValue, time: taskTime, completed: false }]);
      setInputValue('');
      setTimeValue('');
    }
  };

  
  const handleCompleteTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

 
  useEffect(() => {
    const checkAlarms = () => {
      const now = new Date();
      tasks.forEach((task) => {
        if (!task.completed && task.time - now <= 0) {
          alert(`Task "${task.text}" is due!`);
          task.completed = true;
        }
      });
    };

    const interval = setInterval(checkAlarms, 1000); 
    return () => clearInterval(interval);
  }, [tasks]);

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
          <input
            type="time"
            value={timeValue}
            onChange={(e) => setTimeValue(e.target.value)}
            placeholder="Set time"
          />
          <button onClick={handleAddTask}>Add</button>
        </div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              <span>{task.text}</span>
              <span>{task.time.toLocaleTimeString()}</span>
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
