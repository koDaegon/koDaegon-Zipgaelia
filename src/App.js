import React from 'react';
import {Route ,Switch} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import './App.css';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Checkout from './container/Checkout/Checkout';
import Orders from './container/Orders/Orders';
import Auth from './container/Auth/Auth';


function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/checkout" component={Checkout} /> 
          <Route path="/orders" component={Orders} />
          <Route path="/" component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
