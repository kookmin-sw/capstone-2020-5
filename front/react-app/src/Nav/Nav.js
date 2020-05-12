import React from "react";
import "./Nav.css"
import {Link} from "react-router-dom";

function Nav() {
    return(
        <nav className="main_nav">
            <img src="/img/asi_logo.png" className="asi_logo" alt=""/>
            <div className="small_buttons">
                <Link to="/intro">
                    <p type="button" className="small_button">서비스 소개</p>
                </Link>
                <Link to="/upload">
                    <p type="button" className="small_button">분석 요청</p>
                </Link>
            </div>
        </nav>
    );
}

export default Nav;

