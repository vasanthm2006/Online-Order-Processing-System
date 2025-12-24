import React from 'react';
import { Route, Switch } from 'react-router-dom';
import OrderList from './components/OrderList';
import AddOrder from './components/AddOrder';
import OrderDetails from './components/OrderDetails';
import OrderStatus from './components/OrderStatus';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={OrderList} />
        <Route path="/add-order" component={AddOrder} />
        <Route exact path="/order/:id" component={OrderDetails} />
        <Route path="/order/:id/status" component={OrderStatus} />
      </Switch>
    </div>
  );
}

export default App;