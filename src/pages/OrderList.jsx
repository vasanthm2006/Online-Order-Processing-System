import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppState, useAppDispatch } from "../context/AppContext";
import { useState, useMemo } from "react";

const OrderList = () => {
  const { orders, products, suppliers } = useAppState();
  const dispatch = useAppDispatch();
  const [q, setQ] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const supplierParam = useMemo(() => {
    const p = new URLSearchParams(location.search).get("supplier");
    return p ? Number(p) : null;
  }, [location.search]);

  const filtered = orders.filter((o) => {
    // supplier filtering: if supplier param present, only keep orders that include products from that supplier
    if (supplierParam) {
      const has = (o.items || []).some((it) => {
        const prod = (products || []).find((p) => p.id === it.productId);
        return prod && prod.supplierId === supplierParam;
      });
      if (!has) return false;
    }

    if (!q) return true;
    const s = q.toLowerCase();
    return String(o.id).includes(s) || o.customer.toLowerCase().includes(s) || String(o.total).includes(s);
  });

  const content = filtered.length === 0 ? (
    <div className="card">
      <p>No orders found. Create a new order to get started.</p>
      <Link to="/create" className="btn" style={{ marginTop: 10 }}>Create Order</Link>
    </div>
  ) : (
    filtered.map((order) => {
      return (
        <div key={order.id} className="card">
          <p><strong>Order ID:</strong> #{order.id}</p>
          <p><strong>Customer:</strong> {order.customer}</p>
          <p><strong>Total:</strong> ₹{order.total}</p>

          <div style={{ display: 'flex', gap: 8, marginTop: 6, alignItems: 'center' }}>
            <span className={`badge ${order.payment.toLowerCase()}`}>{order.payment}</span>
            <span className={`badge ${order.status.toLowerCase()}`}>{order.status}</span>
          </div>

          <div className="actions" style={{ marginTop: 10 }}>
            {order.status !== 'Delivered' && (
              <button
                className="btn btn-ghost"
                onClick={() => {
                  if (!window.confirm(`Mark order #${order.id} as Delivered?`)) return;
                  // ensure payment is paid when marking delivered? we keep payment unchanged
                  dispatch({ type: 'UPDATE_ORDER', payload: { ...order, status: 'Delivered' } });
                }}
              >
                Mark Delivered
              </button>
            )}

            {order.payment !== 'Paid' && (
              <button
                className="btn btn-primary"
                onClick={() => dispatch({ type: 'UPDATE_ORDER', payload: { ...order, payment: 'Paid' } })}
              >
                Mark Paid
              </button>
            )}

            <Link to={`/edit/${order.id}`} className="btn" style={{ marginLeft: 8 }}>Edit</Link>
            <Link to={`/order/${order.id}`} style={{ marginLeft: 8 }}>View Details</Link>
            <button className="btn btn-ghost" style={{ marginLeft: 8 }} onClick={() => {
              if (!window.confirm(`Delete order #${order.id}? This cannot be undone.`)) return;
              // ask whether to restore stock
              const restore = window.confirm('Restore product stock for this order when deleting? Click OK to restore, Cancel to just delete.');
              // if restore, dispatch ADJUST_STOCK for each line item
              if (restore && order.items && order.items.length > 0) {
                order.items.forEach((it) => dispatch({ type: 'ADJUST_STOCK', payload: { id: it.productId, change: it.qty } }));
              }
              dispatch({ type: 'DELETE_ORDER', payload: { id: order.id } });
            }}>Delete</button>
          </div>
        </div>
      );
    })
  );

  return (
    <>
      <h2 className="page-title">Order List</h2>

      <div className="toolbar" style={{ marginBottom: 14, display: "flex", gap: 10, alignItems: "center" }}>
        <input aria-label="Search orders" className="form-input" placeholder="Search by customer, id or total" value={q} onChange={(e) => setQ(e.target.value)} />
        <Link to="/create" className="btn btn-primary">New Order</Link>

        {supplierParam && (
          <div style={{ marginLeft: 12, display: 'inline-flex', gap: 8, alignItems: 'center' }}>
            <strong style={{ color: 'var(--muted)' }}>Filtered by:</strong>
            <span style={{ fontWeight: 700 }}>{(suppliers.find(s => s.id === supplierParam) || {}).name}</span>
            <button className="btn btn-ghost" onClick={() => navigate('/')}>Clear</button>
          </div>
        )}
      </div>

      {content}
    </>
  );
};

export default OrderList;
