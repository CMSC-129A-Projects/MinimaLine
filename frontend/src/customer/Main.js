import React, { Component } from 'react';
import styled from 'styled-components';
import {FiArrowRightCircle} from 'react-icons/fi';
import RegularPriority from './RegularPriority';
import DineInTakeOut from './DineInTakeOut';
import {Link,Redirect} from 'react-router-dom';
import CustomerFn from '../services/CustomerFn';
import Axios from 'axios';

class Main extends Component {
  constructor(){
    super();
    this.state = {
      isPrioritySelected: false, // either regular or priority has been clicked
      isInputComplete: false, // regular/priority and dine in/takeout have been clicked
      customerType: null, // regular/priority and dine in/takeout have been clicked
      dineIn: null, // regular/priority and dine in/takeout have been clicked
      redirect: false,
      id: null
    }
    this.priorityType = this.priorityType.bind(this);
    this.dineIn = this.dineIn.bind(this);
    this.proceed = this.proceed.bind(this);
  }
  async componentDidMount(){
    let path = window.location.pathname
    let id = parseInt(path.split('/').pop())
    console.log(id)
    await Axios.post('https://minimaline-server.herokuapp.com/check-store',{id:id})
      .then(response =>{
          if(response.data.message){
              console.log(response.data)
              this.setState({redirect:true})
          }
          else{
              console.log(response)
              CustomerFn.storeId(id)
              this.setState({id: id})
          }
      })
      .catch(err => {
          this.setState({redirect:true})
      })
  }
  priorityType(id){
    this.setState({
      isPrioritySelected: true,
      customerType: id===1 ? 'REGULAR' : 'PRIORITY'
    })
  }
  dineIn(id){
    this.setState({
      isInputComplete: true,
      dineIn: id===1 ? 'DINE IN' : 'TAKE OUT'
    })
  }
  proceed(){
    CustomerFn.storeCustomerType({priority_type: this.state.customerType, dine_in: this.state.dineIn})
  }

  render() { 
    if(this.state.redirect)
      return(<Redirect to="/not-found"/>)
    return (
      <Container>
        <Blur>
          <Box>
            <LogoWrapper>
              {/* <img src={logo} alt="MinimaLine logo"/> */}
              <h3> Minima<span>Line</span> </h3>
            </LogoWrapper>

            <Buttons1> {/* input buttons; show regular/priority first; */}
              <p className="header">Choose customer type:</p>
              <p className="sub">(Priority: PWD, Pregnant, Senior Citizens)</p>
              <RegularPriority onClick={this.priorityType} />
            </Buttons1>

            <Buttons2 > {/* render dine in/takeout on click */}
              {this.state.isPrioritySelected ? <DineInTakeOut onClick={this.dineIn} /> : null}
            </Buttons2>

            {this.state.isInputComplete ?
              <NextButtonWrapper>
                <Link to={`/store/${this.state.id}/order`} style={{textDecoration:'none'}} onClick={this.proceed}>
                  <NextButton/>
                </Link>
              </NextButtonWrapper>
              : null
            }
          </Box>
        </Blur>
      </Container>
     );
  }
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
  /* display: flex;
  justify-content: center;
  align-items: center; */
`;
const Blur = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Box = styled.div`
  background-color: rgba(255, 255, 255, 1);
  width: 450px;
  height: 550px;
  border-radius: 3rem;
  box-shadow: 0px 5px 10px -2px #858585;

  @media (max-width: 900px) {
    width: 350px;
  }

  @keyframes fadeIn{
    0% {
      opacity: 0;
      transform: translateY(-10px);
    }
    100% { 
      opacity: 1;
      transform: translateY(0px);
    }
  }
  animation: fadeIn 1s;
`;
const LogoWrapper = styled.div`
  width: 450px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 10px;

  img{
    margin: 20px 35px 0px;
    width: 50%;
    height: 50%;
    padding-bottom: 0px;
  }

  h3{
    text-align:center;
    /* color: #f9c91e; */
    color: #ec9736;
    font-size: 22px;
  }

  span{
    color: #568d33;
    font-weight: 300;
    font-size: 18px;
  }

  @media (max-width: 900px) {
  width: 350px;
  }
`;
const Buttons1 = styled.div`
  width: 450px;
  height: 90px;
  margin-top: -30px;
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* p{
    margin-bottom: 30px;
  } */
  .header{
    font-size: 20px;
    font-weight: 500;
  }
  .sub{
    margin-top: -15px;
    margin-bottom: 40px;
    font-size: 13px;
    font-style: italic;
  }
  @media (max-width: 900px) {
    width: 350px;
  }
`;
const Buttons2 = styled.div`
  width: 450px;
  height: 130px;
  margin-top: 90px;
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 900px) {
  width: 350px;
  } 
`;
const NextButtonWrapper = styled.div`
  width: 450px;
  height: 100px;
  display: flex;
  justify-content: center;

  a:hover{
    transform: translateY(3px);
  }

  @media (max-width: 900px) {
  width: 350px;
  }
`;
const NextButton = styled(FiArrowRightCircle)`
  font-size: 50px;
  color: #568d33;
  :hover{
    color: #ec9736;
  }
`;
export default Main;