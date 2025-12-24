import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';

const OrderStatus = () => {
  const { id } = useParams();
  const { getOrderById, updateOrderQuantity } = useOrder();
  const history = useHistory();
  const order = getOrderById(id);
  const [currentQuantity, setCurrentQuantity] = useState(order ? order.quantity : 0);

  if (!order) {
    return (
      <div className="error-container">
        <span className="error-icon">😢</span>
        <div className="error-message">Order not found!</div>
        <div className="error-actions">
          <button className="error-btn" onClick={() => history.push('/')}>
            🏠 Go Home
          </button>
        </div>
      </div>
    );
  }

  const handleIncrease = () => {
    const newQuantity = currentQuantity + 1;
    setCurrentQuantity(newQuantity);
    updateOrderQuantity(parseInt(id), newQuantity);
  };

  const handleDecrease = () => {
    const newQuantity = Math.max(0, currentQuantity - 1);
    setCurrentQuantity(newQuantity);
    updateOrderQuantity(parseInt(id), newQuantity);
  };

  const handleBackToOrder = () => {
    history.push(`/order/${id}`);
  };

  const handleSetQuantity = (qty) => {
    setCurrentQuantity(qty);
    updateOrderQuantity(parseInt(id), qty);
  };

  const handleReset = () => {
    const originalQty = order.quantity;
    setCurrentQuantity(originalQty);
    updateOrderQuantity(parseInt(id), originalQty);
  };

  return (
    <div className="order-status-container">
      <div className="status-header">
        <h2>Order Status</h2>
        <div className="product-name">{order.productName}</div>
        <div className="status-actions">
          <button className="header-btn" onClick={handleReset}>
            🔄 Reset
          </button>
          <button className="header-btn" onClick={() => alert('History coming soon!')}>
            📈 History
          </button>
        </div>
      </div>
      
      <div className="quantity-section">
        <div className="quantity-display">
          <p className="quantity-label">Current Quantity: {currentQuantity}</p>
        </div>
        
        <div className="quantity-controls">
          <button onClick={handleDecrease} className="quantity-btn decrease">-</button>
          <div className="quantity-value">{currentQuantity}</div>
          <button onClick={handleIncrease} className="quantity-btn increase">+</button>
        </div>
        
        <div className="quick-set-buttons">
          <button className="quick-set-btn" onClick={() => handleSetQuantity(10)}>Set 10</button>
          <button className="quick-set-btn" onClick={() => handleSetQuantity(25)}>Set 25</button>
          <button className="quick-set-btn" onClick={() => handleSetQuantity(50)}>Set 50</button>
          <button className="quick-set-btn" onClick={() => handleSetQuantity(100)}>Set 100</button>
        </div>
      </div>
      
      <div className="status-actions-bottom">
        <button onClick={handleBackToOrder} className="back-btn">
          ← Back to Order
        </button>
        <button className="save-changes-btn" onClick={() => alert('Changes saved automatically!')}>
          💾 Save Changes
        </button>
      </div>
    </div>
  );
};

export default OrderStatus;