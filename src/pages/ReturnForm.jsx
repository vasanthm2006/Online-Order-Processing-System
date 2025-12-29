import React, { useState } from "react";
import { useAppState, useAppDispatch } from "../context/AppContext";

const ReturnForm = () => {
  const { orders } = useAppState();
  const dispatch = useAppDispatch();

  const [orderId, setOrderId] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const order = orders.find((o) => o.id === Number(orderId));
    if (!order) {
      setMessage("Order ID not found");
      return;
    }

    dispatch({ type: "ADD_RETURN", payload: { id: Date.now(), orderId: order.id, reason } });
    setMessage("Return request submitted");
    setOrderId("");
    setReason("");
  };

  return (
    <div className="card">
      <h2 className="page-title">Return / Exchange</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>Order ID</label>
        <input value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="e.g. 1" required />

        <label>Reason</label>
        <select value={reason} onChange={(e) => setReason(e.target.value)} required>
          <option value="">Select reason</option>
          <option value="Damaged">Damaged</option>
          <option value="Wrong Item">Wrong Item Delivered</option>
          <option value="Other">Other</option>
        </select>

        <div className="actions">
          <button className="btn btn-primary" type="submit">Submit Return</button>
          <button type="button" className="btn" onClick={() => { setOrderId(""); setReason(""); setMessage(""); }}>Reset</button>
        </div>

        {message && <p style={{ marginTop: 10 }}>{message}</p>}
      </form>
    </div>
  );
};

export default ReturnForm;
