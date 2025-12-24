import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { OrderProvider } from './context/OrderContext';

ReactDOM.render(
  <React.StrictMode>
    <OrderProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </OrderProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
