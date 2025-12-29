import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppState, useAppDispatch } from "../context/AppContext";

const EditOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders } = useAppState();
  const dispatch = useAppDispatch();

  const order = orders.find((o) => o.id === Number(id));

  const [customer, setCustomer] = useState(order.customer);
  const [total, setTotal] = useState(order.total);
  const [payment, setPayment] = useState(order.payment);
  const [status, setStatus] = useState(order.status);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({ type: "UPDATE_ORDER", payload: { id: order.id, customer, total: Number(total), payment, status } });

    navigate(`/order/${order.id}`);
  };

  return (
    <div className="card">
      <h2 className="page-title">Edit Order</h2>

      <form className="form" onSubmit={handleSubmit}>
        <label>Customer Name</label>
        <input
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />

        <label>Total Amount</label>
        <input
          type="number"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
        />

        <label>Payment</label>
        <select value={payment} onChange={(e) => setPayment(e.target.value)}>
          <option>Unpaid</option>
          <option>Paid</option>
        </select>

        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Pending</option>
          <option>Shipped</option>
          <option>Delivered</option>
        </select>

        <button className="btn">Save Changes</button>
      </form>
    </div>
  );
};

export default EditOrder;
