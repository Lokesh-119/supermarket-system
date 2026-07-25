import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUserLock } from "react-icons/fa";
import { loginUser } from "../services/auth";
import "../App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("role", res.data.role);

      toast.success("Welcome back!");
      navigate("/");
    } catch {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-glass-card">
        <div className="login-top">
          <div className="login-icon-wrapper">
            <FaUserLock />
          </div>
          <h1>Sign In</h1>
          <p>Smart Supermarket Analytics System</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="login-footer">
          <span>Secure • Role-Based • Analytics-Driven</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
