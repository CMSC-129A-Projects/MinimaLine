import React, { Component } from "react";
import styled from "styled-components";
import { TiDeleteOutline } from "react-icons/ti";
import Modal from 'react-modal';
import Axios from 'axios';

class Categ extends Component {
    constructor(props){
        super(props);
        this.state = { 
            isClicked: false,   // a category is selected
            current: 0,         // index of selected category; default state is the first category on the list
            default: true,      
            openModal: false,
            delete_this: null
        }
        this.handleClick = this.handleClick.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.deleteCateg = this.deleteCateg.bind(this);
    }
    // componentDidMount(){
    //     this.setState({current: this.props.curr })
    // }
    handleClick(index,categ_id){
        // change color
        if(this.state.current !== index) // different category is clicked
            this.setState({
                current: index,
                isClicked: true,
                default: false
            })
        this.props.onClick(categ_id)
    }
    toggleModal(id){
        this.setState({
            openModal: !this.state.openModal,
            delete_this: id
        })
    }

    deleteCateg(){
        Axios.delete(`http://localhost:3005/delete-categ/${this.state.delete_this}`).then((response) => {
            console.log(response)
            this.toggleModal()
        })
    }

    render() { 
        var modalStyle={overlay: {zIndex: 2}}
        return ( 
            <>
            {!this.props.categs.length ? 
                <div></div>:
                <Container>
                        {this.props.categs.map((categ,index)=>{
                        return(
                            <div
                                className={((this.state.isClicked || this.state.default) && (this.state.current===index)) ? 'clicked' : 'unclicked'}
                                onClick={()=>this.handleClick(index,categ["id"])}>
                                <div className="word">
                                    <h1>{categ["name"]}</h1>
                                </div>
                                {this.props.mode==="edit" ? 
                                    <DeleteButton size="25px" onClick={() => this.toggleModal(categ["id"])}/>
                                : null}
                            </div>
                        )
                    })} 
                    {this.state.openModal ?
                        <ModalContainer>
                            <DeleteModal isOpen={true} style={modalStyle}>
                                <h2>Are you sure you want to remove this category from the menu?</h2>
                                <div className="buttons">
                                    <button className="delete" onClick={this.deleteCateg}>Delete</button>
                                    <button onClick={this.toggleModal}>Cancel</button>
                                </div>
                            </DeleteModal>
                        </ModalContainer>
                    : null}     
                </Container>
            } 
            </>  
         );
    }
}

const DeleteButton = styled(TiDeleteOutline)`
    position: absolute;
    right: -10px;
    top: -10px;

    &:hover {
        color: #FF5C5C;
        cursor: pointer;
    }
` 

const Container = styled.div`
    display: flex;
    flex-direction: row;

    .unclicked{
        position: relative;
        margin-top: 10px;
        min-width: 110px;
        height: 70px;
        line-height: 40px;
        text-align: center;
        background: #FFFFFF;
        margin-right: 10px;
        border-radius: 1rem;
        transition: all 0.1s ease-in;

        &:hover {
            transform: translateY(-4px);
            background: #F3D9A4;
            cursor: pointer;
        }
    }

    .clicked{
        position: relative;
        margin-top: 10px;
        min-width: 110px;
        height: 70px;
        line-height: 40px;
        text-align: center;
        background: #F9C91E;
        margin-right: 10px;
        border-radius: 1rem;
        transition: all 0.1s ease-in;
        /* box-shadow: 0px 0px 10px 2px #858585; */

        &:hover {
            transform: translateY(-4px);
            cursor: pointer;
        }
    }
    
    .word{
        font-size: 0.7rem;
        margin: 0.1px 10px 0.1px 10px;
        color: black;

    }
`
const ModalContainer = styled.div`
  position: relative;
`;
const DeleteModal = styled(Modal)`
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
  .ReactModal__Overlay{
      z-index: 1000;
  }

  h2{
      text-align: center;
      padding: 45px 50px 0px;
  }
  .buttons{
    display: flex;
    flex-direction: row;
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
            transform: translateY(2px);
            cursor: pointer;
        }
    }
    .delete{
        color: #fff;
        background-color: #FF5C5C;
        box-shadow: 0px 14px 9px -15px rgba(0,0,0,0.25);
    }
  }
`;

export default Categ;