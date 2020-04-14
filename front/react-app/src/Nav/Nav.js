import React from "react";
import "./Nav.css"
import {Link} from "react-router-dom";

function Nav() {

    return(
        <nav className="navbar bg-top">
            <div className="container justify-content-center">
                <img src="/virus.png" className="img-virus" alt=""/>
                <h1 className="text-light">Asi</h1>
                <div className="row w-100">
                    <p className="col-1"></p>
                </div>
                <div className="row w-100 justify-content-center">
                    <div className="col-2 text-center">
                        <Link to="/intro">
                        <p type="button" className="text-light">서비스 소개</p>
                        </Link>
                    </div>
                    <p className="col-1"></p>
                    <div className="col-2 text-center">
                        <Link to="/">
                            <p type="button" className="text-light">분석 요청</p>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Nav;

