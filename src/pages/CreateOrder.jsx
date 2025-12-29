import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppState } from "../context/AppContext";

const CreateOrder = () => {
  const [customer, setCustomer] = useState("");
  const [orderId, setOrderId] = useState("");
  const [productId, setProductId] = useState("");
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState("");
  const [saveDefault, setSaveDefault] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { products, orders } = useAppState();

  // ensure first product is selected by default
  useEffect(() => {
    if (products.length > 0 && !productId) {
      setProductId(String(products[0].id));
      setPrice(String(products[0].price));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  // Order ID will be entered manually by the user now


  // update unit price when product selection changes
  useEffect(() => {
    const prod = products.find((p) => p.id === Number(productId));
    if (prod) setPrice(String(prod.price));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const saveDefaultPrice = (prodId = null, unitPrice = null) => {
    const id = prodId || Number(productId);
    const priceToSave = unitPrice !== null ? unitPrice : parseFloat(price);
    const prod = products.find((p) => p.id === Number(id));
    if (!prod) return setError("Select a product to save price");
    if (isNaN(priceToSave) || priceToSave < 0) return setError("Invalid price");
    dispatch({ type: "UPDATE_PRODUCT", payload: { id: prod.id, updates: { price: priceToSave } } });
    setSavedMsg("Default price saved");
    setTimeout(() => setSavedMsg(""), 1800);
  };

  const addItem = () => {
    setError("");
    const prod = products.find((p) => p.id === Number(productId));
    if (!prod) return setError("Select a product");
    if (qty < 1) return setError("Quantity must be at least 1");
    if (qty > prod.stock) return setError(`Only ${prod.stock} in stock`);

    const unitPrice = parseFloat(price);
    if (isNaN(unitPrice) || unitPrice < 0) return setError("Invalid price");

    const lineTotal = unitPrice * Number(qty);
    setItems([...items, { productId: prod.id, name: prod.name, sku: prod.sku, qty: Number(qty), price: unitPrice, lineTotal }]);

    // optionally save price as new default for the product
    if (saveDefault) saveDefaultPrice(prod.id, unitPrice);

    setQty(1);
    // reset price to product default for convenience
    setPrice(String(prod.price));
  };

  const removeItem = (index) => setItems(items.filter((_, i) => i !== index));

  const total = items.reduce((s, it) => s + (it.lineTotal || 0), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!customer) return setError("Customer name is required");
    if (!orderId) return setError("Order ID is required");
    const parsedId = parseInt(orderId, 10);
    if (isNaN(parsedId) || parsedId <= 0) return setError("Invalid Order ID");
    if ((orders || []).some((o) => o.id === parsedId)) return setError("Order ID already exists");
    if (items.length === 0) return setError("Add at least one product to ship");

    const newOrder = {
      id: parsedId,
      customer,
      items,
      total,
      payment: "Unpaid",
      status: "Pending",
    };

    dispatch({ type: "ADD_ORDER", payload: newOrder });

    // adjust stock for each item
    items.forEach((it) => dispatch({ type: "ADJUST_STOCK", payload: { id: it.productId, change: -it.qty } }));

    navigate("/");
  };

  return (
    <div className="card">
      <h2 className="page-title">Create New Order</h2>

      <form onSubmit={handleSubmit} className="form">
        <label>Customer Name</label>
        <input value={customer} onChange={(e) => setCustomer(e.target.value)} required />

        <label>Order ID</label>
        <input value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="Numeric order id (e.g. 1634234123)" />

        <label>Product</label>
        <div style={{ display: 'flex', gap: 8 }}>
          <select value={productId} onChange={(e) => setProductId(e.target.value)} className="form-input">
            {products.map((p) => (
              <option key={p.id} value={String(p.id)}>{p.name} — {p.sku} — ₹{p.price} (stock: {p.stock})</option>
            ))}
          </select>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label className="price-label" style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>Price (₹)</label>
            <input aria-label="Unit price" className="form-input price-input" type="number" min={0} step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} style={{ width: 120 }} />
            <small style={{ color: 'var(--muted)', fontSize: 12 }}>Editable unit price — defaults to product price</small>
            <div style={{ marginTop: 6, display: 'flex', gap: 8, alignItems: 'center' }}>
              <button type="button" className="btn btn-ghost" onClick={() => saveDefaultPrice()}>Save as default</button>
              <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13 }}>
                <input type="checkbox" checked={saveDefault} onChange={(e) => setSaveDefault(e.target.checked)} />
                <span style={{ color: 'var(--muted)' }}>Auto-save on add</span>
              </label>
              {savedMsg && <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{savedMsg}</span>}
            </div>
          </div>

          <input type="number" min={1} value={qty} onChange={(e) => setQty(Number(e.target.value))} style={{ width: 100 }} />

          <button type="button" className="btn" onClick={addItem}>Add Item</button>
        </div>

        {error && <p style={{ color: 'var(--danger)', marginTop: 8 }}>{error}</p>}

        {items.length > 0 && (
          <div style={{ marginTop: 12 }}>
            <h4>Items to ship</h4>
            <div style={{ display: 'grid', gap: 8, marginTop: 8 }}>
              {items.map((it, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>{it.name}</strong> — {it.sku} — {it.qty} × ₹{it.price} = <strong>₹{it.lineTotal}</strong>
                  </div>
                  <div>
                    <button type="button" className="btn" onClick={() => removeItem(idx)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 12 }}>
              <strong>Total: ₹{total}</strong>
            </div>
          </div>
        )}

        <div style={{ marginTop: 14 }} className="actions">
          <button type="submit" className="btn btn-primary">Create Order</button>
          <button type="button" className="btn" onClick={() => {
            setCustomer("");
            setOrderId("");
            setItems([]);
            setError("");
            const prod = products.find((p) => p.id === Number(productId));
            setPrice(String(prod ? prod.price : (products[0]?.price || 0)));
          }}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default CreateOrder;
