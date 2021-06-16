import React, { Component } from 'react';
import styled from "styled-components";
import logo from "../../assets/logo.svg";
import {Redirect,Link} from 'react-router-dom';
import Axios from "axios";
import Auth from '../../services/Auth';
// Axios.defaults.withCredentials = true;

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      password: '',
      redirect: false,
      login_error: false,
      error_msg: null,
      userId: null
     }
  }
  async componentDidMount(){
    document.title = "MinimaLine | Sign In";
    console.log("sign in page")
  }
  
  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  login = e => {
    e.preventDefault();
    Auth.login(this.state.username, this.state.password)
      .then((error) => {
        if(error){
          console.log(error.msg)
          this.setState({ 
            error_msg: error.msg,
            login_error: true
          })
        }
        else{
          console.log("logged in")
          this.setState({redirect: true})
        }
      })
  };

  render() { 
    if(this.state.redirect)
      return <Redirect to="/dashboard"/>
      // return <Redirect to={{ pathname: "/dashboard", state: {userId: this.state.userId} }}/>
    return ( 
      <Container>
      <LogoWrapper>
        {/* <img src={logo} alt="" /> */}
        <h3>Minima</h3>
        <h2>Line</h2>
      </LogoWrapper>

      <Form onSubmit={this.login}>
        <h3>Sign In</h3>
        {this.state.login_error ? <p>{this.state.error_msg}</p> : null}
        <InputContainer>
          <StyledInput 
            type="text" 
            placeholder="Username" 
            name="username"
            value={this.state.username}
            required
            autoComplete="off"
            onChange={this.handleChange.bind(this)}/>
          <Status/>
        </InputContainer>
        <InputContainer>
          <StyledInput 
            type="password" 
            placeholder="Password" 
            name="password" 
            value={this.state.password}
            required
            autoComplete="off"
            onChange={this.handleChange.bind(this)}/>
          <Status/>
        </InputContainer>
        <button type="submit"> Sign In </button>
      </Form>

      <div>
        <h4>
         Don't have an account?  
            <Link to='/sign-up' style={{textDecoration:'none'}}>
            <span>  Sign Up</span>
            </Link>
        </h4>

      </div>
    </Container>
     );
  }
}

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    h3{
      color: #666666;
      margin-bottom: 2rem;
      font-size: 40px;
      align-items: left;
      margin-left: -10px;
      
    }
    p{
      color: #ff5c5c;
      font-weight: bold;
    }
    button{
        margin-top: 10px;
        width: 75%;
        max-width: 350px;
        margin-left: -20px;
        min-width: 250px;
        height: 50px;
        border: none;
        box-shadow: 0px 14px 9px -15px rgba(0,0,0,0.25);
        border-radius: 17px;
        background-color: #568d33;
        color: #fff;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease-in;
        
        &:hover{
            transform: translateY(-3px);
        }
    }
`;

const LogoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    img{
        height: 6rem;
        margin-bottom: -20px;
    }

    h3{
        text-align:center;
        color: #ec9736;
        font-size: 22px;
    }

    h2{
        color: #568d33;
        font-weight: 300;
        font-size: 18px;
        margin-top: 25px;
    }
`;

const Container = styled.div`
  min-width: 600px;
  backdrop-filter: blur(9px);
  background-color: rgba(255, 255, 255, 0.5);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 2rem;

  @media (max-width: 900px){
      width: 100vw;
      position: absolute;
      padding: 0;
  }

  h4 {
      color: #808080;
      font-weight: bold;
      font-size: 16px;
      margin-top: 2rem;

      span {
          color: #568d33;
          cursor: pointer;
      }
  }
  span:hover{
    transform: translateY(-3px);
    color: #ec9736;
  }
`;
const StyledInput = styled.input`
    width: 80%;
    max-width: 450px;
    min-width: 350px;
    height: 50px;
    border: none;
    margin: 0.5rem 0;
    background-color: white;
    box-shadow: 0px 14px 9px -15px rbga(0,0,0,0.25);
    border-radius: 17px;
    padding: 0 1rem;
    transition: all 0.2s ease-in;

    &:hover {
        transform: translateY(-3px);
    }
`;

const InputContainer  = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Status = styled.div`
  height: 10px;
  width: 10px;
  background: #9d9d9d;
  border-radius: 10px;
  margin-left: 1rem;

  ${StyledInput}:focus + & {
    background: #ffa689;
  }
  ${StyledInput}:invalid + & {
    background: #fe2f75;
  }
  ${StyledInput}:valid + & {
    background: #568d33;
  }
`;

export default SignIn;