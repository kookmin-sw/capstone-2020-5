import React from "react";
import "./index.css"
import "./btn.css"
import {Link} from "react-router-dom";

function Index() {

    return(

        <div className="index_background">
            <div className="main_container">
                <nav className="index_nav">
                    <img src="/img/asi_logo.png" className="asi_logo" alt=""/>
                    <div className="small_buttons">
                        <Link to="/intro">
                            <p type="button" className="small_button">About</p>
                        </Link>
                        <Link to="/upload">
                            <p type="button" className="small_button">Analysis</p>
                        </Link>
                    </div>
                </nav>
                <div className="main_table">
                    <div className="main_image_container">
                        <img src="/img/asi_logo.png" className="main_image" alt=""></img>
                    </div>
                    <div className="main_contents_container">
                        <li className="title">
                            A Security Insight
                        </li>
                        <li className="astract">
                            Asi is an auxiliary tool that reduces the time to analyze malware.<br />
                            Uploading a suspicious file provides multiple analysis results.
                        </li>
                    </div>
                </div>
            </div>
            <div className="big_buttons">
            <Link to="/intro">
                <button type="button" className="snip1535">About</button>
                </Link>
                <Link to="/upload">
                <button type="button" className="snip1535">Analysis</button>
                </Link>
            </div>
            <div className="copyright">
                <p>About More</p>
                <a src="https://github.com/kookmin-sw/capstone-2020-5">https://github.com/kookmin-sw/capstone-2020-5</a>
                <p>© ASI, Kookmin University, Capstone Design Project 2020</p>
            </div>
        </div>


    );
}

export default Index;
