import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FaShoppingCart } from "react-icons/fa"; // 🛒 ICON
import "../App.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = !!localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const isActive = (path) =>
    location.pathname === path ? "nav-link active" : "nav-link";

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast.info(!darkMode ? "Dark mode enabled" : "Light mode enabled");
  };

  const handleLogout = () => {
    toast.info("Logged out successfully");
    localStorage.clear();
    navigate("/login");
  };

  if (!isLoggedIn) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2
          className="logo"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <FaShoppingCart size={22} />
          Supermarket Analytics System
        </h2>
      </div>
    </nav>
  );
}


  return (
    <nav className="navbar">
      {/* 🔹 LEFT SIDE */}
      <div className="navbar-left">
        <h2
          className="logo"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <FaShoppingCart size={22} />
          Supermarket Analytics System
        </h2>

        <Link to="/" className={isActive("/")}>Overview</Link>

        {/* ADMIN ONLY */}
        {role === "admin" && (
          <Link to="/products" className={isActive("/products")}>
            Products
          </Link>
        )}

        {/* ADMIN + STAFF */}
        <Link to="/sales" className={isActive("/sales")}>Sales</Link>

        {/* ADMIN ONLY */}
        {role === "admin" && (
          <Link to="/analytics" className={isActive("/analytics")}>
            Analytics
          </Link>
        )}

        {/* ADMIN ONLY */}
        {role === "admin" && (
          <Link to="/upload" className={isActive("/upload")}>
            Upload Data
          </Link>
        )}

        {/* 🔑 ADMIN ONLY – CREATE USER */}
        {role === "admin" && (
          <Link to="/signup" className={isActive("/signup")}>
            Create User
          </Link>
        )}
      </div>

      {/* 🔹 RIGHT SIDE */}
      <div className="navbar-right">
        <button
          onClick={toggleDarkMode}
          style={{
            marginRight: "10px",
            background: "transparent",
            border: "none",
            fontSize: "18px",
            cursor: "pointer"
          }}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <span className="user-badge">
          {name} ({role})
        </span>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
