import React, { Component } from 'react';
import styled from 'styled-components';
import minimaline_logo from '../assets/MinimaLine.jpeg';
import {MdRestaurantMenu, MdAccountCircle} from 'react-icons/md';
import {AiOutlineUserSwitch} from 'react-icons/ai';
import {Link,Redirect} from 'react-router-dom';
import Modal from 'react-modal';
import Axios from 'axios';
import Auth from '../services/Auth';
Axios.defaults.withCredentials = true;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      clicked: false,
      username: null,
      logo: null,
      id: null,
      redirect: false
     }
     this.handleClick = this.handleClick.bind(this);
     this.handleLogout = this.handleLogout.bind(this);
  }
  async componentDidMount(){
    document.title = "MinimaLine | Dashboard";
      console.log("dashboard")
      await Axios.get(`https://minimaline-server.herokuapp.com/account-info`,{headers: Auth.header()})
      .then((response)=>{
          console.log(response.data[0])
          this.setState({
            id: response.data[0]["id"],
            username: response.data[0]["username"],
            logo: response.data[0]["logo"]
          })
      })
      .catch((error)=> {
        console.log(error)
        this.setState({redirect: true})
      })
    
  }

  handleClick(){
    this.setState({clicked: !this.state.clicked})
  }
  handleLogout(){
    if(Auth.logout())
      this.setState({redirect: true})
  }
  render() {
    if(this.state.redirect)
      return <Redirect to="/"/>
    return ( 
      <Container>
        <div className="logout">
            <button onClick={this.handleLogout}>Logout</button>
        </div>
        <div className="header">
          <HeaderBar>
            <h1>Welcome, {this.state.username}.</h1>
          </HeaderBar>
          <HeaderCircle>
            {this.state.logo ? <img src={this.state.logo}/> : <img src={minimaline_logo}/>}
          </HeaderCircle>
        </div>

        <Body>
          <StyledLink to={{ pathname: "/view-menu" }}
                      style={{textDecoration:'none'}}>
              <MdRestaurantMenu className="icon" size="90px"/>
              <h2>View Menu</h2>
              <p>View and edit the restaurant menu.</p>
          </StyledLink>
          <StyledLink to={{ pathname: "/account" }}
                      style={{textDecoration:'none'}}>
            <MdAccountCircle className="icon" size="90px"/>
            <h2>Account</h2>
            <p>Manage your account and store information.</p>
          </StyledLink>
          <Option onClick={this.handleClick}>
              <AiOutlineUserSwitch className="icon" size="90px"/>
              <h2>Order Page</h2>
              <p>View your store's order page.</p>
          </Option>
        </Body>

        {this.state.clicked ?
          // <ModalContainer>
            <SwitchModal isOpen={true}>
              <button className="close"onClick={this.handleClick}>X</button>
              <h3>Customers can place orders at:</h3>
              <a href={`https://minimaline.netlify.app/store/${this.state.id}`} target="_blank">{`minimaline.netlify.app/store/${this.state.id}`}</a>
              <Link to={`/store/${this.state.id}`} target="_blank">
                <button className="modes">Go!</button>
              </Link>
            </SwitchModal>
          // </ModalContainer>
          : null
        }

      </Container>
     );
  }
}

const Container = styled.div`
  position: absolute;
  overflow: hidden;
  background-color: #faf0e0;
  /* background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%); */
  height: 100%;
  width: 100%;


  .logout{
    right: 0;
    display: flex;
    flex-direction: row;
    height: 95px;
    position: fixed;
    width: 12%;
    align-items: center;
    /* background: blue; */
    z-index: 1;
    display: flex;
    justify-content: center;
  }

  button{
    /* right: 0; */
    /* margin-left: 150vh; */
    top: 30%;
    /* right: 25%; */
    /* margin-left: 140vh; */
    margin-top: -5px;
    z-index: 1;
    position: absolute;
    max-width: 20em;
    background-color: #F9C91E;
    padding: 0.7em 1.5em;
    outline: none;
    border: none;
    border-radius: 1rem;
    font-size: 13px;
    :hover{
      cursor: pointer;
      background-color: white;
      border: 1px solid #F9C91E;
    }
  }

`;
const Body = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* position: fixed; */
  background-color: transparent;
  margin-top: 260px;
  width: 100%;
  height: 100%;
