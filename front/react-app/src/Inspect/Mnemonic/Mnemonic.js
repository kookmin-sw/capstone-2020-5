import React, { Component } from 'react';
import "./Mnemonic.css"
import InnerDialog from "./InnerDialog/InnerDialog";

class Mnemonic extends Component {
    constructor(props) {
        super(props);
        this.state={isInnerDialogOpened:false};
        this.mal_functions = JSON.parse(window.localStorage.getItem('data'))[this.props.filename]["mal_functions"];
        this.indices = [];
        Object.entries(this.mal_functions).forEach(([key, value]) => {
            this.indices.push(key);
        });
    }



    createListOfFunc() {
        let listOfFunc = []
        for (let i = 0; i < this.indices.length; i++) {
            listOfFunc.push(
                <button key={i} onClick={()=>{
                    this.setState({isInnerDialogOpened: true});
                    this.mnemonics = this.mal_functions[this.indices[i]];
                }}>{this.indices[i]}</button>
            );
        }
        return listOfFunc;
    }
 

    render() {
        return (
        <div id="dialogStyles">
            <button id="diaglogCloseButtonStyles" onClick={this.props.onClose}>X</button>
            <div id="scroll-view-mnemonic">
                {this.createListOfFunc()}
            </div>
            
            {
                this.state.isInnerDialogOpened ?
                <InnerDialog mnemonics={this.mnemonics} onClose={(e) => this.setState({isInnerDialogOpened: false})}/>
                :
                <br/>
            }

        </div>
        );
    }
}

export default Mnemonic;           