import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple auth - hardcoded credentials for demo
    if (credentials.username === "admin" && credentials.password === "admin123") {
      localStorage.setItem("adminLoggedIn", "true");
      navigate("/dashboard");
    } else {
      setError("Invalid credentials. Try admin / admin123");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="login-card">
        <h1>Admin Login</h1>
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="login-btn">Sign In</button>
        </form>

        <p className="demo-credentials">
          Demo: username: <strong>admin</strong> | password: <strong>admin123</strong>
        </p>
      </div>
    </div>
  );
}
