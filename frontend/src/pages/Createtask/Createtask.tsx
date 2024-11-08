import React, { useState } from "react";
import "./Createtask.css";

const CreateTask: React.FC = () => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      taskName,
      description,
      assignee,
      dueDate,
    });
  };

  return (
    <div className="create-task-page">
      <header className="header">
        <img src="path/to/logo.png" alt="Logo" className="logo" />
        <div className="user-info">
          <img
            src="/src/pages/Createproject/image.png"
            alt="User"
            className="profile-pic"
          />
          <span className="username">Nguyen Van A</span>
        </div>
      </header>

      <h2>Create Task Page</h2>

      <form onSubmit={handleSubmit} className="task-form">
        <label>Task name</label>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter task name"
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
        ></textarea>

        <label>Assignee</label>
        <input
          type="text"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          placeholder="Enter assignee name"
        />

        <label>Due date (Optional)</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button type="submit" className="submit-btn">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
