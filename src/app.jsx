import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Layout from './component/layout/layout.jsx';
import Login from './page/login/login.jsx';
import Home from './page/home/home.jsx';
import User from './page/user/user.jsx';
import Product from './page/product/product.jsx';
import ProductEdit from './page/product/edit.jsx';
import Order from './page/order/order.jsx';
import OrderDetail from './page/order/detail.jsx';
import ErrorPage from './page/error/error.jsx';

class App extends Component {
  render() {
    let LayoutRouter = (
      <Layout>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/user" component={User}/>
          <Route exact path="/product" component={Product}/>
          <Route path="/product/edit/:productId?" component={ProductEdit}/>
          <Route exact path="/order" component={Order}/>
          <Route path="/order/detail/:orderId" component={OrderDetail}/>
          <Route component={ErrorPage}/>
        </Switch>
      </Layout>
    );
    return(
      <Router>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/" render={props => LayoutRouter}/>
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));