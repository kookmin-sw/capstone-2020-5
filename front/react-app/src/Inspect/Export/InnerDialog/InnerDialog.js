import React, { Component } from 'react';
import "./InnerDialog.css"




class InnerDialog extends Component {
    constructor(props) {
        super(props);
    }

    createListOfMnemonics() {
        let listOfFunc = []
        for (let i = 0; i < this.props.exports.length; i++) {
            listOfFunc.push(
                <p className="mnemonic-element" key={i}>{i+1} {this.props.exports[i]}</p>
            );
        }
        return listOfFunc
    }
 

    render() {
        return (
        <div id="dialogStylesInner" >
            <button id="diaglogCloseButtonStylesInner" onClick={this.props.onClose}>X</button>
            <div id="scroll-view-innerDialog">
            {this.createListOfMnemonics()}
            </div>
            
        </div>
        );
    }
}

export default InnerDialog;           