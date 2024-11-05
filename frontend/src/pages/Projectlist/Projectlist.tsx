import "./Projectlist.css";
import axios from "axios";
import React, { useEffect, useState} from "react";
import {ProjectsListDto} from "../../../DTOs/project-list.dto"
const Projectlist = () => {
  const [projects, setProjects] = useState<ProjectsListDto[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:5173/projectlist") 
      .then((response) => {
        setProjects(response.data); 
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });
  }, []);

    const handleProjectClick = (id: number | undefined) => {
    if (id !== undefined) {
      axios
        .get(`http://localhost:5173/project/${id}`)
        .then((response) => {
          console.log("Project details:", response.data);
        })
        .catch((error) => {
          console.error("Lỗi khi lấy thông tin dự án:", error);
        });
    }
  };

  

  return (
    <>
      <div className="container-list">
        <div className="title">
          <h1>Project List</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Model</th>
              <th>Phase</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center' }}>
                  Không có dự án nào
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id} onClick={() => handleProjectClick(project.id)}>
                  <td>{project.name}</td>
                  <td>{project.role}</td>
                  <td>{project.model}</td>
                  <td>{project.phase}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="create-button">
          <a href="">Create Project</a>
        </div>
      </div>
    </>
  );
};
export default Projectlist;
