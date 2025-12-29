import React from "react";
import { useAppState } from "../context/AppContext";

const AnalyticsDashboard = () => {
  const { orders, products } = useAppState();

  const totalSales = orders.reduce((s, o) => s + (o.total || 0), 0);
  const ordersCount = orders.length;
  const lowStockCount = products.filter((p) => p.stock <= p.reorderLevel).length;

  return (
    <div>
      <h2 className="page-title">Analytics Dashboard</h2>
      <p>Quick metrics and reports</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))", gap: 14, marginTop: 18 }}>
        <div className="card">
          <h4>Total Sales</h4>
          <p style={{ fontSize: 20, fontWeight: 700 }}>₹{totalSales}</p>
        </div>

        <div className="card">
          <h4>Orders</h4>
          <p style={{ fontSize: 20, fontWeight: 700 }}>{ordersCount}</p>
        </div>

        <div className="card">
          <h4>Low Stock Items</h4>
          <p style={{ fontSize: 20, fontWeight: 700 }}>{lowStockCount}</p>
        </div>
      </div>

      <section style={{ marginTop: 18 }}>
        <h3>Recent Orders</h3>
        <div>
          {orders.map((o) => (
            <div key={o.id} style={{ padding: 12 }}>
              <strong>#{o.id}</strong> — {o.customer} — ₹{o.total} — <span className={`badge ${o.payment.toLowerCase()}`}>{o.payment}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AnalyticsDashboard;
