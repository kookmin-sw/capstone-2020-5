import React, {useState, Component} from "react";
import Nav from "../Nav/Nav";
import ContentElement from "./ContentElement";
import {Link} from "react-router-dom";
import "./Contents.css";

class Contents extends Component{
    constructor(props) {
        super(props);
        this.jsonData = JSON.parse(window.localStorage.getItem('filenames'));
    
    }

    createListOfFiles() {
        let listOfFiles = []
        Object.entries(this.jsonData).forEach(([key, value]) => {
            listOfFiles.push(
                <ContentElement filename={value} key={value}/>
            );
        })
        return listOfFiles
    }

    render() {
        return (
            <div>
                <Nav />
                {
                    this.createListOfFiles()
                }
            </div>
            // <div className="container">
            //     <div className="container vertical-element w-100">
            //         <h1>분석 결과확인</h1>
            //     </div>
            //     <div id="drop-area" className="bg-light vertical-element vertical-center text-center">
            //         <form className="my-form w-100">
            //                 <div className="scroll-view">
                                
            //                     <ContentElement />
            //                 </div>
            //         </form>
            //     </div>
            // </div>
        );
    }
}

export default Contents;