import React, { Component } from 'react';
import styled from 'styled-components';

class DineInTakeOut extends Component {
    constructor(){
        super();
        this.state = {
            clickDineIn: false,
            clickTakeOut: false
        }
        this.changeColor = this.changeColor.bind(this);
    }
    changeColor(id){
        if(id===1)
            this.setState({
                clickDineIn: true,
                clickTakeOut: false
            });
        else
            this.setState({
                clickDineIn: false,
                clickTakeOut: true
            });
        this.props.onClick(id);
    }
    render() { 
        return ( 
            <div>
                <StyledButtons
                    type="button"
                    value="Dine In"
                    selected={this.state.clickDineIn}
                    onClick={()=>this.changeColor(1)}
                />
                <StyledButtons
                    type="button"
                    value="Take Out"
                    selected={this.state.clickTakeOut}
                    onClick={()=>this.changeColor(2)}
                />
            </div>

         );
    }
}

const StyledButtons = styled.input`
    outline: none;
    margin: 0px 30px 20px;
    padding: 10px 15px;
    width: 120px;
    background-color: ${props => props.selected ? '#ec9736' : 'transparent'};
    border-radius: 15px;
    border: ${props => props.selected ? '2px solid #ec9736' : '2px solid #568d33'};
    font-size: 20px;
    color: ${props => props.selected ? 'white' : '#568d33'};;

    :hover{
        background-color: ${props => props.selected ? '#ec9736' : 'transparent'};
        border: 2px solid #ec9736;
        color: ${props => props.selected ? 'white' : '#ec9736'};
        transform: translateY(3px);
        cursor: pointer;
    }

    @media (max-width: 900px) {
        margin: 0px 20px 10px;
        padding: 10px 15px;
        width: 110px;
    }
`;
 
export default DineInTakeOut;