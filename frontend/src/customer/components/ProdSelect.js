import React, { Component } from "react";
import styled from "styled-components";
import {Link,Redirect} from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import Categ from "../../manager/components/Categ";
import OrderSum from "./OrderSum";
import Modal from 'react-modal';
import ProdModal from './ProdModal';
import Axios from 'axios';
import CustomerFn from '../../services/CustomerFn';

class ProdSelect extends Component {
    constructor(){
        super();
        this.state = {
            clicked: false,
            current: null,
            all_categs: [],
            prods: [],
            openProdModal: false,
            redirect: null,
            id: null
        }
        this.changeColor = this.changeColor.bind(this);
        this.showModal = this.showModal.bind(this);
        this.showProducts = this.showProducts.bind(this);
    }

    showModal(index){
        this.setState({
            openProdModal: !this.state.openProdModal,
            current: index,
            clicked: true
        })
    }
    async componentDidMount(){
        document.title = "MinimaLine | Product Selection"
        let path = window.location.pathname
        let id = parseInt(path.split('/')[2])
        console.log(id)
        await Axios.post('https://minimaline-server.herokuapp.com/check-store',{id:id})
        .then(response =>{
            if(response.data.message){
                console.log("message")
                console.log(response.data)
                this.setState({redirect:1})
            }
            else{
                console.log(response)
                CustomerFn.verifyId(id).then((error)=>{
                    if(error){
                        console.log("henlo")
                        this.setState({
                            id: error.id,
                            redirect: 2
                        })
                    }
                    else{
                        console.log("ばか！！！")
                        this.setState({id:id})
                    }
                })
            }
        })
        .catch(err => {
            console.log("error")
            this.setState({redirect:1})
        })
        if(!this.state.redirect){
            let categs = await Axios.get(`https://minimaline-server.herokuapp.com/display-category/${this.state.id}`);
            if(JSON.stringify(categs.data)==='{}'){
                this.showProducts("empty")
            }
            else{
                this.setState({
                    all_categs: categs.data
                })
                this.showProducts(this.state.all_categs[0]["id"])
            }
        }
    }
    async showProducts(categ_id){
        if(categ_id!=="empty"){
            let categProds = await Axios.get(`https://minimaline-server.herokuapp.com/menu-info/${this.state.id}/${categ_id}`);
            this.setState({
                prods: categProds.data,
                clicked: false,
                current: null
            })
        }
    }
    changeColor(index){
        if(this.state.current !== index)
            this.setState({
                current: index,
                clicked: true
            })
    }

    render() { 
        if(this.state.redirect===1)
            return(<Redirect to="/not-found"/>)
        else if(this.state.redirect===2)
            return(<Redirect to={`/store/${this.state.id}`}/>)
        // var modalStyle={overlay: {zIndex: 2}}
        return( 
            <Container>

                <Wrapper>
                    <Arrow>
                        <ArrowWrapper>
                            <Link to={`/store/${this.state.id}`}>
                                <BiArrowBack size="40px" color="#676666"/>
                            </Link>
                        </ArrowWrapper>
                    </Arrow>
                    <Nav>
                        {/* <Categ mode={"view"}/>  */}
                        <Categ mode={"view"} categs={this.state.all_categs} onClick={this.showProducts}/> 
                    </Nav>
                    {!this.state.prods.length ?
                        <ProdGrid>
                            <div className="productlist">
                                <h3> No products in this category.</h3>
                            </div>
                        </ProdGrid>
                        : <ProdGrid>
                            <section className='productlist'> 
                            {this.state.prods.map((prod,index)=>{
                                    return (
                                        <div
                                            onClick={()=>this.showModal(index)}
                                            onClick={()=>this.changeColor(index)}
                                            className={(this.state.clicked && (this.state.current===index)) ? 'clicked' : 'unclicked'}>
                                            <article>
                                                <h3><img className='image' src={prod["photo"]} alt="No image"/></h3>
                                                <h1>{prod["product"]}</h1>
                                                <h2>Php {prod["price"]}</h2>
                                                <h2>{prod["availability"]===1 ? "Available" : "Not Available"}</h2>
                                            </article> 
                                        </div>
                                    )
                                })}
                                {this.state.openProdModal ? <ProdModal {...this.state.prods[this.state.current]} mode={this.showModal}/> : null }
                                <RightContainer>
                                    <OrderSum />
                                    <CheckoutButton>
                                        <Link to='/checkout'>
                                            <button>Checkout</button>
                                        </Link>         
                                    </CheckoutButton>
                                </RightContainer>
                            </section>
                         </ProdGrid>
                    }
                </Wrapper>
            </Container>
         );
    }
}

