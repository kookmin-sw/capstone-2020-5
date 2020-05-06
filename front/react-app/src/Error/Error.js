import React, {Component} from "react"; 
import "./Error.css"
import {Link} from "react-router-dom";

class Error extends Component {
    constructor(props) {
        super(props);
        this.message = window.localStorage.getItem("error_message");
        if(!this.message) {
            this.message = "Unknown error";
        }
    }

    render() {
        return(
            <h1>{this.message}</h1>
        );
    }
}

export default Error;