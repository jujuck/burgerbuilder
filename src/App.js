import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './Hoc/Layout/Layout';
import BurgerBuilder from './Container/BurgerBuilder/BurgerBuilder';
import Checkout from './Container/Checkout/Checkout';
import Orders from './Container/Orders/Orders';
import Auth from './Container/Auth/Auth';

class App extends Component {


  render() {
    return (
      <div >
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
