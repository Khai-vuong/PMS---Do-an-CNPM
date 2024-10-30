import "./Projectlist.css";
import axios from "axios";
import React, { useEffect, useState} from "react";


const Projectlist = () => {

  const[projects, setProjects] = useState([]);
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
            <tr>
              <td>Adolf</td>
              <td>Leader</td>
              <td>xx</td>
              <td>xx</td>
            </tr>
            <tr>
              <td>Hitler</td>
              <td>Member</td>
              <td>xx</td>
              <td>xx</td>
            </tr>
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
