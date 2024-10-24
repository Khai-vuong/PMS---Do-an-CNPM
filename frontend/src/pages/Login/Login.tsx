import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://example.com/api/login", {
        username,
        password,
      });

      console.log("Login successful:", response.data);

      localStorage.setItem("token", response.data.token);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message || "Đăng nhập thất bại");
      } else {
        setError("Đã có lỗi xảy ra");
      }
      console.error("Error:", err);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign in</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Hiển thị lỗi nếu có */}
      <div className="links">
        <a href="#">
          <u>Forgot password?</u>
        </a>
        <a href="#">
          <u>Do not have an account? Sign up</u>
        </a>
      </div>
    </div>
  );
};

export default Login;
