import React, { Component } from 'react';

class Mnemonic extends Component {
    constructor(props){
        super(props);

        var jsonData=JSON.parse(window.localStorage.getItem('data'));
        this.file=jsonData[this.props.filename]

    }
    render() {
        return (
            <div>
        
            </div>
        );
    }
}

export default Mnemonic;           