import React, { Component } from 'react';
import "./Spinner.css";
class Spinner extends Component {
    state={}
    render() {
        return (

            <div className="spinner">
                <div className="cube1"></div>
                <div className="cube2"></div>
            </div>
            
        );
    }
}

export default Spinner;