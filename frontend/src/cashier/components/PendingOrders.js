import React, { Component } from 'react';
import styled from "styled-components";
import {Link} from 'react-router-dom';
import {FaLongArrowAltRight} from "react-icons/fa";
import search from "../../assets/search.png";
import burger_img from "../../assets/burger.png";
import fries_img from "../../assets/fries.png";
import Orders from "./Orders";

class PendingOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount(){
      document.title = "MinimaLine | Cashier"
    }

    render() { 
        const Order = (props) => {
            const {order_num, type} = props.order;
            return (
                <article>
                    <h1>{order_num}</h1>
                    <h2>{type}</h2>
                </article> 
            );
        };

        return ( 
            <Container>
                <div className="left">
                    <h1>Priority Type</h1>
                    <div className="orderlist">
                    <Table>
                        <tr>
                            <td width="10%"><img src={burger_img}/></td>
                            <td width="50%">Potasdsgdfgdalsa</td>
                                    <td width="10%">2</td>
                            <td width="30%">Php 300.00</td>
                        </tr>
                        <tr width="10%">
                            <td><img src={fries_img}/></td>
                                <td width="50%">McFries</td>
                                        <td width="=10%">3</td>
                                <td width="30%">Php 90.00</td>
                        </tr>
                        <tr width="10%">
                            <td><img src={burger_img}/></td>
                            <td width="50%"> McBurger</td>
                                    <td width="10%">2</td>
                            <td width="30%">Php 300.00</td>
                        </tr>
                        <tr width="10%">
                            <td><img src={fries_img}/></td>
                                <td width="50%">McFries</td>
                                    <td width="10%">3</td>
                                <td width="30%">Php 90.00</td>
                        </tr>
                        <tr width="10%">
                            <td><img src={burger_img}/></td>
                            <td width="50%">McBurger</td>
                                <td width="10%">2</td>
                            <td width="30%">Php 300.00</td>
                        </tr>
                        <tr width="10%">
                            <td><img src={fries_img}/></td>
                                <td width="50%">McFries</td>
                                    <td width="10%">3</td>
                                <td width="30%">Php 90.00</td>
                        </tr>
                        <tr width="10%">
                            <td><img src={fries_img}/></td>
                                <td width="50%">McFries</td>
                                    <td width="10%">3</td>
                                <td width="30%">Php 90.00</td>
                        </tr>
                        <tr width="10%">
                            <td><img src={burger_img}/></td>
                            <td width="50%">McBurger</td>
                                <td width="10%">2</td>
                            <td width="30%">Php 300.00</td>
                        </tr>
                        <tr width="10%">
                            <td><img src={fries_img}/></td>
                                <td width="50%">McFries</td>
                                    <td width="10%">3</td>
                                <td width="30%">Php 90.00</td>
                        </tr>
                        <tr width="10%">
                            <td><img src={fries_img}/></td>
                                <td width="50%">McFries</td>
                                    <td width="10%">3</td>
                                <td width="30%">Php 90.00</td>
                        </tr>
                        <tr width="10%">
                            <td><img src={burger_img}/></td>
                            <td width="50%">McBurger</td>
                                <td width="10%">2</td>
                            <td width="30%">Php 1000.00</td>
                        </tr>
                        <tr width="10%">
                            <td><img src={fries_img}/></td>
                                <td width="50%">McFries</td>
                                    <td width="10%">3</td>
                                <td width="30%">Php 90.00</td>
                        </tr>
                                                <tr width="10%">
                            <td><img src={fries_img}/></td>
                                <td width="50%">McFries</td>
                                    <td width="10%">3</td>
                                <td width="30%">Php 90.00</td>
                        </tr>
                        <tr width="10%">
                            <td><img src={burger_img}/></td>
                            <td width="50%">McBurger</td>
                                <td width="10%">2</td>
                            <td width="30%">Php 1000.00</td>
                        </tr>
                        <tr width="10%">
                            <td><img src={fries_img}/></td>
                                <td width="50%">McFries</td>
                                    <td width="10%">3</td>
                                <td width="30%">Php 90.00</td>
                        </tr>
                    </Table>
                    </div>

                    <div className="notes-container">
                        <h2>Order Notes</h2>
                        <div className="notes">
                            <p>No ketchup and mayo</p>
                        </div>
                    </div>
                    <div className="price">
                        <div className="total-price">
                            <h1>Total Price</h1>
                            <h3>Php 4,030.00</h3>
                        </div>
                        <button className="confirm">
                            Confirm
                        </button>
                        <button className="cancel">
                            Cancel
                        </button>
                    </div>
                </div>
                <div className="right">
                    <div>
                        <h1>Pending <br/> Orders</h1>
                        <div className="arrow">
                            <h2>Cancelled orders</h2>
                            <FaLongArrowAltRight size="30px" color="black"/>
                        </div>
                        <Search>
                            <input className="searchbox"
                                type="number"
                                placeholder="Search here"
                            />
                            <button className="search-button">
                                <img src={search}/>
                            </button>
                        </Search>
                    </div>
                    <OrderGrid>
                        <section className='order-list'> 
                        {Orders.map((order,index)=>{
                                return (
                                    <div
                                        onClick={()=>this.changeColor(index)}
                                        className={(this.state.clicked && (this.state.current===index)) ? 'clicked' : 'unclicked'}>
                                        <Order key={index} order={order}></Order>
                                    </div>
                                )
                            })}
                        </section>
                    </OrderGrid>
                </div>
            </Container>
        );
    }
}

