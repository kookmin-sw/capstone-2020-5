import React, { Component } from 'react';
import "./InnerDialog.css"

let dialogStyles={
    width:'500px',
    maxWidth:'100%',
    margin:'0 auto',
    positiion:'fixed',
    left:'50%',
    top:'50%',
    transform:'translate(-50%,50%)',
    zIndex:'999',
    backgroundColor:'#eee',
    padding:'10px 20px 40px',
    borderRadius:'8px',
    display:'flex',
    flexDirection:'column'
};

let diaglogCloseButtonStyles={
    marginBottom:'15px',
    padding:'3px 8px',
    cursor:'pointer',
    borderRadius:'50%',
    border:'none',
    width:'30px',
    height:'30px',
    fontWeight:'bold',
    alignSelf:'flex-end'
};


class InnerDialog extends Component {
    constructor(props) {
        super(props);
    }



    createListOfMnemonics() {
        let listOfFunc = []
        for (let i = 0; i < this.props.mnemonics.length; i++) {
            listOfFunc.push(
                <p key={i}>{this.props.mnemonics[i]}</p>
            );
        }
        return listOfFunc
    }
 

    render() {
        return (
        <div style={dialogStyles} >
            <button style={diaglogCloseButtonStyles} onClick={this.props.onClose}>X</button>
            <div className="scroll-view">
            {this.createListOfMnemonics()}
            </div>
            
        </div>
        );
    }
}

export default InnerDialog;           