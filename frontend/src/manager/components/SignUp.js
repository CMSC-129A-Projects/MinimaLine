// import React,{ useEffect, useState, response } from "react";
import React, { Component } from 'react';
import Axios from "axios"
import styled from "styled-components";
import logo from "../../assets/logo.svg";
import {Redirect,Link} from 'react-router-dom';

class SignUp extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      redirect: false,
      error: false,
      error_msg: '',
      loggedIn: false,
      userId: null
    }
    // this.register = this.register.bind(this);
  }
  async componentDidMount(){
    document.title = "MinimaLine | Sign Up";
    console.log("sign up page")
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  register = e => {
    const data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    e.preventDefault();
    Axios.post('https://minimaline-test.herokuapp.com/user-registration',data).then((response) => {
      console.log(response)
      if(response.data.errors){
        this.setState({
          error: true,
          error_msg: response.data.errors
        })
      }else{
        this.setState({
          userId: response.data.insertId,
          redirect: true
        })
      }
    })
  };

  render(){
    if(this.state.redirect)
      return <Redirect to={{ pathname: "/store-reg",
          state: {userId: this.state.userId,username: this.state.username,password: this.state.password} }}/>
    else if(this.state.loggedIn)
      return <Redirect to={{ pathname: "/dashboard" }}/>
    return (
      <Container>
        <LogoWrapper>
          {/* <img src={logo} alt="" /> */}
          <h3>Minima</h3>
          <h2>Line</h2>
        </LogoWrapper>
        <Form onSubmit={this.register}>
          <h3>Sign Up</h3>
            {this.state.error && this.state.error_msg ? 
              <>
              {this.state.error_msg.map((error,index)=>{
                return( <p>{error["msg"]}</p>)
              })} 
              </>
            : null}
            <InputContainer>
              <StyledInput 
                type="text" 
                placeholder="Username" 
                name="username"
                value={this.state.username} 
                required
                minLength="4"
                maxLength="20"
                autoComplete="off"
                onChange={this.handleChange.bind(this)}/>
              <Status />
            </InputContainer>
            <InputContainer>
              <StyledInput 
                type="email" 
                placeholder="Email" 
                name="email" 
                value={this.state.email} 
                required
                autoComplete="off"
                onChange={this.handleChange.bind(this)}/>
              <Status />
            </InputContainer>
            <InputContainer>
              <StyledInput 
                type="password" 
                placeholder="Password" 
                name="password"
                value={this.state.password} 
                required
                minLength="6"
                maxLength="20"
                autoComplete="off"
                onChange={this.handleChange.bind(this)}/>
              <Status />
            </InputContainer>
            <button type="submit"> Sign Up </button>
        </Form>
        
        <div>
          <Terms>
            By signing up, I agree to the
              <Link to='/terms' style={{textDecoration:'none'}}>
                <span> Privacy Policy <br /> and Terms of Service</span>
              </Link>
          </Terms>
          <h4>
            Already have an account? 
              <Link to='/' style={{textDecoration:'none'}}>
                <span>  Sign In</span>
              </Link>
          </h4>
        </div>
      </Container>
    );
  }
};

const Terms = styled.p`
    padding: 0 1rem;
    text-align: center;
    font-size: 14px;
    color: #808080;
    font-weight: 300;
`;
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
      margin-left: 25px;
  }
  span {
        color: #568d33;
        cursor: pointer;
  }

  span:hover{
    transform: translateY(-3px);
    color: #ec9736;
  }
`;
const InputContainer  = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledInput = styled.input`
    width: 80%;
    max-width: 450px;
    min-width: 350px;
    height: 50px;
    border: none;
    outline: none;
    margin: 0.5rem 0;
    background-color: white;
    box-shadow: 0px 14px 9px -15px rbga(0,0,0,0.25);
    border-radius: 17px;
    padding: 0 1rem;
    transition: all 0.2s ease-in;

    @media (prefers-reduced-motion: no-preference){
        :focus {
            transition: outline-offset .25s ease;
            outline-offset: 1px;
            box-shadow: 0 0 2pt 1pt #568d33;
            border-radius: 20px;
        }
    }

    &:hover {
        transform: translateY(-3px);
    }
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
    background-color: #568d33;
  }
`;
export default SignUp;
