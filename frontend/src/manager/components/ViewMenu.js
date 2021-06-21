import React, { Component } from "react";
import styled from "styled-components";
import {Link,Redirect} from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import Categ from "./Categ";
import ProdDesc from "./ProdDesc";
import Axios from 'axios';
import Auth from '../../services/Auth';
Axios.defaults.withCredentials = true;

class ViewMenu extends Component {
    constructor(){
        super();
        this.state = {
            clicked: false,
            current: null,
            prods: [],
            all_categs: [],
            curr_categ: null,
            redirect: false
            // userId: null
        }
        this.changeColor = this.changeColor.bind(this);
        this.showProducts = this.showProducts.bind(this);
     
    }
    changeColor(index){
        if(this.state.current !== index)
            this.setState({
                current: index,
                clicked: true
            })
    }
    async showProducts(categ_id){
        if(categ_id!=="empty"){
            let categProds = await Axios.get(`https://minimaline-server.herokuapp.com/menu-info/${categ_id}`,{headers: Auth.header()});
            this.setState({
                prods: categProds.data,
                clicked: false,
                current: null
            })
        }
    }
    async componentDidMount(){
        document.title = "MinimaLine | View Menu"
        console.log("view menu page")
        let categs = await Axios.get('https://minimaline-server.herokuapp.com/display-category',{headers: Auth.header()})
                            .catch((error)=> {
                                console.log(error)
                                this.setState({redirect: true})
                            })
        if(!this.state.redirect){
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

    render() {
        if(this.state.redirect)
            return <Redirect to="/"/>
        return ( 
            <Container>
                <Wrapper>
                    <Arrow>
                        <ArrowWrapper>
                            <Link to={{ pathname: "/dashboard" }}>
                                <BiArrowBack size="40px" color="#676666"/>
                            </Link>
                        </ArrowWrapper>
                    </Arrow>
                    <EditButton>
                        <Link to={{ pathname: "/edit-menu" }}>
                            <button>Edit Menu</button>
                        </Link>
                    </EditButton>
                    <Nav>
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
                                {this.state.clicked ? <ProdDesc {...this.state.prods[this.state.current]} mode={"view"}/> : null }
                            </section>
                         </ProdGrid>
                    }

                </Wrapper>
            </Container>
         );
    }
}

const EditButton = styled.div`
    right: 0;
    display: flex;
    flex-direction: row;
    height: 120px;
    position: fixed;
    width: 12%;
    align-items: center;
    background: white;
    z-index: 1;

    @media screen and (max-width: 1180px) {
        width: 20%;
    }

    button{ 
        outline: none;
        border: none;
        color: black;
        padding: 0rem 1rem;
        margin: 0.1px 10px 0.1px 10px;
        min-width: 110px;
        height: 70px;
        line-height: 70px;
        text-align: center;
        background: #F9C91E;
        border-radius: 1rem;
        transition: all 0.1s ease-in;
        font-family: "Work Sans";
        font-size: 90%;
        font-weight: bold;
        @media screen and (max-width: 1180px) {
         left:0;
        }

        &:hover {
            transform: translateY(-4px);
            cursor: pointer;
        }
    }
`

const Nav = styled.div`
  display: flex;
  flex-direction: row;
  height: 120px;
  overflow-x: auto;
  position: fixed;
  margin-left: 5%;
  width: 83%;
  align-items: center;
  background: white;
  z-index: 1;

    @media screen and (max-width: 1180px) {
        width: 75%;
    }
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
        padding-bottom: 10px;
        display: grid;
        gap: 2rem;
        z-index: 0;
        grid-template-columns: repeat(5, 220px);

        @media screen and (max-width: 1680px) {
            grid-template-columns: repeat(4, 240px);
        }

        @media screen and (max-width: 1460px) {
            grid-template-columns: repeat(3, 240px);
        }

        @media screen and (max-width: 1180px) {
            gap: 2rem;
            grid-template-columns: repeat(2, 265px);
        }
    }

    .clicked{
        background: #F9C91E;
        border-radius: 1rem;
        padding: 1rem 2rem;
        transition: all 0.2s ease-in;

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
        @media screen and (max-width: 1180px) {
            width: 200px;
        }
    }
    .unclicked{
        background: #fff;
        border-radius: 1rem;
        padding: 1rem 2rem;
        transition: all 0.2s ease-in;

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

    }
    .image{
        height: 160px;
        width: 160px;

        @media screen and (max-width: 1680px) {
            height: 180px;
            width: 180px;
        }

        @media screen and (max-width: 1180px) {
            height: 200px;
            width: 200px;
        }
    }
    @media screen and (max-width: 1024px) {
        width: 70%;
    }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export default ViewMenu;