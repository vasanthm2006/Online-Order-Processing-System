import React from "react";
import { Link } from "react-router-dom";
import { useAppState } from "../context/AppContext";

const Hero = () => {
  const { orders, products } = useAppState();
  const totalSales = orders.reduce((s, o) => s + (o.total || 0), 0);

  return (
    <section className="hero">
      <div className="container-hero">
        <div>
          <h1 className="hero-title">Smart Order Processing</h1>
          <p className="hero-sub">Automate order lifecycle, track inventory, and manage suppliers — all from a single dashboard.</p>
          <div style={{ marginTop: 16 }}>
            <Link to="/create" className="btn btn-primary">Create Order</Link>
            <Link to="/inventory" className="btn" style={{ marginLeft: 10 }}>Inventory</Link>
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <div className="stat-value">{orders.length}</div>
            <div className="stat-label">Orders</div>
          </div>

          <div className="stat">
            <div className="stat-value">₹{totalSales}</div>
            <div className="stat-label">Total Sales</div>
          </div>

          <div className="stat">
            <div className="stat-value">{products.length}</div>
            <div className="stat-label">Products</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
