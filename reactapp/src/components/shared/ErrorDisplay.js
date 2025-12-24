import React from 'react';

const ErrorDisplay = ({ onGoHome, onCreateOrder }) => (
  <div className="error-container">
    <span className="error-icon">😢</span>
    <div className="error-message">Order not found!</div>
    <p>The order you're looking for doesn't exist.</p>
    <div className="error-actions">
      <button className="error-btn" onClick={onGoHome}>
        🏠 Go Home
      </button>
      {onCreateOrder && (
        <button className="error-btn" onClick={onCreateOrder}>
          ➕ Create New Order
        </button>
      )}
    </div>
  </div>
);

export default ErrorDisplay;