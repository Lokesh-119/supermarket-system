import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import Login from "./pages/Login";
import DashboardOverview from "./pages/DashboardOverview";
import ProductsPage from "./pages/ProductsPage";
import SalesPage from "./pages/SalesPage";
import UploadData from "./pages/UploadData";
import Analytics from "./components/Analytics";
import { getProducts, getSalesAnalytics } from "./services/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Signup from "./pages/Signup";


function App() {
  const [products, setProducts] = useState([]);
  const [analytics, setAnalytics] = useState([]);

  const fetchProducts = () => {
    getProducts().then((res) => setProducts(res.data));
  };

  const fetchAnalytics = () => {
    getSalesAnalytics().then((res) => setAnalytics(res.data));
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchProducts();
      fetchAnalytics();
    }
  }, []);

  return (
    <Router>
      <Navbar />

      <div className="container">
        <Routes>
          {/* 🔐 LOGIN */}
          <Route path="/login" element={<Login />} />

          {/* 🏠 OVERVIEW (ADMIN + STAFF) */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={["admin", "staff"]}>
                  <DashboardOverview
                    products={products}
                    analytics={analytics}
                  />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route
  path="/signup"
  element={
    <ProtectedRoute>
      <RoleRoute allowedRoles={["admin"]}>
        <Signup />
      </RoleRoute>
    </ProtectedRoute>
  }
/>


          {/* 📤 UPLOAD DATA (ADMIN ONLY) */}
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={["admin"]}>
                  <UploadData />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          {/* 📦 PRODUCTS (ADMIN ONLY) */}
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={["admin"]}>
                  <ProductsPage
                    products={products}
                    fetchProducts={fetchProducts}
                  />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          {/* 💰 SALES (ADMIN + STAFF) */}
          <Route
            path="/sales"
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={["admin", "staff"]}>
                  <SalesPage
                    onSaleAdded={() => {
                      fetchProducts();
                      fetchAnalytics();
                    }}
                  />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          {/* 📊 ANALYTICS (ADMIN ONLY) */}
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={["admin"]}>
                  <Analytics />
                </RoleRoute>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      {/* 🔔 TOASTS */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </Router>
  );
}

export default App;
