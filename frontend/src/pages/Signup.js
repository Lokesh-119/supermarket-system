import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { FaUserPlus } from "react-icons/fa";
import "../App.css";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "staff"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/auth/signup", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      toast.success("User created successfully");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
      {/* PAGE HEADER */}
      <div
        style={{
          background: "linear-gradient(135deg, #1976d2, #1565c0)",
          color: "#fff",
          padding: "25px",
          borderRadius: "10px",
          marginBottom: "20px"
        }}
      >
        <h2 style={{ margin: "0 0 8px 0", fontSize: "28px" }}>
          👥 User Management
        </h2>
        <p style={{ margin: 0, opacity: 0.9, fontSize: "14px" }}>
          Create new user accounts for staff and administrators
        </p>
      </div>

      {/* SIGNUP FORM CARD */}
      <div className="card" style={{ maxWidth: "600px", margin: "0 auto" }}>
        {/* ICON SECTION */}
        <div
          style={{
            width: "80px",
            height: "80px",
            margin: "0 auto 20px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #1976d2, #42a5f5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 15px rgba(25, 118, 210, 0.4)"
          }}
        >
          <FaUserPlus size={35} color="#fff" />
        </div>

        <h3 style={{ textAlign: "center", margin: "0 0 10px 0", color: "#1976d2", fontSize: "22px" }}>
          Create New User
        </h3>
        <p style={{ textAlign: "center", color: "#666", fontSize: "14px", marginBottom: "30px" }}>
          Add staff or admin access to the inventory management system
        </p>

        {/* INFO BOX */}
        <div
          style={{
            background: "linear-gradient(135deg, #e3f2fd, #f5f9ff)",
            padding: "15px",
            borderRadius: "8px",
            border: "2px solid #1976d220",
            marginBottom: "25px"
          }}
        >
          <p style={{ margin: "0 0 8px 0", fontSize: "13px", color: "#1976d2", fontWeight: "600" }}>
            💡 Quick Info:
          </p>
          <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13px", color: "#666" }}>
            <li style={{ marginBottom: "4px" }}>
              <strong>Staff:</strong> Can add sales and view transactions
            </li>
            <li>
              <strong>Admin:</strong> Full access to inventory, analytics, and management
            </li>
          </ul>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "18px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "500", marginBottom: "6px", color: "#555" }}>
              Full Name
            </label>
            <input
              name="name"
              placeholder="Enter full name"
              value={form.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "14px",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "500", marginBottom: "6px", color: "#555" }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="user@example.com"
              value={form.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "14px",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "500", marginBottom: "6px", color: "#555" }}>
              Temporary Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a secure password"
              value={form.password}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "14px",
                boxSizing: "border-box"
              }}
            />
            <p style={{ fontSize: "12px", color: "#888", margin: "5px 0 0 0" }}>
              User can change this password after first login
            </p>
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "500", marginBottom: "6px", color: "#555" }}>
              User Role
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "14px",
                boxSizing: "border-box",
                cursor: "pointer"
              }}
            >
              <option value="staff">Staff - Sales Entry Access</option>
              <option value="admin">Admin - Full System Access</option>
            </select>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              background: "linear-gradient(135deg, #1976d2, #42a5f5)",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 10px rgba(25, 118, 210, 0.3)"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 15px rgba(25, 118, 210, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 10px rgba(25, 118, 210, 0.3)";
            }}
          >
            ✓ Create User Account
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "12px",
              background: "transparent",
              color: "#666",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#f5f5f5";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;