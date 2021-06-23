import React, { Component } from 'react';
import styled from 'styled-components';
import photo from '../assets/404.png'

class NotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <Container>
                <img src={photo}/>
                <Text>
                    <h1>Oh no!</h1>
                    <p>This page cannot be found.</p>
                </Text>
            </Container>
         );
    }
}
const Container = styled.div`
    background-color: #faf0e0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    img{
        height: 50%;
    }
`;
const Text = styled.div`
    display: flex;
    flex-direction: column;
    h1{
        font-size: 90px;
        color: #ec9736;
        text-shadow: 2px 2px #568d33;
        margin-top: -15px;
    }
    p{
        margin-top: -40px;
        font-size: 20px;
        color: #676666;
    }
`;
export default NotFound;