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
                            <p type="button" className="small_button">서비스 소개</p>
                        </Link>
                        <Link to="/upload">
                            <p type="button" className="small_button">분석 요청</p>
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
                            asi는 악성코드 분석 시간을 단축시켜주는 보조도구 입니다.<br></br>
                            의심되는 파일을 업로드하면 여러 분석 결과를 제공합니다.
                        </li>
                    </div>
                </div>
            </div>
            <div className="big_buttons">
                <button type="button" className="snip1535">서비스 소개</button>
                <button type="button" className="snip1535">분석 요청</button>
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
