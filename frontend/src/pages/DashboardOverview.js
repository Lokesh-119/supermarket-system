import React, { useEffect } from "react";
import Insights from "../components/Insights";
import InventoryTable from "../components/InventoryTable";
import { toast } from "react-toastify";

const DashboardOverview = ({ products, analytics }) => {
  const role = localStorage.getItem("role");

  const lowStockItems = products.filter(
    (p) => p.stock <= p.reorderLevel
  );

  // KPI calculations (ADMIN ONLY)
  const sortedByQuantity = [...analytics].sort(
    (a, b) => b.totalQuantitySold - a.totalQuantitySold
  );

  const topProduct = sortedByQuantity[0];
  const leastProduct = sortedByQuantity[sortedByQuantity.length - 1];

  const getProductName = (id) => {
    const p = products.find((x) => x._id === id);
    return p ? `${p.name} (${p.brand})` : "N/A";
  };

  useEffect(() => {
    if (role === "admin" && lowStockItems.length > 0) {
      toast.warn(
        `${lowStockItems.length} product(s) below reorder level`
      );
    }
  }, [products]);

  // KPI Card Component
  const KPICard = ({ icon, title, value, color, subtext }) => (
    <div
      className="card"
      style={{
        flex: 1,
        textAlign: "center",
        background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
        border: `2px solid ${color}20`,
        minWidth: "200px"
      }}
    >
      {/* Icon Badge */}
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "10px",
          background: `${color}15`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 12px auto"
        }}
      >
        <span style={{ fontSize: "24px", color: color }}>{icon}</span>
      </div>

      <h4 style={{ margin: "0 0 8px 0", color: "#666", fontSize: "13px", fontWeight: "500", textTransform: "uppercase", letterSpacing: "0.5px" }}>
        {title}
      </h4>
      <p
        style={{
          fontSize: "28px",
          fontWeight: "700",
          color: color,
          margin: "0 0 8px 0",
          lineHeight: "1.2"
        }}
      >
        {value}
      </p>
      {subtext && (
        <p style={{ fontSize: "12px", color: "#888", margin: "0" }}>
          {subtext}
        </p>
      )}
    </div>
  );

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
          {role === "admin" ? "📊 Admin Dashboard" : "👋 Staff Dashboard"}
        </h2>
        <p style={{ margin: 0, opacity: 0.9, fontSize: "14px" }}>
          {role === "admin"
            ? "Monitor inventory, track sales, and manage your supermarket"
            : "Quick access to sales and transaction management"}
        </p>
      </div>

      {/* KPI SECTION */}
      <div style={{ marginBottom: "25px" }}>
        <h3
          style={{
            marginBottom: "15px",
            color: "#333",
            fontSize: "18px",
            fontWeight: "600"
          }}
        >
          📈 Key Metrics
        </h3>
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap"
          }}
        >
          <KPICard
            icon="▣"
            title="Total Products"
            value={products.length}
            color="#1976d2"
          />

          {/* ADMIN ONLY KPIs */}
          {role === "admin" && (
            <>
              <KPICard
                icon="⚡"
                title="Low Stock Items"
                value={lowStockItems.length}
                color={lowStockItems.length > 0 ? "#f44336" : "#4caf50"}
                subtext={
                  lowStockItems.length > 0
                    ? "Needs attention"
                    : "All stocked well"
                }
              />

              <KPICard
                icon="↗"
                title="Top Selling"
                value={
                  topProduct ? (
                    <span style={{ fontSize: "16px" }}>
                      {getProductName(topProduct._id)}
                    </span>
                  ) : (
                    "N/A"
                  )
                }
                color="#4caf50"
                subtext={
                  topProduct
                    ? `${topProduct.totalQuantitySold} units sold`
                    : ""
                }
              />

              <KPICard
                icon="↘"
                title="Least Selling"
                value={
                  leastProduct ? (
                    <span style={{ fontSize: "16px" }}>
                      {getProductName(leastProduct._id)}
                    </span>
                  ) : (
                    "N/A"
                  )
                }
                color="#ff9800"
                subtext={
                  leastProduct
                    ? `${leastProduct.totalQuantitySold} units sold`
                    : ""
                }
              />
            </>
          )}
        </div>
      </div>

      {/* ADMIN ONLY SECTIONS */}
      {role === "admin" && (
        <>
          {/* Low Stock Alert */}
          {lowStockItems.length > 0 && (
            <div
              className="card"
              style={{
                background: "linear-gradient(135deg, #fff3e0, #ffe0b2)",
                border: "2px solid #ff9800",
                marginBottom: "20px"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "32px" }}>🚨</span>
                <div>
                  <h3 style={{ margin: "0 0 5px 0", color: "#e65100" }}>
                    Low Stock Alert
                  </h3>
                  <p style={{ margin: 0, color: "#f57c00" }}>
                    {lowStockItems.length} product(s) below reorder level. Please restock soon.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Inventory Table Section */}
          <div className="card" style={{ marginBottom: "20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px"
              }}
            >
              <div>
                <h3 style={{ margin: "0 0 5px 0" }}>📋 Inventory Status</h3>
                <p style={{ margin: 0, fontSize: "13px", color: "#666" }}>
                  Monitor and manage stock levels
                </p>
              </div>
            </div>
            <InventoryTable products={products} />
          </div>

          {/* Insights Section */}
          <div className="card">
            <h3 style={{ marginBottom: "15px" }}>💡 Sales Insights</h3>
            <Insights products={products} analytics={analytics} />
          </div>
        </>
      )}

      {/* STAFF VIEW */}
      {role === "staff" && (
        <div
          className="card"
          style={{
            textAlign: "center",
            padding: "40px",
            background: "linear-gradient(135deg, #e3f2fd, #f5f9ff)"
          }}
        >
          <div style={{ fontSize: "64px", marginBottom: "15px" }}>🛒</div>
          <h3 style={{ color: "#1976d2", margin: "10px 0" }}>
            Welcome to Staff Portal
          </h3>
          <p style={{ color: "#555", fontSize: "14px", maxWidth: "500px", margin: "0 auto" }}>
            Use the navigation menu to add sales transactions and view recent activity.
            For inventory management, please contact your administrator.
          </p>
        </div>
      )}
    </>
  );
};

export default DashboardOverview;