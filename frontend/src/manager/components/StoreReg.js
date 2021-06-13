import React, { Component } from 'react';
import Axios from "axios"
import styled from "styled-components";
import {Link, Redirect} from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { FiUpload } from "react-icons/fi";
// import UploadPhoto from "./UploadPhoto";
// import Input from "./Input";

class StoreReg extends Component{
  constructor(props){
    super(props)
    this.state = {
      store_name: '',
      manager_name: '',
      location: '',
      logo: '',
      redirect: false,
      userId: null
    }
  }
  componentDidMount(){
    document.title = "MinimaLine | Store Registration"
    console.log(this.props.location.state.userId)
    this.setState({ userId: this.props.location.state.userId })
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleUpload(e){
    console.log(e.target.files[0])
    this.setState({
      logo: e.target.files[0]
    })
  }
  
  registerStore = e => {
    console.log(this.state.storeId)
    const data = {
      store_name: this.state.store_name,
      manager_name: this.state.manager_name,
      location: this.state.location,
      logo: this.state.logo//img
    };
    console.log('hello this is your input:',data)
    e.preventDefault();
    Axios.post(`http://localhost:3005/store-registration/${this.state.userId}`,data).then((response) => {
      console.log(response)
      this.setState({redirect:true})
    })
    .catch(error => {
      console.log(error.response)
    })
  };

  render(){
    if(this.state.redirect)
      return <Redirect to={{ pathname: "/dashboard", state: {userId: this.state.userId} }}/>
    return (
      <Container>
        <ArrowWrapper>
          <Link to="/sign-up">
            <BiArrowBack size="40px" color="#676666"/>
          </Link>
        </ArrowWrapper>
        <LogoWrapper>
        {/* <img src={logo} alt="" /> */}
        <h3>
          Minima<span>Line</span>
        </h3>
      </LogoWrapper>
        <Form onSubmit={this.registerStore}>
            <h2>Store Registration</h2>
            <InputContainer>
              <StyledInput 
                type="text"
                placeholder="Store Name" 
                name="store_name"
                value={this.state.store_name}
                required
                minLength="3"
                maxLength="255"
                autoComplete="off"
                onChange={this.handleChange.bind(this)}/> 
              <InputStatus />
            </InputContainer>
            <InputContainer>
              <StyledInput 
                type="text"
                placeholder="Branch"
                name="location"
                value={this.state.location} 
                required
                autoComplete="off"
                onChange={this.handleChange.bind(this)}/> 
              <InputStatus />
            </InputContainer>
            <InputContainer>
              <StyledInput 
                type="text"
                placeholder="Manager"
                name="manager_name"
                value={this.state.manager_name}
                required
                autoComplete="off"
                onChange={this.handleChange.bind(this)}/>
              <InputStatus />
            </InputContainer>
            <p className="header">Store Logo</p>
            <p className="no-logo">If you don't have a logo now, you can upload one later in your Account Settings.</p>
            <InputContainer>
              <StyledUpload
                type="file"
                placeholder="Logo"
                name="logo"
                // value={this.state.logo}
                onChange={this.handleUpload.bind(this)}
                />
            </InputContainer>
            <button type="submit"> Submit </button>
        </Form>
  
      </Container>
    );
  }
};

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 170px;
    margin-right: 50px;

    h2{
      color: #666666;
      margin-bottom: 2rem;
      font-size: 40px;
      align-items: left;
      margin-left: -20px;
    }

    button{
      margin-top: 25px;
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

    .header{
      margin-top: 5px;
      color: #757575;
      font-weight: bold; 
      font-size: 20px;
    }
    .no-logo{
      color: #757575;
      text-align: center;
      margin: -10px 0px 20px;
      font-size: 12px;
      padding: 0px 100px;
    }
`;

const ArrowWrapper = styled.div`
  margin-top: 50px;
  margin-left: 30px;
`;

const Container = styled.div`
  min-width: 665px;
  backdrop-filter: blur(35px);
  background-color: rgba(255, 255, 255, 0.5);
  height: 100%;
  display: flex;
  justify-content: space-evenly;

  @media (max-width: 900px){
      width: 100vw;
      position: absolute;
      padding: 0;
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

const StyledUpload = styled.input`
  ::file-selector-button{
    border: none;
    padding: 1.5em 1em;
    border-radius: 17px;
    background-color: white;
    transition: 1s;
    color: #666666;
  }
`;

const InputContainer  = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const InputStatus = styled.div`
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

const LogoWrapper = styled.div`
  position: fixed;
  margin-top: 80px;
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

export default StoreReg;