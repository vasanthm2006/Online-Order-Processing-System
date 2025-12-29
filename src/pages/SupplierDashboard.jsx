import React from "react";
import { useAppState } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const SupplierDashboard = () => {
  const { suppliers } = useAppState();
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="page-title">Supplier Dashboard</h2>
      <p>Manage suppliers and purchase orders.</p>

      <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
        {suppliers.map((s) => (
          <div key={s.id} className="card">
            <h3 style={{ marginBottom: 6 }}>{s.name}</h3>
            <p>Contact: {s.contact}</p>
            <div style={{ marginTop: 10 }}>
              <button className="btn btn-ghost" onClick={() => navigate(`/?supplier=${s.id}`)}>View Orders</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplierDashboard;
