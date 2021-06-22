import React, { Component } from 'react';
import styled from "styled-components";
import {Link,Redirect} from 'react-router-dom';
import img from '../assets/confirm.png';

class Confirmation extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id: null,
            redirect: false
         }
         this.clearSession = this.clearSession.bind(this)
    }

    componentDidMount(){
        document.title = "MinimaLine | Confirm Order"
        let customer = JSON.parse(sessionStorage.getItem("customer"))
        this.setState({id: customer[0]["id"]})
        if(!sessionStorage.getItem("order"))
            this.setState({redirect: true})
    }
    clearSession(){
        sessionStorage.removeItem("customer")
        sessionStorage.removeItem("order")
    }
    render() { 
        if(this.state.redirect)
            return(<Redirect to={`/store/${this.state.id}`}/>)
        return ( 
            <Background>
                 <Container>
                    <div>
                        <h1>Your order has been confirmed.</h1>
                        <img src={img}/>
                        <h2>Please proceed to the cashier for payment.</h2>
                    </div>
                    <Link to={`/store/${this.state.id}`}>
                        <button onClick={this.clearSession}>
                            Okay
                        </button>
                    </Link>
                </Container>
            </Background>
        );
    }
}
const Background = styled.div`
    width: 100%;
    height: 100%;
    background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
    /* background-image: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%); */
`;

const Container = styled.div`
    background-color: white;
    box-shadow: 0px 5px 10px -2px #858585;
    border-radius: 70px;
    height: 80vh;
    width: 80vh;
    margin-top: -40vh;
    margin-left: -40vh;
    position: absolute;
    top: 50%;
    left: 50%;
    align-items: center;
    justify-content: center;
    text-align: center;

    h1{
        margin-top: 5vh;
        font-weight: bolder;
        font-size: 4vh;

    }

    h2{
        margin-top: -1vh;
        padding: -20vh 70vh;
        font-weight: lighter;
    }

    img{
        margin-top: -10vh;
        width: 50vh;
        height: 50vh;
    }

    button{
        outline: none;
        margin-top: 2vh;
        font-family: "Work Sans";
        width: 20vh;
        height: 10vh;
        border: none;
        box-shadow: 0px 10px 9px -15px rgba(0,0,0,0.25);
        border-radius: 20px;
        font-weight: 600;
        font-size: 25px;
        cursor: pointer;
        color: black;
        background-color: #f9c91e;
        :hover{
            transform: translateY(2px);
        }
    }
`

export default Confirmation;