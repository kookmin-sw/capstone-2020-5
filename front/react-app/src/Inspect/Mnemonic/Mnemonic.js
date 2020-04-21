import React, { Component } from 'react';
import "./Mnemonic.css"
class Mnemonic extends Component {
    constructor(props) {
        state={
            isOpen:false
        }
        super(props);

        this.mal_functions = JSON.parse(window.localStorage.getItem('data'))[this.props.filename]["mal_functions"];
        this.indices = [];
        Object.entries(this.mal_functions).forEach(([key, value]) => {
            this.indices.push(key);
        });

        // console.log(indices);
        // console.log(mal_functions);
        // console.log(mal_functions[indices[2]])
    }
    createListOfFunc() {
        let listOfFunc = []
        for (let i = 0; i < this.indices.length; i++) {
            listOfFunc.push(
                <p key={i}>{this.indices[i]}</p>
            )


        }
        return listOfFunc
    }


    render() {
        return (
            <div className="scroll-view" >
                {this.createListOfFunc()}
            </div>
        );
    }
}

export default Mnemonic;           