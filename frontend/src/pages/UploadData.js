import React from "react";
import ExcelUpload from "../components/ExcelUpload";
import { FaFileExcel } from "react-icons/fa";
import "../App.css";

const UploadData = () => {
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
          📤 Upload Sales Data
        </h2>
        <p style={{ margin: 0, opacity: 0.9, fontSize: "14px" }}>
          Import historical sales data to enhance analytics and reporting
        </p>
      </div>

      {/* MAIN UPLOAD CARD */}
      <div className="card" style={{ maxWidth: "700px", margin: "0 auto" }}>
        {/* ICON SECTION */}
        <div
          style={{
            width: "80px",
            height: "80px",
            margin: "0 auto 20px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #217346, #2d9d5f)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 15px rgba(33, 115, 70, 0.3)"
          }}
        >
          <FaFileExcel size={40} color="#fff" />
        </div>

        <h3 style={{ textAlign: "center", margin: "0 0 10px 0", color: "#1976d2" }}>
          Excel File Upload
        </h3>
        <p style={{ textAlign: "center", color: "#666", fontSize: "14px", marginBottom: "25px" }}>
          Import sales records from Excel spreadsheets for comprehensive data analysis
        </p>

        {/* INFO SECTION */}
        <div
          style={{
            background: "linear-gradient(135deg, #e3f2fd, #f5f9ff)",
            padding: "20px",
            borderRadius: "10px",
            border: "2px solid #1976d220",
            marginBottom: "25px"
          }}
        >
          <h4 style={{ margin: "0 0 12px 0", color: "#1976d2", fontSize: "15px" }}>
            📋 File Requirements
          </h4>
          
          <div style={{ marginBottom: "12px" }}>
            <p style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#555" }}>
              <strong>Accepted Format:</strong> <span style={{ color: "#217346", fontWeight: "600" }}>.xlsx</span> (Excel 2007 and later)
            </p>
          </div>

          <div>
            <p style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#555", fontWeight: "600" }}>
              Required Columns:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              <div
                style={{
                  background: "#fff",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  border: "1px solid #e0e0e0"
                }}
              >
                ✓ Product Name
              </div>
              <div
                style={{
                  background: "#fff",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  border: "1px solid #e0e0e0"
                }}
              >
                ✓ Brand
              </div>
              <div
                style={{
                  background: "#fff",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  border: "1px solid #e0e0e0"
                }}
              >
                ✓ Quantity Sold
              </div>
              <div
                style={{
                  background: "#fff",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  border: "1px solid #e0e0e0"
                }}
              >
                ✓ Date
              </div>
            </div>
          </div>
        </div>

        {/* TIPS SECTION */}
        <div
          style={{
            background: "#fff8e1",
            padding: "15px",
            borderRadius: "8px",
            border: "2px solid #fdd83520",
            marginBottom: "25px"
          }}
        >
          <p style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#f57c00", fontWeight: "600" }}>
            💡 Pro Tips:
          </p>
          <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13px", color: "#666" }}>
            <li style={{ marginBottom: "4px" }}>Ensure all dates are in YYYY-MM-DD format</li>
            <li style={{ marginBottom: "4px" }}>Remove any blank rows or columns</li>
            <li style={{ marginBottom: "4px" }}>Column names should match exactly as listed above</li>
          </ul>
        </div>

        {/* UPLOAD COMPONENT */}
        <ExcelUpload />
      </div>
    </>
  );
};

export default UploadData;