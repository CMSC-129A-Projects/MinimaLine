import React, { Component } from 'react';
import * as Manager from './manager';
import * as Customer from './customer';
import * as Cashier from './cashier';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import styled from 'styled-components';
import chicken from './assets/chicken.png'
import glitter from './assets/glitter.png'
import circle from './assets/circle.png'

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
            <Route exact path="/view-menu" component={Manager.ViewMenu} />
            <Route exact path="/edit-menu" component={Manager.EditMenu} />
            <Route exact path="/dashboard" component={Manager.Dashboard} />
            <Route exact path="/account" component={Manager.ManageAccount} />
            <Route path="/store/:id" exact component={Customer.Main} />
            <Route path="/store/:id/order" exact component={Customer.ProdSelect} />
            <Route path="/store/:id/checkout" exact component={Customer.Checkout} />
            <Route path="/store/:id/confirm" exact component={Customer.Confirmation} />
            <Route path="/not-found" exact component={Customer.NotFound} />
            <Route exact path="/cashier" component={Cashier.App} />
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