const CheckoutButton = styled.div`
    /* right: 80px; */
    display: flex;
    flex-direction: row;
    position: fixed;
    /* right: 6vh; */
    /* margin-top: 78vh; */
    margin-top: 70vh;
    /* right: -38vh; */
    align-items: center;
    z-index: 1;
    /* margin-top: 750px; */
    width: 20%;
    /* background-color: white; */
    display: flex;
    justify-content: center;

    button{ 
        /* position: absolute; */
        /* right: 0; */
        /* margin-right: 11vh; */

        /* width: 250px; */
        width: 25vh;
        /* height: 200px; */
        height: 8vh;
        outline: none;
        border: none;
        color: black;
        /* padding: 0rem 1rem; */
        padding: 0vh 1vh;
        /* margin: 0.1px 10px 0.1px 10px; */
        /* margin: 0.1vh 10vh 0.1vh 10vh; */
        /* height: 70px; */
        /* line-height: 70px; */
        text-align: center;
        background: #F9C91E;
        border-radius: 1rem;
        transition: all 0.1s ease-in;
        font-family: "Work Sans";
        /* font-size: 35px; */
        font-size: 3vh;
        font-weight: bold;

        &:hover {
            transform: translateY(-4px);
            cursor: pointer;
        }
    }
`

const ModalContainer = styled.div`
  position: relative;
`;

const CategModal = styled(Modal)`
  outline: none;
  background-color: white;
  box-shadow: 3px 6px 5px 3px #d6d6d6;
  border-radius: 8px;
  height: 300px;
  width: 600px;
  margin-top: -150px;
  margin-left: -300px;
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2{
      text-align: center;
      padding: 35px 50px 0px;
  }
  
  form{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  input{
    width: 80%;
    max-width: 350px;
    min-width: 250px;
    height: 40px;
    border: none;
    color: black;
    margin: 7px 0px 10px;
    background-color: #f5f5f5;
    box-shadow: 0px 14px 9px -15px rbga(0,0,0,0.25);
    border-radius: 8px;
    padding: 0 1rem;
    transition: all 0.2s ease-in;
  }
    
  .buttons{
    flex-direction: row;
    
    button{
        outline: none;
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
    .delete{
        color: #fff;
        background-color: #FF5C5C;
        box-shadow: 0px 14px 9px -15px rgba(0,0,0,0.25);
    }
    .save{
        color: black;
        background-color: #F9C91E;
    }
  }
  
`;

const Nav = styled.div`
  display: flex;
  flex-direction: row;
  height: 120px;
  overflow-x: auto;
  position: fixed;
  margin-left: 5%;
  width: 95%;
  align-items: center;
  background: white;
  z-index: 1;
`;

const ArrowWrapper = styled.div`
    margin-top: 10px;
    padding-left: 25%;
`;

const Arrow = styled.div`
    left: 0;
    display: flex;
    flex-direction: row;
    height: 120px;
    position: fixed;
    width: 5%;
    align-items: center;
    background: white;
    z-index: 1;
`

const Container = styled.div`
  background: #faf0e0;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
`;

const ProdGrid = styled.div`
    .productlist {
        position: absolute;
        width: 70%;
        margin-top: 160px;
        display: flex;
        margin-left: 50px;
        display: grid;
        gap: 2rem;
        z-index: 0;
        /* grid-template-columns: repeat(auto-fit, minmax(177px, 1fr)); */
        grid-template-columns: repeat(4, 220px);

        @media screen and (max-width: 1024px) {
            gap: 1.5rem;
        }
    }

    .clicked{
        background: #F9C91E;
        border-radius: 1rem;
        padding: 1rem 2rem;
        /* transition: all 0.2s ease-in; */

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
            margin-top: 0.25;
        }

        @media screen and (max-width: 1024px) {
            width: 70%;
        }
    }
    .unclicked{
        background: #fff;
        border-radius: 1rem;
        padding: 1rem 2rem;
        /* transition: all 0.2s ease-in; */

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
            margin-top: 0.25;
        }
        @media screen and (max-width: 1024px) {
            width: 70%;
        }
    }
    .image{
        height: 150px;
        width: 150px;
    }
`;

const RightContainer = styled.div`
    width: 20%;
    height: 50vh;
    display: flex;
    flex-direction: row;
    position: absolute;
    margin-top: 4vh;
    right: -38vh;
    align-items: center;
    z-index: 1;
    width: 20%;
    display: flex;
    justify-content: center;
`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export default ProdSelect;