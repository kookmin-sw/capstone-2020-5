import React, { Component } from 'react';
import "./Mnemonic.css"

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


class Mnemonic extends Component {
    constructor(props) {
    
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
        <div style={dialogStyles} >
            <button style={diaglogCloseButtonStyles} onClick={this.props.onClose}>X</button>
            <div className="scroll-view">
            {this.createListOfFunc()}
            </div>
            
        </div>
        );
    }
}

export default Mnemonic;           