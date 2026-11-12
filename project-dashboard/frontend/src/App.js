import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [error, setError] = useState("");

  const getTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE}/tasks`);
      setTasks(response.data);
      setError("");
    } catch (err) {
      setError("Unable to connect to backend server on port 5000.");
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addTask = async () => {
    if (taskName.trim() === "") {
      alert("Please enter a task");
      return;
    }

    try {
      await axios.post(`${API_BASE}/tasks`, {
        name: taskName.trim()
      });
      setTaskName("");
      getTasks();
    } catch (err) {
      setError("Failed to add task.");
    }
  };

  const changeStatus = async (id, status) => {
    try {
      await axios.put(`${API_BASE}/tasks/${id}`, { status });
      getTasks();
    } catch (err) {
      setError("Failed to update task status.");
    }
  };

  return (
    <div className="container">
      <h1>Project Management Dashboard</h1>

      <div className="add-task">
        <input
          type="text"
          placeholder="Enter new task"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
        />
        <button type="button" onClick={addTask}>
          Add Task
        </button>
      </div>

      {error && <p className="error-banner">{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Status</th>
            <th>Change Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="3" className="empty-row">
                No tasks added yet.
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.name}</td>
                <td>{task.status}</td>
                <td>
                  <select
                    value={task.status}
                    onChange={(e) => changeStatus(task._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;

