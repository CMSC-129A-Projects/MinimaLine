import React, { Component } from 'react';
import styled from "styled-components";
import { BiArrowBack } from "react-icons/bi";
import {Link,Redirect} from 'react-router-dom';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            total_price: null,
            orders: [],
            notes: '',
            redirect: false,
            id: null
         }
         this.confirmOrder = this.confirmOrder.bind(this)
    }
    componentDidMount(){
        document.title = "MinimaLine | Checkout";
        let customer = JSON.parse(sessionStorage.getItem("customer"))
        this.setState({id: customer[0]["id"]})
        let orderlist = JSON.parse(sessionStorage.getItem("order"))
        if(!orderlist)
            this.setState({redirect: true})
        else{
            this.setState({
                total_price: orderlist.pop().total_price,
                orders: orderlist
            })
        }
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    confirmOrder(){
        let customer = JSON.parse(sessionStorage.getItem("customer"))
        console.log(customer)
        const order = {
            store_id: customer[0]["id"],
            priority_type: customer[1]["priority_type"],
            dine_in: customer[1]["dine_in"],
            orderlist: this.state.orders,
            total_price: this.state.total_price,
            notes: this.state.notes
        }
        console.log(order)
    }
    render() { 
        if(this.state.redirect)
            return(<Redirect to={`/store/${this.state.id}`}/>)
        return (
            <Container>
                <ArrowWrapper>
                    <Link to={`/store/${this.state.id}/order`}>
                    <BiArrowBack size="40px" color="#676666"/>
                    </Link>
                </ArrowWrapper>
                <h1>Checkout</h1>
                <Table>
                {this.state.orders.map((order,index)=>{
                    return (
                        <tr>
                            <td width="10%"><img src={order["product"]["photo"]}/></td>
                            <td width="50%">{order["product"]["product"]}</td>
                            <div className="counter">
                                <button>-</button>
                                    <span>
                                    <td width="20%">{order["quantity"]}</td>
                                    </span>
                                <button>+</button>
                            </div>
                            <td width="20%">Php {order["price"]}</td>
                        </tr>
                    )
                })}
                </Table>
                <hr/>
                <div className="total-price">
                    <h2>Total</h2>
                    <h2>Php {this.state.total_price}</h2>
                </div>
                <div className="bottom">
                    <h2>Order Notes</h2>
                    <textarea type="text" placeholder="Optional"
                        autoComplete="off" name="notes"
                        value={this.state.notes} onChange={this.handleChange.bind(this)} />
                    <Link to={`/store/${this.state.id}/confirm`}>
                        <button onClick={this.confirmOrder}>Confirm</button>
                    </Link>
                </div>
            </Container>
        );
    }
}

const Container = styled.div`
    background-color: white;
    box-shadow: 3px 6px 5px 3px #d6d6d6;
    border-radius: 30px;
    height: 86vh;
    width: 177vh;
    margin-top: -43vh;
    margin-left: -89vh;
    position: absolute;
    top: 50%;
    left: 50%;
    align-items: center;
    justify-content: center;

    h1{
        font-size: 5vh;
        margin-left: 10vh;
        margin-top: -1vh;
    }

    hr{
        color: #676666;
        width: 70%;
        margin-top: 45vh;
    }

    .total-price{
        display: flex;
        flex-direction: row;
        margin-left: 95vh;
        margin-top: -1vh;
        
        h2{
            margin-right: 5vh;
            font-size: 3vh;
        }
    }

    .bottom{
        margin-top: -8vh;
        margin-left: 27vh;
        font-size: 2vh;

        button{
            outline: none;
            position: absolute;
            font-family: "Work Sans";
            margin-top: 2vh;
            margin-left: 60vh;
            width: 20vh;
            height: 10vh;
            border: none;
            box-shadow: 0px 10px 9px -15px rgba(0,0,0,0.25);
            border-radius: 20px;
            font-weight: 600;
            font-size: 3vh;
            cursor: pointer;
            color: black;
            background-color: #f9c91e;
            :hover{
                transform: translateY(2px)
            }
        }
    }
    
    textarea{
        outline: none;
        width: 80%;
        width: 45vh;
        height: 11vh;
        border: none;
        margin: -0.5rem 0;
        background-color: #f5f5f5;
        box-shadow: 0px 14px 9px -15px rbga(0,0,0,0.25);
        border-radius: 8px;
        padding: 1vh 1vh;
        transition: all 0.2s ease-in;
        font-family: "Work Sans";
    }
    
`;

const Table = styled.table`
    table-layout: fixed;
    width: 100vh;
    margin-left: -50vh;
    position: absolute;
    left: 50%;
    font-size: 3vh;
    display: block;
    overflow: auto;
    height: 41vh;

    .counter{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 1vh;

        button{
            outline: none;
            width: 3vh;
            height: 3vh;   
            color: black;
            border: none;
            background-color: #d6d6d6;
            border-radius: 8px;
        }

        span{
            margin: 0vh 1vh;
        }
    }

    img{
        width: 8vh;
        height: 6vh;
    }
`;

const ArrowWrapper = styled.div`
    margin-top: 5vh;
    margin-left: 5vh;
`

export default Checkout;