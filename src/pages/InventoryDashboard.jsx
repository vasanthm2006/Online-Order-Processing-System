import React, { useState } from "react";
import { useAppState, useAppDispatch } from "../context/AppContext";

import InventoryTable from "../components/InventoryTable";

const InventoryDashboard = () => {
  const { products } = useAppState();
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [stock, setStock] = useState("");
  const [reorderLevel, setReorderLevel] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    setMsg("");
    if (!name.trim()) return setMsg("Name is required");
    if (!sku.trim()) return setMsg("SKU is required");

    const parsedStock = stock === "" ? 0 : parseInt(stock, 10);
    const parsedReorder = reorderLevel === "" ? 0 : parseInt(reorderLevel, 10);
    const parsedPrice = price === "" ? 0 : parseFloat(price);

    if (isNaN(parsedStock) || parsedStock < 0) return setMsg("Invalid stock value");
    if (isNaN(parsedReorder) || parsedReorder < 0) return setMsg("Invalid reorder level");
    if (isNaN(parsedPrice) || parsedPrice < 0) return setMsg("Invalid price");

    const nextId = products.reduce((m, p) => Math.max(m, p.id), 100) + 1;
    const newProduct = { id: nextId, name: name.trim(), sku: sku.trim(), stock: parsedStock, reorderLevel: parsedReorder, price: parsedPrice };

    dispatch({ type: "ADD_PRODUCT", payload: newProduct });

    setName(""); setSku(""); setStock(""); setReorderLevel(""); setPrice("");
    setMsg("Product added");
    setTimeout(() => setMsg(""), 1600);
  };

  return (
    <div>
      <h2 className="page-title">Inventory Dashboard</h2>
      <p>Real-time stock levels and low-stock alerts.</p>

      <div style={{ marginTop: 18 }}>
        <div className="card" style={{ marginBottom: 14 }}>
          <h4 style={{ marginTop: 0 }}>Add New Product</h4>
          <form className="form" onSubmit={handleAdd} style={{ gap: 8 }}>
            <div className="product-row">
              <div className="product-field">
                <label>Product name</label>
                <input placeholder="e.g., Wireless Headphones" aria-label="Product name" className="form-input" value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="product-field">
                <label>SKU</label>
                <input placeholder="e.g., WH-101" aria-label="SKU" className="form-input" value={sku} onChange={(e) => setSku(e.target.value)} />
              </div>

              <div className="product-field">
                <label>Stock (units)</label>
                <input type="number" min={0} aria-label="Stock" className="form-input small-input" value={stock} onChange={(e) => setStock(e.target.value)} />
              </div>

              <div className="product-field">
                <label>Reorder level</label>
                <input type="number" min={0} aria-label="Reorder level" className="form-input small-input" value={reorderLevel} onChange={(e) => setReorderLevel(e.target.value)} />
              </div>

              <div className="product-field">
                <label>Price (₹)</label>
                <input type="number" min={0} step="0.01" aria-label="Price" className="form-input small-input" value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>

              <div style={{ display: 'flex', alignItems: 'end' }}>
                <button className="btn btn-primary" type="submit">Add Product</button>
              </div>
            </div>
            {msg && <div style={{ color: 'var(--accent)', fontWeight: 700 }}>{msg}</div>}
          </form>
        </div>

        <InventoryTable />
      </div>
    </div>
  );
};

export default InventoryDashboard;
