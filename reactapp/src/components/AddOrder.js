import React, { useState } from 'react';
import { useOrder } from '../context/OrderContext';
import { useHistory } from 'react-router-dom';
import './AddOrder.css';

const AddOrder = () => {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const { addOrder } = useOrder();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productName && quantity) {
      addOrder({
        productName,
        quantity: parseInt(quantity)
      });
      history.push('/');
    }
  };

  const handleCancel = () => {
    history.push('/');
  };

  const handleClear = () => {
    setProductName('');
    setQuantity('');
  };

  const handleSaveDraft = () => {
    localStorage.setItem('orderDraft', JSON.stringify({ productName, quantity }));
    alert('Draft saved successfully!');
  };

  const handleLoadDraft = () => {
    const draft = localStorage.getItem('orderDraft');
    if (draft) {
      const { productName: draftName, quantity: draftQuantity } = JSON.parse(draft);
      setProductName(draftName || '');
      setQuantity(draftQuantity || '');
    }
  };

  return (
    <div className="add-order-wrapper">
      <div className="add-order-container">
        <div className="form-header">
          <div className="header-content">
            <div className="header-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M20 7L12 3L4 7L12 11L20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 12L12 16L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 17L12 21L20 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="header-text">
              <h2>Create New Order</h2>
              <p>Add product details to generate a new order</p>
            </div>
          </div>
          <div className="header-actions">
            <button type="button" className="action-btn secondary" onClick={handleLoadDraft}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2"/>
                <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Load Draft
            </button>
            <button type="button" className="action-btn secondary" onClick={() => history.push('/')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M3 3v5h5" stroke="currentColor" strokeWidth="2"/>
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Back to Orders
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="order-form">
          <div className="form-grid">
            <div className="input-group">
              <label htmlFor="productName">Product Name *</label>
              <input
                id="productName"
                type="text"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="quantity">Quantity *</label>
              <input
                id="quantity"
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                required
              />
            </div>
          </div>
          
          <div className="form-actions">
            <div className="primary-actions">
              <button type="submit" className="btn primary" disabled={!productName || !quantity}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Submit
              </button>
              
              <button type="button" className="btn secondary" onClick={handleSaveDraft}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="17,21 17,13 7,13 7,21" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="7,3 7,8 15,8" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Save Draft
              </button>
            </div>
            
            <div className="secondary-actions">
              <button type="button" className="btn outline" onClick={handleClear}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <polyline points="3,6 5,6 21,6" stroke="currentColor" strokeWidth="2"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Clear
              </button>
              
              <button type="button" className="btn ghost" onClick={handleCancel}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2"/>
                  <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrder;