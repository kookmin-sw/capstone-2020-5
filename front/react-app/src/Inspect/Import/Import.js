import React, { Component } from 'react';
import "./Import.css"
import InnerDialog from "./InnerDialog/InnerDialog";
import Axios from 'axios';
class Import extends Component {
    constructor(props) {
        super(props);
        this.state={
            isInnerDialogOpened:false
        }
        var file = this.props.file;
        this.import = file["import"];
        this.indices = [];
        Object.entries(this.import).forEach(([key, value]) => {
            this.indices.push(key);
        });
    }



    createListOfFunc() {
        let listOfFunc = []
        for (let i = 0; i < this.indices.length; i++) {
            listOfFunc.push(
                <button key={i} onClick={()=>{
                    this.setState({isInnerDialogOpened: true});
                    this.imports = this.import[this.indices[i]];
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
                    <InnerDialog imports={this.imports} onClose={(e) => this.setState({isInnerDialogOpened: false})}/>
                    :
                    <br/>
                }
            </div>
        );
    }
}

export default Import;           