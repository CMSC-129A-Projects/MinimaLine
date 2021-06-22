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
    /* height: 500px; */
    height: 55vh;
    width: 35vh;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    /* position: fixed;
    margin-top: 5vh;
    margin-right: 4vh; */
    position: fixed;
    margin-top: 4vh;
    /* margin-right: -44vh;
    right: 0; */
    /* right: -45vh; */
    background: #fff;
    border-radius: 1rem;
    box-shadow: 0px 5px 10px -2px #858585;
    

    h2{
        font-size: 2.5vh;
    }

    .wrapper{
        display: flex;
        flex-direction: row;
        /* margin-left: 20px; */
        margin-left: 2vh;
    }

    .list{
        /* height: 310px; */
        /* height: 350px; */
        height: 100vh;
        overflow: auto;
    }

    .order{
        /* margin-left: 20px; */
        margin-left: 2vh;
        /* margin-top: -20px; */
        margin-top: -2vh;
    }

    .name{
        /* font-size: 20px; */
        font-size: 2vh;
    }

    .title{
        /* height: 70px; */
        height: 10vh;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .price{
        display: flex;
        flex-direction: row;
        /* margin-top: -30px; */
        margin-top: -5vh;
        /* margin-left: 200px; */
        margin-left: 15vh;
        p{
            /* margin-right: 10px; */
            margin-right: 1vh;
            font-size: 2vh;
        }
    }

    .total-price{
        /* height: 50px; */
        height: 19vh;
        /* margin-left: 40px; */
        margin-left: 4vh;
        /* margin-top: 50px; */
        /* margin-top: 0px; */
    }

    /* img{
        height: 200vh;
        width: 200vh;
        margin-top: -60px;
    }
    @media screen and (max-width: 1024px) {
        margin-right: 27px;
        img{
            height: 180px;
            width: 180px;
        }
    } */
`;
const Edit = styled(MdModeEdit)`
    :hover{
        cursor: pointer;
        color: #F9C91E;
    }
`;
export default OrderSum;