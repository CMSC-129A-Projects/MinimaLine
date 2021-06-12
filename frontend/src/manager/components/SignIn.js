import React, { Component } from 'react';
import styled from "styled-components";
import logo from "../../assets/logo.svg";
// import Input from "./Input";
import {Redirect,Link} from 'react-router-dom';
import Axios from "axios";

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
    Axios.defaults.withCredentials = true;
    await Axios.get("http://localhost:3005/user-login").then((response) => {
      if(response.data.loggedIn==true){
        console.log(response.data.user)
        this.setState({
          userId: response.data.user[0]["id"],
          redirect: true
        })
        console.log(this.state.userId)
      }
      else 
        console.log(response)
    })
  }
  
  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  login = e => {
    e.preventDefault();
    const data = this.state;
    Axios.post("http://localhost:3005/user-login", data).then((response) => {
      if(response.data.message){
        this.setState({
          error_msg: response.data.message,
          login_error: true
        })
      }
      else{
        console.log(response.data[0]["id"])
        let userId = response.data[0]["id"]
        this.setState({ 
          userId: userId,
          redirect:true
        })
      }
    })
  };

  render() { 
    if(this.state.redirect || this.state.userId)
      return <Redirect to={{ pathname: "/dashboard", state: {userId: this.state.userId} }}/>
    return ( 
      <Container>
      <LogoWrapper>
        {/* <img src={logo} alt="" /> */}
        <h3>
          Minima<span>Line</span>
        </h3>
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
      // color: black;
      margin-bottom: 2rem;
      font-size: 40px;
      align-items: left;
    }
    p{
      color: #ff5c5c;
      font-weight: bold;
    }
    button{
        /* margin-left: 45px; */
        margin-top: 10px;
        width: 75%;
        max-width: 350px;
        min-width: 250px;
        height: 40px;
        border: none;
        box-shadow: 0px 14px 9px -15px rgba(0,0,0,0.25);
        border-radius: 8px;
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
    img{
        height: 6rem;
        margin-bottom: -20px;
    }

    h3{
        text-align:center;
        color: #ec9736;
        font-size: 22px;
    }

    span{
        color: #568d33;
        font-weight: 300;
        font-size: 18px;
    }

`;

const Container = styled.div`
  min-width: 400px;
  /* backdrop-filter: blur(35px); */
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
          // color: #ff8d8d;
          color: #568d33;
          cursor: pointer;
      }
  }
`;
const StyledInput = styled.input`
    width: 80%;
    max-width: 450px;
    min-width: 350px;
    height: 40px;
    border: none;
    margin: 0.5rem 0;
    background-color: #f5f5f5;
    box-shadow: 0px 14px 9px -15px rbga(0,0,0,0.25);
    border-radius: 8px;
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
    // background: #70edb9;
    background: #568d33;
  }
`;

export default SignIn;