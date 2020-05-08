import React, { Component } from 'react';
import "./Spinner.css";
class Spinner extends Component {
    state={}
    render() {
        return (
            
                <div className="loader">
                <img src="/img/Spinner.gif"/>
                </div>
            
        );
    }
}

export default Spinner;