import React, { Component } from "react";
import styled from "styled-components";
import { MdModeEdit } from "react-icons/md";
import EditModal from './EditModal';


class OrderSum extends Component {   
    constructor(){
        super();
        this.state = {
            total_price: null,
            showEditModal: false,
            current: null
        }
        this.handleClick = this.handleClick.bind(this)
        this.updateOrder = this.updateOrder.bind(this)
    } 
    handleClick(product){
        this.setState({
            showEditModal: !this.state.showEditModal,
            current: product
        })
    }
    updateOrder(order,mode){
        this.props.update(order,mode)
        this.handleClick();
    }

    render() { 
        return (
            <Container>
                <div className="title">
                    <h1>Order Summary</h1>
                </div>
                <div className="list">
                    {this.props.order.map((order,index)=>{
                        return(
                            <div className="wrapper">
                                <Edit onClick={()=>this.handleClick(order)}/>
                                <div className="order">
                                    <div>
                                        <p className="name">{order["product"]["product"]}</p>
                                    </div>
                                    <div className="price">
                                        <p>x{order["quantity"]}</p>
                                        <p>Php {order["price"]}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })} 
                </div>
                <div className="total-price">
                    <h2>Total Price: Php {this.props.total}</h2>
                </div>
                {this.state.showEditModal ?
                    <EditModal product={this.state.current} show={this.handleClick} onClick={this.updateOrder}/> 
                : null}
            </Container>
        );
    }
}

const Container = styled.div`
    height: 55vh;
    width: 35vh;
    display: flex;
    flex-direction: column;
    position: fixed;
    margin-top: 4vh;
    background: #fff;
    border-radius: 1rem;
    box-shadow: 0px 5px 10px -2px #858585;
    

    h2{
        font-size: 2.5vh;
    }

    .wrapper{
        display: flex;
        flex-direction: row;
        margin-left: 2vh;
    }

    .list{
        height: 100vh;
        overflow: auto;
    }

    .order{
        margin-left: 2vh;
        margin-top: -2vh;
    }

    .name{
        font-size: 2vh;
    }

    .title{
        height: 10vh;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .price{
        display: flex;
        flex-direction: row;
        margin-top: -4vh;
        margin-left: 13vh;
        p{
            margin-right: 1vh;
            font-size: 2vh;
        }
    }

    .total-price{
        height: 19vh;
        margin-left: 4vh;
    }
`;
const Edit = styled(MdModeEdit)`
    :hover{
        cursor: pointer;
        color: #F9C91E;
    }
`;
export default OrderSum;