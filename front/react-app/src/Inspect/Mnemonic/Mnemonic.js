import React, { Component } from 'react';
import "./Mnemonic.css"
import InnerDialog from "./InnerDialog/InnerDialog";
import Axios from 'axios';
class Mnemonic extends Component {
    constructor(props) {
        
        super(props);
        Axios.get("http://127.0.0.1:5000/get_files",  {
            params:{
                filename:this.props.filename
            }
        }).then((response) => {
           
            this.file=response.data
            this.state={isInnerDialogOpened:false};
            this.mal_functions = JSON.parse(this.file["mal_functions"]);
            this.indices = [];
            Object.entries(this.mal_functions).forEach(([key, value]) => {
                this.indices.push(key);
            });
            console.log(this.file);      
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