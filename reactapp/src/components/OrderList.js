import React from 'react';
import { useOrder } from '../context/OrderContext';
import { useHistory } from 'react-router-dom';

const OrderList = () => {
  const { orders } = useOrder();
  const history = useHistory();

  const handleAddOrder = () => {
    history.push('/add-order');
  };

  const handleOrderClick = (orderId) => {
    history.push(`/order/${orderId}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', padding: '20px', backgroundColor: '#f5f5f5' }}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '10px' }}>Order List</h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>Manage your orders efficiently</p>
          <button 
            onClick={handleAddOrder} 
            style={{ 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              padding: '12px 24px', 
              borderRadius: '6px', 
              fontSize: '1rem', 
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            Add Order
          </button>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', gridColumn: '1 / -1' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📦</div>
              <h3 style={{ color: '#666', marginBottom: '10px' }}>No orders yet</h3>
              <p style={{ color: '#999' }}>Start by adding your first order to get started</p>
            </div>
          ) : (
            orders.map(order => (
              <div 
                key={order.id} 
                onClick={() => handleOrderClick(order.id)} 
                style={{ 
                  backgroundColor: 'white', 
                  padding: '20px', 
                  borderRadius: '8px', 
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📦</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>{order.productName}</div>
                <div style={{ color: '#666' }}>Quantity: {order.quantity}</div>
              </div>
            ))
          )}
          <div 
            onClick={() => handleOrderClick('nonexistent')} 
            style={{ 
              backgroundColor: 'white', 
              padding: '20px', 
              borderRadius: '8px', 
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
              cursor: 'pointer',
              transition: 'transform 0.2s',
              textAlign: 'center',
              border: '2px dashed #ddd'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>⚠️</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>Non-existent Order</div>
            <div style={{ color: '#666' }}>Demo Item</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;