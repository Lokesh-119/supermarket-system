import React from "react";

const Insights = ({ products, analytics }) => {
  const lowStockItems = products.filter(
    (p) => p.stock <= p.reorderLevel
  );

  const leastSelling =
    analytics.length > 0
      ? analytics[analytics.length - 1]
      : null;

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Smart Insights</h3>

      {lowStockItems.length > 0 && (
        <p>
          🚨 <strong>{lowStockItems.length}</strong> product(s) need restocking.
        </p>
      )}

      {leastSelling && (
        <p>
          📉 Product with lowest sales quantity needs review.
        </p>
      )}

      {lowStockItems.length === 0 && !leastSelling && (
        <p>✅ Inventory levels are healthy.</p>
      )}
    </div>
  );
};

export default Insights;
