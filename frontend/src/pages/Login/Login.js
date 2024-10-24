import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(""); // Xóa lỗi trước khi gửi yêu cầu

    try {
      const response = await axios.post("http://localhost:4000/auth/signup", {
        username,
        password,
      });

      // Lưu token vào localStorage (ví dụ)
      localStorage.setItem("token", response.data.token);

      // Điều hướng đến trang chủ
      navigate("/");
    } catch (error) {
      setError("Tên đăng nhập hoặc mật khẩu không đúng.");
    }
  };

  return (
    <div>
      <h2>Đăng nhập</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
};

export default Login;
