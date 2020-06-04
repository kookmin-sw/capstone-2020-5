import React from "react";
import "./Nav.css"
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";


function Nav() {
    return(

        <nav className="main_nav">
            <Link to="/">
                <img src="/img/asi_logo.png" className="asi_logo"/>
            </Link>
            <div className="small_buttons">
                <Link to="/intro">
                    <p type="button" className="small_button">About</p>
                </Link>
                <Link to="/upload">
                    <p type="button" className="small_button">Analysis</p>
                </Link>
            </div>
        </nav>
    );
}

export default Nav;

