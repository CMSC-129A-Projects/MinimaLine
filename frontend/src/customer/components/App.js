import styled from "styled-components";
import Main from "./Main";
import ProdSelect from "./ProdSelect";
import Checkout from "./Checkout";
import Confirmation from "./Confirmation";
import {BrowserRouter as Router, Switch, Route,Redirect} from 'react-router-dom';
import CustomerFn from '../../services/CustomerFn';

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
    // <Router>
      <Container>
        <Wrapper>
          {/* <Switch>
            <PrivateRoute path="/store/:id" exact component={Main} />
            <Route path="/prod-select" exact component={ProdSelect} />
            <Route path="/checkout" exact component={Checkout} />
            <Route path="/confirmation" exact component={Confirmation} /> */}
          {/* </Switch> */}
        </Wrapper>
      </Container>
    // </Router>
  );
};

const Container = styled.div`
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const Wrapper = styled.div`
  background: #faf0e0;
  /* background: linear-gradient(63deg, rgba(255,140,140,1) 0%, rgba(250,240,224,1) 60%, rgba(113,237,184,1) 100%); */
  width: 100%;
  height: 100%;
  display: flex;
`;

export default App;

//#C59C6C