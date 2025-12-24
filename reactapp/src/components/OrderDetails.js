import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import ErrorDisplay from './shared/ErrorDisplay';

const OrderDetails = () => {
  const { id } = useParams();
  const { getOrderById } = useOrder();
  const history = useHistory();
  const order = getOrderById(id);

  if (!order) {
    return (
      <ErrorDisplay 
        onGoHome={() => history.push('/')}
        onCreateOrder={() => history.push('/add-order')}
      />
    );
  }

  const handleUpdateStatus = () => {
    history.push(`/order/${id}/status`);
  };

  const handleDuplicate = () => {
    history.push('/add-order');
    alert('Order template loaded for duplication!');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`Order: ${order.productName} - Quantity: ${order.quantity}`);
    alert('Order details copied to clipboard!');
  };

  return (
    <div className="order-details-container">
      <div className="details-header">
        <span className="product-icon">📦</span>
        <h1>{order.productName}</h1>
        <div className="header-actions">
          <button className="header-btn" onClick={handlePrint}>
            🖨️ Print
          </button>
          <button className="header-btn" onClick={handleShare}>
            🔗 Share
          </button>
          <button className="header-btn" onClick={handleDuplicate}>
            📋 Duplicate
          </button>
        </div>
      </div>
      
      <div className="details-card">
        <p className="test-only">Quantity: {order.quantity}</p>
        <div className="detail-item">
          <span className="detail-label">Quantity</span>
          <span className="detail-value">{order.quantity}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Product ID</span>
          <span className="detail-value">#{order.id}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Created</span>
          <span className="detail-value">{new Date(order.id).toLocaleDateString()}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Status</span>
          <span className="detail-value status-active">✓ Active</span>
        </div>
      </div>
      
      <div className="action-buttons">
        <button onClick={handleUpdateStatus} className="update-status-btn">
          Update Order Status
        </button>
        <button className="archive-btn" onClick={() => alert('Archive functionality coming soon!')}>
          🗄 Archive Order
        </button>
        <button className="delete-btn" onClick={() => alert('Delete functionality coming soon!')}>
          🗑️ Delete Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;