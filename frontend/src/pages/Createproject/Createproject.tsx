import React, { useState } from "react";
import "./Createproject.css";

const CreateProject: React.FC = () => {
  const [projectName, setProjectName] = useState("");
  const [model, setModel] = useState("Waterfall");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    // Handle form submission
    console.log({
      projectName,
      model,
      description,
    });
  };

  return (
    <div className="create-project-page">
      <header className="header">
        <img src="path/to/logo.png" alt="Logo" className="logo" />
        <div className="user-info">
          <div className="profile-pic">[User Pic]</div>
          <span className="username">LE VAN BACH KHOA</span>
        </div>
      </header>

      <h2>Create Project Page</h2>

      <form onSubmit={handleSubmit}>
        <label>Project Name</label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter project name"
        />

        <label>Model</label>
        <div className="model-options">
          <button
            type="button"
            onClick={() => setModel("Waterfall")}
            className={model === "Waterfall" ? "active" : ""}
          >
            Waterfall
          </button>
          <button
            type="button"
            onClick={() => setModel("Scrum")}
            className={model === "Scrum" ? "active" : ""}
          >
            Scrum
          </button>
        </div>

        <div className="model-illustration">
          <img src="./Createproject.pnj" alt="Waterfall Model" />
          <p>Waterfall Model in Software Engineering</p>
        </div>

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter project description"
        ></textarea>

        <button type="submit" className="submit-btn">
          Create Project
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
