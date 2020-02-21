import React, { Component } from 'react';
import {Route ,Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout';
import './App.css';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Checkout from './container/Checkout/Checkout';
import Orders from './container/Orders/Orders';
import Auth from './container/Auth/Auth';
import Logout from './container/Auth/Logout/Logout';
import * as action from './store/actions/index';


class App extends Component {
  componentDidMount() {
    this.props.onAutoLogin();
  }
  
  render () {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route path="/checkout" component={Checkout} /> 
            <Route path="/orders" component={Orders} />
            <Route path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAutoLogin: ()=>dispatch(action.authCheckState())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
