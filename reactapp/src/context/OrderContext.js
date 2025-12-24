import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addOrder = (order) => {
    const newOrder = {
      id: Date.now(),
      ...order
    };
    setOrders(prev => [...prev, newOrder]);
  };

  const updateOrderQuantity = (id, quantity) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === id ? { ...order, quantity } : order
      )
    );
  };

  const getOrderById = (id) => {
    return orders.find(order => order.id === parseInt(id));
  };

  return (
    <OrderContext.Provider value={{
      orders,
      addOrder,
      updateOrderQuantity,
      getOrderById
    }}>
      {children}
    </OrderContext.Provider>
  );
};