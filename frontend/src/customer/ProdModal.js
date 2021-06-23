import React, { Component } from "react";
import styled from "styled-components";
import Modal from 'react-modal';

class ProdModal extends Component {
    constructor(props) {
        super(props);
        this.state = {    
            count: 0,
            product: null
        }
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.addOrder = this.addOrder.bind(this);
    }
    componentDidMount(){
        console.log(this.props)
        this.setState({product: this.props})
    }
    increment(){
        if(this.state.count < 50){
            this.setState({count:this.state.count+1})
        }
    }

    decrement(){
        if(this.state.count > 0){
            this.setState({count:this.state.count-1})
        }
    }
    addOrder(){
        const order = {
            product: this.state.product,
            quantity: this.state.count,
            price: this.props["price"]*this.state.count
        }
        this.props.add(order)
    }

    render() { 
        var modalStyle={overlay: {zIndex: 2}}
        return (  
            <ModalContainer>
                <ProductModal isOpen={true} style={modalStyle}>
                    <div className="left">
                        <div className="name-container">
                            <h1>{this.props["product"]}</h1>
                        <h2>{this.props["price"]}</h2>
                        <div className="counter">
                            {this.state.count>0 ?
                            <button onClick={this.decrement}>-</button>
                            : null}
                            <span> {this.state.count} </span>
                            <button onClick={this.increment}>+</button>
                        </div>
                        <div className="buttons">
                            {this.state.count>0 ? 
                            <button className="add-order" onClick={this.addOrder}>Add Order</button>
                            : null}
                            <button className="cancel" onClick={this.props.show}>Cancel</button>
                        </div>
                        </div>
                    </div>
                    <img src={this.props["photo"]}/>
                </ProductModal>
            </ModalContainer>
        );
    }
}

const ModalContainer = styled.div`
  position: relative;
`;

const ProductModal = styled(Modal)`
  outline: none;
  background-color: white;
  box-shadow: 3px 6px 5px 3px #d6d6d6;
  border-radius: 15px;
  height: 500px;
  width: 700px;
  margin-top: -250px;
  margin-left: -350px;
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .name-container{
    width: 260px;
    position: absolute;
    margin-left: -320px;
    outline: none;
    margin-top: -80px;
  }
 
  img{
    position: fixed;
    height: 310px;
    width: 310px;
    margin-left: 130px;
  }
  
  .left{

    h1{
        word-wrap: break-word;
        margin-top: -100px;
        font-size: 200%;
        margin-left: 45px;
    }

    h2{
        margin-left: 45px;
        margin-top: -15px;
        margin-bottom: 80px;
        color: #617d98;
        font-size: 2rem;
    }

    .counter{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        button{
            width: 30px;
            height: 30px;   
            color: black;
            border: none;
            background-color: #d6d6d6;
            border-radius: 8px;
            :hover{
                cursor: pointer;
            }
        }

        span{
            margin: 0px 8px;
        }
    }
  }
  



  .buttons{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    button{
        font-family: "Work Sans";
        margin: 30px 20px 0px;
        width: 150px;
        height: 50px;
        border: none;
        box-shadow: 0px 10px 9px -15px rgba(0,0,0,0.25);
        border-radius: 8px;
        font-weight: 600;
        font-size: 18px;
        cursor: pointer;

        :hover{
            transform: translateY(2px)
        }
    }
    .cancel{
        color: #fff;
        background-color: #FF5C5C;
        box-shadow: 0px 14px 9px -15px rgba(0,0,0,0.25);
    }
    .add-order{
        color: black;
        background-color: #F9C91E;
    }
  }
  
`;
 
export default ProdModal;