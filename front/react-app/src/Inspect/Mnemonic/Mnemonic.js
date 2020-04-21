import React, { Component } from 'react';

class Mnemonic extends Component {
    constructor(props){
        super(props);

        var mal_functions=JSON.parse(window.localStorage.getItem('data'))[this.props.filename]["mal_functions"];
        var indices = [];

        Object.entries(mal_functions).forEach(([key, value]) => {
            indices.push(key);
        });
        console.log(indices);
        console.log(mal_functions);
        console.log(mal_functions[indices[2]])
    }
    
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default Mnemonic;           