const Container = styled.div`
    align-items: center;
    justify-content: center;
    text-align: center;

    .left{
        
        h1{
            margin-left: 40px;
            font-size: 30px;  

            @media screen and (max-width: 1470px) {
                margin-left: 120px;
            }
            @media screen and (max-width: 1300px) {
                margin-left: 40px;
            }
        }

        h2{
            position: absolute;
            margin-left: 40px;
            margin-top: 410px;
            font-size: 30px;  
        }

        p{
            text-align: left;
            margin-left: 30px;
        }

        .orderlist{
            position: absolute;
            background-color: white;
            box-shadow: 0px 5px 10px -2px #858585;
            border-radius: 35px;
            height: 400px;
            width: 780px;
            margin-top: -10px;
            margin-left: 40px;  

            @media screen and (max-width: 1470px) {
                height: 370px;
                width: 500px;
                margin-top: -10px;
                margin-left: 120px; 
            }

            @media screen and (max-width: 1300px) {
                height: 266px;
                width: 500px;
                margin-top: -10px;
                margin-left: 40px; 
            }
        }

        .notes-container{
            h2{
                @media screen and (max-width: 1470px) {
                    margin-top: 370px;
                    margin-left: 120px;
                }

                @media screen and (max-width: 1300px) {
                    margin-top: 266px;
                    margin-left: 40px;
                }
            }
            .notes{
                position: absolute;
                background-color: white;
                box-shadow: 0px 5px 10px -2px #858585;
                border-radius: 30px;
                height: 100px;
                width: 760px;
                margin-top: 460px;
                margin-left: 40px;  
                padding: 5px;

                @media screen and (max-width: 1470px) {
                    height: 70px;
                    width: 490px;
                    margin-top: 410px;
                    margin-left: 120px;  
                    padding: 5px;
                    font-size: 13px;
                }   

                @media screen and (max-width: 1300px) {
                    height: 55px;
                    width: 490px;
                    margin-top: 302px;
                    margin-left: 37px;  
                    padding: 5px;
                    font-size: 13px;
                }
            }      

        }

        .price{
            position: absolute;
            background-color: white;
            box-shadow: 0px 5px 10px -2px #858585;
            border-radius: 40px;
            height: 215px;
            width: 780px;
            margin-top: 590px;
            margin-left: 40px; 

            @media screen and (max-width: 1470px) {
                border-radius: 30px;
                height: 160px;
                width: 500px;
                margin-top: 510px;
                margin-left: 120px; 
            }

            @media screen and (max-width: 1300px) {
                border-radius: 30px;
                height: 160px;
                width: 500px;
                margin-top: 387px;
                margin-left: 40px; 
            }

            .total-price{
                position: absolute;
                background-color: #f5f5f5;
                box-shadow: 0px 5px 10px -4px #858585;
                border-radius: 40px;
                height: 60px;
                width: 620px;
                margin-top: 20px;
                margin-left: 85px; 

                @media screen and (max-width: 1470px) {
                    border-radius: 40px;
                    height: 40px;
                    width: 410px;
                    margin-top: 15px;
                    margin-left: 50px; 
                }

                h1{
                    position: absolute;
                    margin-top: 15px;
                    margin-left: 20px;

                    @media screen and (max-width: 1470px) {
                        margin-top: 5px;
                        margin-left: 20px;
                        font-size: 23px;
                    }
                }

                h3{
                    font-size: 27px;
                    position: absolute;
                    margin-top: 15px;
                    margin-left: 400px;

                    @media screen and (max-width: 1470px) {
                        margin-top: 5px;
                        margin-left: 240px;
                        font-size: 23px;
                    }
                }
            } 

            button{
                outline: none;
                margin-left: 10px;
                margin-top: 100px;
                font-family: "Work Sans";
                width: 300px;
                height: 90px;
                border: none;
                box-shadow: 0px 10px 9px -15px rgba(0,0,0,0.25);
                border-radius: 30px;
                font-weight: 600;
                font-size: 25px;
                cursor: pointer;
                color: black;
                background-color: #f9c91e;         
                
                :hover{
                    transform: translateY(2px)
                }
      
                @media screen and (max-width: 1470px) {
                    margin-left: 10px;
                    margin-top: 75px;
                    width: 200px;
                    height: 70px;
                    border-radius: 30px;
                    font-weight: 600;
                    font-size: 25px;
                }
            }
            .cancel{
                color: #fff;
                background-color: #FF5C5C;
            }
        }

    }
    
    .right{
        position: absolute;
        background-color: white;
        box-shadow: 0px 5px 10px -2px #858585;
        border-radius: 70px;
        height: 850px;
        width: 1000px;
        margin-top: -45px;
        margin-left: 870px;


        @media screen and (max-width: 1470px) {
            height: 720px;
            width: 670px;
            margin-top: -45px;
            margin-left: 660px;
        }

        @media screen and (max-width: 1300px) {
            height: 590px;
            margin-left: 568px;
        }

        h1{
            text-align: left;
            margin-left: 40px;
            font-size: 60px;  

            @media screen and (max-width: 1470px) {
                font-size: 40px;  
            }
        }

        .arrow{
            position: absolute;
            margin-left: 720px;
            margin-top: -180px;
            display: flex;
            flex-direction: row;
  
            @media screen and (max-width: 1470px) {
                margin-left: 420px;
                margin-top: -120px;
            }

            h2{
                margin-top: -1px;
                margin-right: 10px;

                @media screen and (max-width: 1470px) {
                    font-size: 21px;
                }
            }
        }
    }
`

