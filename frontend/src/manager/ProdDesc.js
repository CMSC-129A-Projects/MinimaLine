import React, { Component } from "react";
import styled from "styled-components";
import Axios from 'axios';
import Auth from '../services/Auth';
Axios.defaults.withCredentials = true;

class ProdDesc extends Component {
    constructor(props){
        super(props);
        this.state = {
            all_categs: [],
            prod_id: null,
            prod_name: '',
            prod_price: '',
            prod_categ: '',
            prod_availability: null
        }
        // this.showAvailability = this.showAvailability.bind(this)
    }

    handleChange(e){
        this.setState({
          [e.target.name]: e.target.value
        })
    }
    editProd = e => {
        e.preventDefault();
        const id = this.props["id"]
        const data = {
            product: !this.state.prod_name ? this.props["product"] : (this.state.prod_name).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
            price: !this.state.prod_price ? this.props["price"] : this.state.prod_price,
            category: this.state.prod_categ,
            availability: this.state.prod_availability
        }
        Axios.post(`https://minimaline-server.herokuapp.com/edit-menu/${id}`,data,{headers: Auth.header()}).then((response) => {
            console.log(response)
            this.props.test(this.state.prod_categ)
        })
    }
    async componentDidMount(){
        let categs = await Axios.get('https://minimaline-server.herokuapp.com/display-category',{headers: Auth.header()});
        this.setState({
            all_categs: categs.data,
            prod_categ: this.props["category_id"],
        }) 
        if(this.props["availability"]===1){
            this.setState({prod_availability: "1"})
        }
        else if(this.props["availability"]===0){
            this.setState({prod_availability: "0"})
        }
    }
    render() { 
        if (this.props.mode==="edit") {
            return (
                <Form onSubmit={this.editProd}>
                    <img src={this.props["photo"]}/>
                    <Upload
                        type="file"
                        name="photo"
                        autocomplete="off"
                    />
                    <StyledInput
                        placeholder={this.props["product"]}
                        type="text"
                        name="prod_name" 
                        autoComplete="off"
                        value={this.state.prod_name}
                        onChange={this.handleChange.bind(this)}
                    />
                    <StyledInput
                        placeholder={this.props["price"]}
                        type="text"
                        name="prod_price"
                        autoComplete="off"
                        value={this.state.prod_price}
                        onChange={this.handleChange.bind(this)}
                    />
                    <Select
                        name="prod_availability"
                        value={this.state.prod_availability}
                        onChange={this.handleChange.bind(this)}>
                        <option value="1">Available</option> 
                        <option value="0">Not Available</option>
                    </Select>
                    <Select
                        name="prod_categ"
                        value={this.state.prod_categ}
                        onChange={this.handleChange.bind(this)}>
                        {this.state.all_categs.map((categ,index)=>{
                            return (
                                <option value={categ["id"]}>{categ["name"]}</option>
                            )
                        })}
                    </Select>
                    <Buttons>
                        <button className="save">Save Changes</button>
                        <button className="cancel">Cancel</button>
                    </Buttons>
                </Form>
            );
        } else {
            return (
                <Container>
                    <img src={this.props["photo"]}/>
                    <h1>{this.props["product"]}</h1>
                    <h3>Php {this.props["price"]}</h3>
                    <h3>{this.props["availability"] ? "Available" : "Not Available"}</h3>
                </Container>
            );
        }
    }
}
const StyledInput = styled.input`
    /* width: 40%; */
    width: 15vw;
    /* max-width: 350px;
    min-width: 250px; */
    height: 40px;
    border: none;
    color: black;
    margin: 1rem 0 0;
    background-color: #f5f5f5;
    box-shadow: 0px 14px 9px -15px rbga(0,0,0,0.25);
    border-radius: 8px;
    padding: 0 1rem;
    transition: all 0.2s ease-in;

    &:hover {
        transform: translateY(-3px);
    }

    ::placeholder {
        color: black;
    }

    @media screen and (max-width: 1024px) {
      min-width: 150px;
      // padding: 0 0.5rem;
    }
`;

const Buttons = styled.div`
    display: flex;
    // flex-direction: column;

    button{
        font-family: "Work Sans";
        font-size: 1.5vh;
        margin: 3vh 5px 0px;
        width: 8vw;
        height: 5vh;
        border: none;
        box-shadow: 0px 14px 9px -15px rgba(0,0,0,0.25);
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease-in;

        @media screen and (max-width: 1024px) {
            width: 20vw;
        }

        &:hover{
            transform: translateY(-3px);
        }  
    }
    .save{
        color: black;
        background-color: #F9C91E;
    }

    .cancel{
        color: #fff;
        background-color: #FF5C5C;
    }
    @media screen and (max-width: 1024px) {
        flex-direction: column;
        .save{
            margin: 40px 5px 0px;
        }
        .cancel{
            margin: 10px 5px 10px;
        }
    }  
`

const Upload = styled.input`
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 6vw;
    padding-bottom: .5vh;

`

const Select = styled.select`
    display: flex;
    /* width: 280px; */
    width: 17vw;
    // width: 100%;
    // max-width: 700px;
    /* min-width: 150px; */
    height: 40px;
    border: none;
    margin: 1rem 0 0;
    background-color: #f5f5f5;
    box-shadow: 0px 14px 9px -15px rbga(0,0,0,0.25);
    border-radius: 8px;
    padding: 0 1rem;
    transition: all 0.2s ease-in;

    &:hover {
        transform: translateY(-3px);
    }

    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 1024px) {
        width: 185px;
        padding: 0 0.5rem;
    }
`
const Form = styled.form`
    /* height: 500px; */
    height: 62vh;
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    background: #fff;
    right: 0;
    margin-top: 8vh;
    border-radius: 1rem;
    margin-right: 30px;
    box-shadow: 0px 5px 10px -2px #858585;
    padding-bottom: 3vh;
    /* padding: 1rem; */

    @media screen and (max-width: 1350px) {
        width: 25vw;
    }

    img{
        height: 200px;
        width: 200px;
        margin-top: -60px;
    }
    @media screen and (max-width: 1024px) {
        margin-right: 27px;
        img{
            height: 180px;
            width: 180px;
        }
    }
`;
const Container = styled.div`
    /* height: 500px; */
    height: 50vh;
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    background: #fff;
    right: 0;
    margin-top: 50px;
    border-radius: 1rem;
    margin-right: 4vw;
    box-shadow: 0px 5px 10px -2px #858585;
    padding-bottom: 2vh;

    img{
        height: 200px;
        width: 200px;
        margin-top: -60px;

        @media screen and (max-width: 1180px) {
            height: 170px;
            width: 170px;
        }
        @media screen and (max-width: 1000px) {
            height: 140px;
            width: 140px;
        }
    }
`;

export default ProdDesc;