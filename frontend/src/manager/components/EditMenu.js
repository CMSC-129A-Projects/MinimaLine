import React, { Component } from "react";
import styled from "styled-components";
import {Link} from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import Categ from "./Categ";
import ProdDesc from "./ProdDesc";
import { TiDeleteOutline } from "react-icons/ti";
import { IoIosAddCircleOutline } from "react-icons/io";
import Modal from 'react-modal';
import Axios from "axios";
import Auth from '../../services/Auth';

class EditMenu extends Component {
    constructor(){
        super();
        this.state = {
            prods: [],      // list of all products in a category
            all_categs: [],     // list of all categories in a store menu
            isProdClicked: false,     // whether or not a product is selected
            current_prod: null,      // index of selected product
            current_categ: null,      // id of selected category
            new_categ: '',      // name of new category to be added
            prod_name: '',      // name of new product to be added
            prod_price: '',     // price of new product to be added
            prod_availability: "-1",    // availability of new product to be added
            // prod_categ: 0,     // category of new product to be added
            prod_img: '',       // image of new product to be added (not required)
            openDeleteModal: false,     // open/close modal for delete product
            openAddCateg: false,        // open/close modal for add category
            openAddProd: false,     // open/close modal for add product
            delete_this: null     // id of product to be deleted 
        }
        this.changeColor = this.changeColor.bind(this);
        this.toggleDeleteProd = this.toggleDeleteProd.bind(this);
        this.toggleAddCateg = this.toggleAddCateg.bind(this);
        this.toggleAddProd = this.toggleAddProd.bind(this);
        this.deleteProd = this.deleteProd.bind(this);
        this.showProducts = this.showProducts.bind(this);
        this.showCategs = this.showCategs.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    async componentDidMount(){
        document.title = "MinimaLine | Edit Menu";
        console.log("edit menu page")
        this.showCategs("first");
    }
    async showCategs(id){
        let categs = await Axios.get('http://localhost:3005/display-category',{headers: Auth.header()});
        if(JSON.stringify(categs.data)==='{}'){
            this.showProducts("empty")
        }
        else{
            this.setState({
                all_categs: categs.data
            })
            if(id==="first")
                this.setState({
                    current_categ: this.state.all_categs[0]["id"],
                })
            else if(id!=="added")
                this.setState({
                    current_categ: id,
                })
            else if(id==="deleted" || id==="added")
                this.setState({
                    current_categ: this.state.all_categs[this.state.all_categs.length-1]["id"],
                })
            this.showProducts(this.state.current_categ)
        }
        // let categs = await Axios.get('http://localhost:3005/display-category');
        // if(JSON.stringify(categs.data)==='{}'){
        //     this.showProducts("empty")
        // }
        // else{
        //     this.setState({
        //         all_categs: categs.data
        //     })
        //     if(id==="first")
        //         this.setState({
        //             current_categ: this.state.all_categs[0]["id"],
        //         })
        //     else if(id!=="added")
        //         this.setState({
        //             current_categ: id,
        //         })
        //     else if(id==="deleted" || id==="added")
        //         this.setState({
        //             current_categ: this.state.all_categs[this.state.all_categs.length-1]["id"],
        //         })
        //     this.showProducts(this.state.current_categ)
        // }
    }
    async showProducts(categ_id){
        // if(categ_id!=="empty"){
        //     let categProds = await Axios.get(`http://localhost:3005/menu-info/${categ_id}`);
        //     this.setState({
        //         prods: categProds.data,
        //         isProdClicked: false,
        //         current_prod: null,
        //         current_categ: categ_id
        //     })
        // }
        if(categ_id!=="empty"){
            let categProds = await Axios.get(`http://localhost:3005/menu-info/${categ_id}`,{headers: Auth.header()});
            this.setState({
                prods: categProds.data,
                clicked: false,
                current: null
            })
        }
    }
    
    changeColor(index){
        if(this.state.current_prod !== index)
            this.setState({
                current_prod: index,
                isProdClicked: true
            })
    }
    toggleDeleteProd(id){
        this.setState({
            delete_this: id,
            openDeleteModal: !this.state.openDeleteModal
        })
    }
    toggleAddCateg(){
        this.setState({openAddCateg: !this.state.openAddCateg})
    }
    toggleAddProd(){
        this.setState({openAddProd: !this.state.openAddProd})
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleUpload(e){
        this.setState({
            prod_img: e.target.files[0]
        })
    }

    addNewCateg = e =>{
        const data = {
            category: (this.state.new_categ).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
        };
        e.preventDefault();
        console.log("adding categ")
        Axios.post("http://localhost:3005/add-categ",data,{headers: Auth.header()}).then((response) => {
            this.setState({new_categ: ''})
            this.toggleAddCateg()
            this.showCategs("added")
        })
    }
    addNewProd = e =>{
        console.log(this.state.current_categ)
        e.preventDefault();
        const data = {
            product: (this.state.prod_name).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
            price: this.state.prod_price,
            availability: Number(this.state.prod_availability),
            category: this.state.current_categ,
            photo: this.state.prod_image
        };
        Axios.post("http://localhost:3005/add-product",data,{headers: Auth.header()}).then((response) => {
            console.log("new product")
            this.toggleAddProd()
            this.showProducts(this.state.current_categ)
            this.setState({
                prod_name: '',
                prod_price: '',
                prod_availability: "-1",
                prod_image: ''
            })
        })
    }
    deleteProd(){
        Axios.delete(`http://localhost:3005/delete-product/${this.state.delete_this}`,{headers: Auth.header()}).then((response) => {
            this.toggleDeleteProd()
        })
    }
    handleClick(id){
        if(id==="deleted")
            this.showCategs()
        else
            this.showProducts(id)
    }

    render() {
        var modalStyle={overlay: {zIndex: 2}}
        return ( 
            <Container>
                {this.state.openDeleteModal ?
                    <ModalContainer>
                        <CategModal isOpen={true} style={modalStyle}>
                            <h2>Are you sure you want to remove this product from the menu?</h2>
                            <div className="buttons">
                                <button className="delete" onClick={this.deleteProd}>Delete</button>
                                <button onClick={this.toggleDeleteProd}>Cancel</button>
                            </div>
                        </CategModal>
                    </ModalContainer>
                : null}

                {this.state.openAddCateg ?
                    <ModalContainer>
                        <CategModal isOpen={true} style={modalStyle}>
                            <h2>Add New Menu Category</h2>
                            <form onSubmit={this.addNewCateg}>
                                <input
                                    type="text"
                                    placeholder="Category Name"
                                    name="new_categ"
                                    value={this.state.new_categ}
                                    required
                                    autoComplete="off"
                                    onChange={this.handleChange.bind(this)}/>
                                <div className="buttons">
                                    <button className="save">Save Changes</button>
                                    <button onClick={this.toggleAddCateg}>Cancel</button>
                                </div>
                            </form>
                        </CategModal>
                    </ModalContainer>
                : null}

                {this.state.openAddProd?
                    <ModalContainer>
                        <ProdModal className="add-prod" isOpen={true} style={modalStyle}>
                            <h2>Add New Product</h2>
                            <form onSubmit={this.addNewProd}>
                                <input
                                    type="text"
                                    placeholder="Product Name"
                                    name="prod_name"
                                    value={this.state.prod_name}
                                    required
                                    autoComplete="off"
                                    onChange={this.handleChange.bind(this)}/>
                                <input
                                    type="text"
                                    placeholder="Price"
                                    name="prod_price"
                                    value={this.state.prod_price}
                                    required
                                    autoComplete="off"
                                    onChange={this.handleChange.bind(this)}/>
                                <select
                                    name="prod_availability"
                                    value={this.state.prod_availability}
                                    onChange={this.handleChange.bind(this)}>
                                    <option value="-1">Select availability</option>
                                    <option value="1">Available</option> 
                                    <option value="0">Not Available</option>
                                </select>
                                <input
                                    type="file"
                                    placeholder="Product Image"
                                    name="prod_img"
                                    value={this.state.prod_img}
                                    autoComplete="off"
                                    onChange={this.handleChange.bind(this)}/>
                                <div className="buttons">
                                    <button className="save">Save Changes</button>
                                    <button onClick={this.toggleAddProd}>Cancel</button>
                                </div>
                            </form>
                        </ProdModal>
                    </ModalContainer>
                : null}

                <Wrapper>
                    <Arrow>
                        <ArrowWrapper>
                            <Link to={{ pathname: "/dashboard" }}>
                                <BiArrowBack size="40px" color="#676666"/>
                            </Link>
                        </ArrowWrapper>
                    </Arrow>
                    <Nav>
                        <Categ mode={"edit"} categs={this.state.all_categs} curr={this.state.current_categ} onClick={this.handleClick}/>
                        <AddCategButton size="50px" onClick={this.toggleAddCateg}/>
                        {!this.state.all_categs.length ? 
                            <Instruction>
                                <h1>Click to add category</h1>
                            </Instruction> : null}
                    </Nav>
                    <EditButton>
                        <Link to={{ pathname: "/view-menu" }}>
                            <button>Save</button>
                        </Link>
                    </EditButton>
                    {this.state.all_categs.length ?
                        (!this.state.prods.length ? 
                            <div className="empty-grid">
                                <AddButton size="100px" onClick={this.toggleAddProd}/> 
                                <InstructWrapper>
                                    <Instruction>
                                        <div className="prod-instruct">
                                            <h2>Click to add product</h2>
                                        </div>
                                    </Instruction>
                                </InstructWrapper>
                            </div> :
                            <ProdGrid>
                                    <section className='productlist'> 
                                            {this.state.prods.map((prod,index)=>{
                                                    return (
                                                        <div
                                                        onClick={()=>this.changeColor(index)}
                                                        className={(this.state.isProdClicked && (this.state.current_prod===index)) ? 'clicked' : 'unclicked'}>
                                                                <DeleteButton size="50px" onClick={()=>this.toggleDeleteProd(prod["id"])}/>
                                                                <article>
                                                                    <h3><img className='image' src={prod["photo"]} alt="No image"/></h3>
                                                                    <h1>{prod["product"]}</h1>
                                                                    <h2>Php {prod["price"]}</h2>
                                                                    <h2>{prod["availability"]===1 ? "Available" : "Not Available"}</h2>
                                                                </article> 
                                                        </div>
                                                    )
                                                })}
                                        {this.state.isProdClicked ? <ProdDesc {...this.state.prods[this.state.current_prod]} mode={"edit"} test={this.showProducts}/> : null }
                                        <AddButton size="100px" onClick={this.toggleAddProd}/>
                                    </section>
                            </ProdGrid>
                        )
                    : null}
                </Wrapper>
            </Container>
         );
    }
}

const ModalContainer = styled.div`
  position: relative;
`;
const ProdModal = styled(Modal)`
  outline: none;
  background-color: white;
  box-shadow: 3px 6px 5px 3px #d6d6d6;
  border-radius: 8px;
  height: 450px;
  width: 400px;
  margin-top: -250px;
  margin-left: -200px;
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2{
      text-align: center;
      padding: 25px 50px 0px;
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
    outline: none;
    color: black;
    margin: 7px 0px 10px;
    background-color: #f5f5f5;
    box-shadow: 0px 14px 9px -15px rbga(0,0,0,0.25);
    border-radius: 8px;
    padding: 0 1rem;
    transition: all 0.2s ease-in;

    @media (prefers-reduced-motion: no-preference){
        :focus {
            transition: outline-offset .25s ease;
            outline-offset: 1px;
            box-shadow: 0 0 2pt 1pt #F9C91E;
            border-radius: 14px;
        }
    }
  }
    
  select{
    width: 89%;
    max-width: 400px;
    min-width: 250px;
    height: 40px;
    border: none;
    outline: none;
    color: black;
    margin: 7px 0px 10px;
    background-color: #f5f5f5;
    box-shadow: 0px 14px 9px -15px rbga(0,0,0,0.25);
    border-radius: 8px;
    padding: 0 1rem;
    transition: all 0.2s ease-in;
    
    @media (prefers-reduced-motion: no-preference){
        :focus {
            transition: outline-offset .25s ease;
            outline-offset: 1px;
            box-shadow: 0 0 2pt 1pt #F9C91E;
        }
    }
  }

  .buttons{
    flex-direction: row;
    
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
    outline: none;
    color: black;
    margin: 7px 0px 10px;
    background-color: #f5f5f5;
    box-shadow: 0px 14px 9px -15px rbga(0,0,0,0.25);
    border-radius: 8px;
    padding: 0 1rem;
    transition: all 0.2s ease-in;
    @media (prefers-reduced-motion: no-preference){
        :focus {
            transition: outline-offset .25s ease;
            outline-offset: 1px;
            box-shadow: 0 0 2pt 1pt #F9C91E;
            border-radius: 14px;
        }
    }
  }
    
  .buttons{
    flex-direction: row;
    
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

const AddCategButton = styled(IoIosAddCircleOutline)`
    // position: relative;
    padding: 0.5rem 0.5rem;
    border-radius: 1rem;
    overflow: visible;

    transition: all 0.2s ease-in;
    &:hover {
        transform: translateY(-4px);
        background: #F3D9A4;
        cursor: pointer;
    }
` 

const DeleteButton = styled(TiDeleteOutline)`
    position: absolute;
    right: -25px;
    top: -15px;

    &:hover {
        color: #FF5C5C;
        cursor: pointer;
    }
` 
const AddButton = styled(IoIosAddCircleOutline)`
    position: relative;
    left: 50px;
    top: 90px;

    transition: all 0.2s ease-in;
    &:hover {
        transform: translateY(-4px);
        color: #F9C91E;
        cursor: pointer;
    }
` 

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
`;

const ArrowWrapper = styled.div`
    margin-top: 10px;
    padding-left: 25%;
`;

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
        grid-template-columns: repeat(auto-fit, minmax(177px, 1fr));

        @media screen and (max-width: 1024px) {
            gap: 1.5rem;
        }
    }

    .clicked{
        position: relative;
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
        position: relative;
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
    }
    .image{
        height: 150px;
        width: 150px;
    }
    @media screen and (max-width: 1024px) {
            width: 70%;
        }

`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  .empty-grid{
    margin-top: 70px; 
  }
`;

const InstructWrapper = styled.div`
    margin-left: 180px;
`

const Instruction = styled.div`
    position: relative;
    max-width: 30em;
    background-color: #F9C91E;
    padding: 0.7em 1.5em;
    border-radius: 1rem;
    box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, .3), 0 0.0625rem 0.125rem rgba(0, 0, 0, .2);
    margin-left: 14px;
    animation: MoveUpDown 1s linear infinite;

    @keyframes MoveUpDown {
        0%, 10% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-7px);
        }
    }
    h1{
        font-size: 20px;
    }
    ::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        width: 0;
        height: 0;
        border: 20px solid transparent;
        border-right-color: #F9C91E;
        border-left: 0;
        margin-top: -20px;
        margin-left: -20px;
    }
`

export default EditMenu;