const Search = styled.div`
    position: absolute;
    margin-top: -110px;
    margin-left: 590px;
    display: flex;
    flex-direction: row;

    @media screen and (max-width: 1470px) {
        margin-top: -80px;
        margin-left: 280px;
    }

    .search-button{
        background: transparent;
        border: none;
        outline: none;
        margin-left: -40px;
    }

    .search-button img{
        width: 20px;
        height: 20px;
        object-fit: cover;
    }
    input{
        padding-left: 20px;
        width: 80%;
        max-width: 450px;
        min-width: 350px;
        height: 40px;
        border: none;
        margin: 0.5rem 0;
        background-color: #f5f5f5;
        border-radius: 50px;
    }
`

const Table = styled.table`
    table-layout: fixed;
    width: 90%;
    position: absolute;
    left: 50%;
    font-size: 20px;
    margin-left: -345px;
    display: block;
    overflow: auto;
    height: 400px;
    
    @media screen and (max-width: 1470px) {
        table-layout: fixed;
        height: 366px;
        width: 90%;
        position: absolute;
        left: 50%;
        font-size: 15px;
        margin-left: -225px;
        display: block;
        overflow: auto;
    }

    @media screen and (max-width: 1300px) {
        table-layout: fixed;
        height: 265px;
        width: 90%;
        position: absolute;
        left: 50%;
        font-size: 15px;
        margin-left: -225px;
        display: block;
        overflow: auto;
    }

    td{
        text-align: left;
    }
    .counter{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 15px;
    }

    img{
        width: 7vh;
        height: 5vh;
        margin-right: 15px;
    }
`;

const OrderGrid = styled.div`
    .order-list {
        position: absolute;
        height: 600px;
        width: 93%;
        margin-top: -10px;
        margin-left: 60px;
        display: grid;
        gap: 2rem;
        grid-template-columns: repeat(5, 150px);
        overflow-y: auto;

        @media screen and (max-width: 1470px) {
            height: 520px;
            gap: 1rem;
            margin-left: 30px;
            grid-template-columns: repeat(4, 140px);
            margin-top: 24px;
        }

        @media screen and (max-width: 1300px) {
            height: 420px;
            gap: 1rem;
            margin-left: 30px;
            grid-template-columns: repeat(4, 140px);
            margin-top: -5px;
        }
    }

    .clicked{
        background: #F9C91E;
        border-radius: 1rem;
        transition: all 0.2s ease-in;
        text-align: center;
        box-shadow: 0px 5px 10px -4px #858585;

        &:hover {
            transform: translateY(-4px);
            cursor: pointer;
        }

        h1{
            margin-top: 0.5rem;
        }

        h2{
            color: #617d98;
            font-size: 0.9rem;
            margin-top: -40px;
        }
        @media screen and (max-width: 1470px) {
            height: 110px;
        }
    }
    .unclicked{
        background: #f9c91e;
        border-radius: 1rem;
        transition: all 0.2s ease-in;
        text-align: center;
        box-shadow: 0px 5px 10px -2px #858585;

        &:hover {
            transform: translateY(-4px);
            background: #F3D9A4;
            cursor: pointer;
        }

        h1{
            margin-top: 0.5rem;
        }

        h2{
            color: #617d98;
            font-size: 0.9rem;
            margin-top: -40px;
        }

        @media screen and (max-width: 1470px) {
            height: 110px;
        }
    }
`;

export default PendingOrders;