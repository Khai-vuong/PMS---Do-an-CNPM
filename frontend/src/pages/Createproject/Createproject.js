import React, { useState } from "react";
import jwt from "jsonwebtoken";
import "./Createproject.css";

const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const [model, setModel] = useState("Waterfall");
  const [description, setDescription] = useState("");
  const [modelImage, setModelImage] = useState(
    "/src/pages/Createproject/waterfall.png"
  );
  const SECRET_KEY = "your_secret_key";

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectData = {
      projectName,
      model,
      description,
    };

    const token = jwt.sign(projectData, SECRET_KEY);

    localStorage.setItem("projectToken", token);

    console.log("Project data saved to local storage as JWT:", token);
  };

  const handleModelChange = (selectedModel) => {
    setModel(selectedModel);
    setModelImage(
      selectedModel === "Waterfall"
        ? "/src/pages/Createproject/waterfall.png"
        : "/src/pages/Createproject/scrum.png"
    );
  };

  return (
    <div className="create-project-page">
      <header className="header">
        <img src="path/to/logo.png" alt="Logo" className="logo" />
        <div className="user-info">
          <div className="profile-pic">
            <img src="/src/pages/Createproject/image.png" alt="User Pic" />
          </div>
          <span className="username">Nguyen Van A</span>
        </div>
      </header>

      <h2>Create Project Page</h2>

      <form onSubmit={handleSubmit} className="project-form">
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
            onClick={() => handleModelChange("Waterfall")}
            className={model === "Waterfall" ? "active" : ""}
          >
            Waterfall
          </button>
          <button
            type="button"
            onClick={() => handleModelChange("Scrum")}
            className={model === "Scrum" ? "active" : ""}
          >
            Scrum
          </button>
        </div>
        <div className="model-illustration">
          <img src={modelImage} alt={`${model} Model`} />
          <p>{model} Model in Software Engineering</p>
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
