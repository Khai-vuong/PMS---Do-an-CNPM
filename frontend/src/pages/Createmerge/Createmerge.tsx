import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Createmerge.css";

const Createmerge: React.FC = () => {
  const [taskName, setTaskName] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const pid = searchParams.get("pid");
  const tid = searchParams.get("tid");

  useEffect(() => {
    const fetchTaskName = async () => {
      if (tid) {
        try {
          const response = await axios.get(
            `http://localhost:4000/tasks/name/?tid=${tid}`
          );
          setTaskName(response.data.name);
        } catch (err) {
          setError("Failed to fetch task name.");
        }
      } else {
        setError("Task ID (tid) is missing.");
      }
    };

    fetchTaskName();
  }, [tid]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token") || "";
    const url = "http://localhost:4000/api/merge";

    if (!token) {
      alert("You must be logged in to submit the request.");
      return;
    }

    const formData = new FormData();
    if (taskName) formData.append("taskName", taskName);
    formData.append("comment", comment);
    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    try {
      await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Merge request submitted successfully!");
      navigate("/lobby");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message || "An error occurred");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  const handleBack = () => {
    navigate("/lobby");
  };

  return (
    <div className="createmerge-container">
      <header className="createmerge-header">
        <img src="path_to_logo" alt="logo" className="logo" />
        <div className="user-info">
          <img
            src="/src/pages/Createproject/image.png"
            alt="user"
            className="user-image"
          />
          <span className="username">user</span>
        </div>
      </header>
      <h1 className="createmerge-title">Create Merge Request</h1>
      <form onSubmit={handleSubmit} className="createmerge-form">
        <label>Task name</label>
        <input
          type="text"
          value={taskName || ""}
          readOnly
          className="input-field"
        />

        <label>Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="input-field"
        />

        <label>Attach files</label>
        <div className="file-upload">
          <input type="file" multiple onChange={handleFileChange} />
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
        <button
          type="button"
          className="back-button"
          onClick={handleBack}
          style={{ marginLeft: "10px" }}
        >
          Back
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Createmerge;
