import React from "react";
import ContentElement from "./ContentElement";
import "./Contents.css";

function Contents() {
    return (
        <div className="container">
            <div className="container vertical-element w-100">
                <h1>분석 결과확인</h1>
            </div>
            <div id="drop-area" className="bg-light vertical-element vertical-center text-center">
                <form className="my-form w-100">
                        <div className="scroll-view">
                            <ContentElement />
                            <ContentElement />
                            <ContentElement />
                            <ContentElement />
                            <ContentElement />
                            <ContentElement />
                            <ContentElement />
                            <ContentElement />
                            <ContentElement />
                            <ContentElement />
                            <ContentElement />
                            <ContentElement />
                            <ContentElement />
                            <ContentElement />
                            <ContentElement />
                            <ContentElement />
                            <ContentElement />
                            <ContentElement />
                            <ContentElement />
                            <ContentElement />
                            <ContentElement />
                            <ContentElement />
                            <ContentElement />
                            <ContentElement />
                            <ContentElement />
                            <ContentElement />
                            <ContentElement />
                            <ContentElement />
                            <ContentElement />
                            <ContentElement />
                            <ContentElement />
                            <ContentElement />
                            <ContentElement />
                            <ContentElement />
                        </div>
                </form>
            </div>
        </div>
    );
}

export default Contents;