import React, { Component } from 'react';
import styled from "styled-components";
import {Link, Redirect} from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
// import UploadPhoto from "./UploadPhoto";
// import Input from "./Input";

class StoreReg extends Component{
  constructor(props){
    super(props)
    this.state = {
      storename: '',
      branch: '',
      manager: '',
      storelogo: null,
      redirect: false
    }
  }
  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleUpload(e){
    this.setState({
      storelogo: e.target.files[0]
    })
  }
  // INSERT AXIOS CALL HERE

  render(){
    if(this.state.redirect)
      return <Redirect to="/dashboard"/>
    return (
      <Container>
        <ArrowWrapper>
          <Link to="/sign-up">
            <BiArrowBack size="40px" color="#676666"/>
          </Link>
        </ArrowWrapper>
        <Form>
            <h2>Store Registration</h2>
            <InputContainer>
              <StyledInput 
                type="text"
                placeholder="Store Name" 
                name="storename"
                value={this.state.storename}
                required
                autocomplete="off"
                onChange={this.handleChange.bind(this)}/>
              <InputStatus />
            </InputContainer>
            <InputContainer>
              <StyledInput 
                type="text"
                placeholder="Branch"
                name="branch"
                value={this.state.branch} 
                required
                autocomplete="off"
                onChange={this.handleChange.bind(this)}/> 
              <InputStatus />
            </InputContainer>
            <InputContainer>
              <StyledInput 
                type="text"
                placeholder="Manager"
                name="manager"
                value={this.state.manager}
                required
                autocomplete="off"
                onChange={this.handleChange.bind(this)}/>
              <InputStatus />
            </InputContainer>
            <p className="header">Store Logo</p>
            <p className="no-logo">If you don't have a logo now, you can upload one later in your Account Settings.</p>
            <InputContainer>
              <StyledUpload
                type="file"
                placeholder="Logo"
                name="storelogo"
                value={this.state.storelogo}
                onChange={this.handleUpload.bind(this)}/>
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
        margin-bottom: 1rem;
        /* margin-left: 90px; */
    }

    button{
        /* margin-left: 50px; */
        margin-top: 30px;
        width: 75%;
        max-width: 350px;
        min-width: 250px;
        height: 40px;
        border: none;
        box-shadow: 0px 14px 9px -15px rgba(0,0,0,0.25);
        border-radius: 8px;
        background-color: #70edb9;
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
      /* margin-left: 160px; */
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
  min-width: 600px;
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
  height: 40px;
  border: none;
  margin: 0.7rem 0;
  background-color: #f5f5f5;
  box-shadow: 0px 14px 9px -15px rbga(0,0,0,0.25);
  border-radius: 8px;
  padding: 0 1rem;
  transition: all 0.2s ease-in;

  &:hover {
      transform: translateY(-3px);
  }
`;
const StyledUpload = styled.input`
  display: none;
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
    background: #70edb9;
  }
`;


export default StoreReg;