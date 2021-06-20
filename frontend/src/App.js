import React, { Component } from 'react';
import * as Manager from './manager/components';
import * as Customer from './customer/components';
import * as Cashier from './cashier/components';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Auth from './services/Auth';
import CustomerFn from './services/CustomerFn';
import styled from 'styled-components';
import chicken from './assets/chicken.png'
import glitter from './assets/glitter.png'
import circle from './assets/circle.png'

const ManagerRoute = ({component:Component, ...rest}) => {
  return(
    <Route
      {...rest}
      render={()=>(
        Auth.hasAccess() ?
          <Component/>
        : <Redirect to="/"/>
      )}
    />
  )
}
const PrivateRoute = ({component:Component, ...rest}) => {
  return(
    <Route
      {...rest}
      render={()=>(
        CustomerFn.validPath() ?
          <Component/>
        : <Redirect to="/confirmation"/>
      )}
    />
  )
}
const App = () => {
  return (
    <Container>
      <Wrapper>
        <Router>
          <Switch>
            <Route exact path="/" component={Manager.SignIn} />
            <Route exact path="/sign-up" component={Manager.SignUp} />
            <Route exact path="/terms" component={Manager.Terms} />
            <Route exact path="/store-reg" component={Manager.StoreReg} />
            <ManagerRoute exact path="/view-menu" component={Manager.ViewMenu} />
            <ManagerRoute exact path="/edit-menu" component={Manager.EditMenu} />
            <ManagerRoute exact path="/dashboard" component={Manager.Dashboard} />
            <ManagerRoute exact path="/account" component={Manager.ManageAccount} />
            <PrivateRoute path="/store/:id" exact component={Customer.Main} />
            <Route path="/prod-select" exact component={Customer.ProdSelect} />
            <Route path="/checkout" exact component={Customer.Checkout} />
            <Route path="/confirmation" exact component={Customer.Confirmation} />
            {/* <Route exact path="/cashier" component={Cashier.App} /> */}
          </Switch>
        </Router>
      </Wrapper>
    </Container>
    
  );
};
const Container = styled.div`
  background: #faf0e0;
  position: absolute;
  overflow: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const Wrapper = styled.div`
  background-image: url(${chicken}), url(${glitter}), url(${circle});
  background-color: #f3d9a4; 
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  display: flex;
`
export default App;