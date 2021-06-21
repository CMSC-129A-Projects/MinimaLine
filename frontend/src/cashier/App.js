import styled from "styled-components";
import PendingOrders from "./PendingOrders";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Container>
        <Wrapper>
          <Switch>
          {/* <Route path="/" exact component={PendingOrders} /> */}
            <Route path="/cashier" exact component={PendingOrders} />
          </Switch>
        </Wrapper>
      </Container>
    </Router>
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
  width: 100%;
  height: 100%;
  display: flex;
`;

export default App;