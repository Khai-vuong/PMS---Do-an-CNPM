// Homepage version made by V.Q.Khai
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

const Homepage = () => {
  const navigate = useNavigate();

  const routeToLogin = () => {
    navigate("auth/login", { replace: true });
  };

  const routeToSignup = () => {
    navigate("auth/signup", { replace: true });
  };

  const routeToCreateProject = () => {
    navigate("/create-project", { replace: true }); // Đường dẫn đã được chỉnh sửa
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <img src="" alt="ICON" />
          <div className="buttons">
            <button className="login-bt" onClick={routeToLogin}>
              Login
            </button>
            <button className="signup-bt" onClick={routeToSignup}>
              Sign Up
            </button>
          </div>
        </div>

        <div className="body">
          <h1 className="title">Project Management System</h1>
          <table>
            <thead>
              <tr>
                <th>MSSV</th>
                <th>Họ và tên</th>
                <th>Công việc</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2211562</td>
                <td>Vương Quang Khải</td>
                <td>Team leader / PM</td>
              </tr>
              <tr>
                <td>2213316</td>
                <td>Lê Văn Thoại</td>
                <td>Frontend dev</td>
              </tr>
              <tr>
                <td>2113786</td>
                <td>Dương Trọng Khôi</td>
                <td>Frontend dev</td>
              </tr>
              <tr>
                <td>2212935</td>
                <td>Đoàn Ngọc Hoàng Sơn</td>
                <td>Backend dev</td>
              </tr>
              <tr>
                <td>2213772</td>
                <td>Lê Đức Anh Tuấn</td>
                <td>Backend dev</td>
              </tr>
            </tbody>
          </table>
          <button className="create-project-bt" onClick={routeToCreateProject}>
            Go to Create Project
          </button>
        </div>

        <div className="quote">
          <p>Coded with love and depression</p>
        </div>
      </div>
    </>
  );
};

export default Homepage;
