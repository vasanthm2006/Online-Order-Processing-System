import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


const Navbar = () => {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const onSearch = (e) => {
    e.preventDefault();
    // quick client-side search: redirect to home and set query via url (simple)
    if (!q) return;
    navigate(`/?q=${encodeURIComponent(q)}`);
  };

  return (
    <nav className="navbar">
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <h1 style={{ margin: 0 }}>Online Order System</h1>
        <form onSubmit={onSearch} style={{ display: "flex", alignItems: "center" }}>
          <input
            aria-label="Search orders"
            className="form-input"
            placeholder="Search orders..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{ minWidth: 220 }}
          />
        </form>
      </div>

      <div className="nav-right">
        <Link to="/">Orders</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/suppliers">Suppliers</Link>
        <Link to="/returns">Returns</Link>
        <Link to="/analytics">Analytics</Link>
        <Link to="/create" className="create">Create Order</Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="avatar" title="Admin">
            <span className="avatar-initial">A</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
