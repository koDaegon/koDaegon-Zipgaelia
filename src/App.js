import React, { Component } from 'react';
import {Route ,Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout';
import './App.css';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Logout from './container/Auth/Logout/Logout';
import * as action from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponet';


const asyncAuth = asyncComponent(() => {
  return import('./container/Auth/Auth');
});

const asyncCheckout = asyncComponent(() => {
  return import('./container/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./container/Orders/Orders');
});

class App extends Component {
  componentDidMount() {
    this.props.onAutoLogin();
  }
  
  render () {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    
    if(this.props.isAuthenticated) {
     routes = (
     <Switch>
        <Route path="/logout" component={Logout} />
        <Route path="/checkout" component={asyncCheckout} /> 
        <Route path="/orders" component={asyncOrders} />
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
     );};
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAutoLogin: ()=>dispatch(action.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