`;
const HeaderCircle = styled.div`
  margin: 40px 0px 0px 130px;
  position: fixed;
  background-color: #f9c91e;
  width: 230px;
  height: 230px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 200px 200px;
  border-bottom-left-radius: 200px 200px;
  border-top-right-radius: 200px 200px;
  border-bottom-right-radius: 200px 200px;
  box-shadow: 3px 3px 5px 3px #d6d6d6;
  /* z-index: 1; */

  img{
    width: 210px;
    height: 210px;
    object-fit: cover;
    border-top-left-radius: 200px 200px;
    border-bottom-left-radius: 200px 200px;
    border-top-right-radius: 200px 200px;
    border-bottom-right-radius: 200px 200px;

    @keyframes fadeIn{
      0% {
        opacity: 0;
      }
      100% { 
        opacity: 1;
      }
    }
    animation: fadeIn 2s;
  }
`;
const HeaderBar = styled.div`
  margin: 95px 0px 0px 300px;
  position: fixed;
  background-color: white;
  width: 100%;
  height: 130px;
  display: flex;
  align-items: center;
  box-shadow: 8px 5px 5px 3px #d6d6d6;
  /* z-index: 0; */

  h1{
    font-size: 50px;
    margin-left: 150px;

    @keyframes fadeInX{
      0% {
        opacity: 0;
        transform: translateX(-10px)
      }
      100% { 
        opacity: 1;
        transform: translateX(0px);
      }
    }
    animation: fadeInX 2s;

    @media screen and (max-width: 1200px){
      font-size: 40px;
      margin-left: 120px;
    }
  }
`;

const StyledLink = styled(Link)`
  height: 330px;
  width: 270px;
  background-color: white;
  box-shadow: 3px 6px 5px 3px #d6d6d6;
  border-radius: 50px;
  margin: 60px 70px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .icon{
    color: #676666;
    margin-top: 50px;
  }

  p{
    padding: 0px 10px;
    text-align: center;
    color: #676666;
    font-family: 'Lato';
  }

  h2{
    color: #676666;
  }

  :hover{
    transform: translateY(3px);
    cursor: pointer;
    background-color: #f9c91e;

    .icon{
      color: black;
    }
    p, h2{
      color: black;
    }
  }

  @keyframes fadeInY{
    0% {
      opacity: 0;
      transform: translateY(-5px);
    }
    100% { 
      opacity: 1;
      transform: translateY(0px);
    }
  }
  animation: fadeInY 2s;

  @media screen and (max-width: 1280px) {
    height: 290px;
    width: 250px;
    margin: 50px 40px;
    .icon{
      margin-top: 40px;
    }
  }
`;
const Option = styled.div`
  height: 330px;
  width: 270px;
  background-color: white;
  box-shadow: 3px 6px 5px 3px #d6d6d6;
  border-radius: 50px;
  margin: 60px 70px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .icon{
    color: #676666;
    margin-top: 50px;
  }

  p{
    padding: 0px 10px;
    text-align: center;
    color: #676666;
    font-family: 'Lato';
  }

  h2{
    color: #676666;
  }

  :hover{
    transform: translateY(3px);
    cursor: pointer;
    background-color: #f9c91e;

    .icon{
      color: black;
    }
    p, h2{
      color: black;
    }
  }

  @keyframes fadeInY{
    0% {
      opacity: 0;
      transform: translateY(-5px);
    }
    100% { 
      opacity: 1;
      transform: translateY(0px);
    }
  }
  animation: fadeInY 2s;

  @media screen and (max-width: 1280px) {
    height: 290px;
    width: 250px;
    margin: 50px 40px;
    .icon{
      margin-top: 40px;
    }
  }
`;
const ModalContainer = styled.div`
  position: relative;
  
`;

const SwitchModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: 3px 6px 5px 3px #d6d6d6;
  border-radius: 8px;
  height: 300px;
  width: 400px;
  margin-top: -150px;
  margin-left: -200px;
  position: absolute;
  top: 50%;
  left: 50%;
  .modes{
        font-family: "Work Sans";
        /* margin: 40px 20px 0px; */
        margin-top: 40px;
        width: 200px;
        height: 60px;
        border: none;
        box-shadow: 0px 10px 9px -15px rgba(0,0,0,0.25);
        border-radius: 8px;
        font-weight: 600;
        font-size: 22px;
        cursor: pointer;

        :hover{
            transform: translateY(2px);
            background-color: #f9c91e;
        }
    }
  .close{
        font-family: "Work Sans";
        background-color: transparent;
        margin: 10px 0px 0px 350px;
        border: none;
        height: 35px;
        width: 30px;
        font-weight: 600;
        font-size: 25px;
        cursor: pointer;

        :hover{
            /* transform: translateY(2px); */
            /* height: 45px;
            width: 45px; */
            border-radius: 8px;
            background-color: #F3D9A4;
        }
    }
    a{
      font-weight: bold;
      margin-top: -10px;
    }
`;
export default App;