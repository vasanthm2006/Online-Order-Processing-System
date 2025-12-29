import { Link, useParams } from "react-router-dom";
import { useAppState, useAppDispatch } from "../context/AppContext";

const OrderDetails = () => {
  const { id } = useParams();
  const { orders } = useAppState();
  const dispatch = useAppDispatch();
  const order = orders.find((o) => o.id === Number(id));

  if (!order) return <p>Order not found</p>;

  return (
    <div className="card">
      <h2 className="page-title">Order Details</h2>

          <p><strong>Order ID:</strong> {order.id}</p>
      <p><strong>Customer:</strong> {order.customer}</p>

      {order.items && order.items.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <h4>Items</h4>
          <ul>
            {order.items.map((it, idx) => (
              <li key={idx}>
                {it.name} — {it.qty} × ₹{it.price} = ₹{it.lineTotal}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p style={{ marginTop: 8 }}><strong>Total:</strong> ₹{order.total}</p>

      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <span className={`badge ${order.payment.toLowerCase()}`}>
          {order.payment}
        </span>

        <span className={`badge ${order.status.toLowerCase()}`}>
          {order.status}
        </span>
      </div>

      <div style={{ marginTop: 12, display:'flex', gap:8 }}>
        {order.status !== 'Delivered' && (
          <button className="btn btn-ghost" onClick={() => {
            if (!window.confirm(`Mark order #${order.id} as Delivered?`)) return;
            dispatch({ type: 'UPDATE_ORDER', payload: { ...order, status: 'Delivered' } });
          }}>Mark Delivered</button>
        )}

        <Link to={`/edit/${order.id}`} className="btn">
          Edit Order
        </Link>
        <button className="btn btn-ghost" onClick={() => {
          if (!window.confirm(`Delete order #${order.id}? This action cannot be undone.`)) return;
          const restore = window.confirm('Restore product stock for this order when deleting? Click OK to restore, Cancel to just delete.');
          if (restore && order.items && order.items.length > 0) {
            order.items.forEach((it) => dispatch({ type: 'ADJUST_STOCK', payload: { id: it.productId, change: it.qty } }));
          }
          dispatch({ type: 'DELETE_ORDER', payload: { id: order.id } });
          // navigate back
          window.location.href = '/';
        }}>Delete Order</button>
      </div>

      <br />
      <Link to="/">← Back to Orders</Link>
    </div>
  );
};

export default OrderDetails;
