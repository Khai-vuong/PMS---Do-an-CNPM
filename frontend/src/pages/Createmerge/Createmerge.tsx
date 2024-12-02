import React, { useState } from "react";
import axios from "axios";
import "./Createamerge.css";
import Header from "../../components/Header/Header";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const CreateMergePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [taskName, setTaskName] = useState("");
  const [comment, setComment] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token") || "";
    const tid = searchParams.get('tid');
    const url = `http://localhost:4000/mr/create?tid=${tid}`;

    if (!token) {
      alert("You must be logged in to submit the request.");
      return;
    }


    const formData = new FormData();
    formData.append("taskName", taskName);
    formData.append("comment", comment);
    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });


    try {
      // console.log("form data: " + JSON.stringify(formData));

      console.log("FormData content:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }


      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Success:", response.data);
      alert("Merge request submitted successfully!");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message || "An error occurred");
      } else {
        setError("An unexpected error occurred.");
      }
      console.error("Error:", err);
    }
  };

  return (
    <>
      <Header inforName="Dương Trọng Khôi" />
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
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="input-field"
            required
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
            <div className="file-icons"></div>
          </div>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </>
  );
};

export default CreateMergePage;
