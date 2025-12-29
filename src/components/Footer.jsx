import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h4>Online Order System</h4>
          <p className="muted">Centralized order, inventory and supplier management for e-commerce.</p>
        </div>

        <div>
          <h5>Quick Links</h5>
          <ul>
            <li><Link to="/">Orders</Link></li>
            <li><Link to="/inventory">Inventory</Link></li>
            <li><Link to="/suppliers">Suppliers</Link></li>
            <li><Link to="/analytics">Analytics</Link></li>
          </ul>
        </div>

        <div>
          <h5>Contact</h5>
          <p className="muted"><a href="mailto:support@ordersys.in">support@ordersys.in</a></p>
          <p className="muted"><a href="tel:+919876543210">+91 98765 43210</a></p>
        </div>
      </div>

      <div style={{ textAlign: 'center', paddingTop: 14, color: '#94a3b8' }}>
        <small>© {new Date().getFullYear()} Online Order System</small>
      </div>
    </footer>
  );
};

export default Footer;
