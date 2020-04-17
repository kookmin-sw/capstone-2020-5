import React, {useState, Component} from "react";
import ContentElement from "./ContentElement";
import "./Contents.css";

class Contents extends Component{
    constructor(props) {
        super(props);
        this.jsonData = JSON.parse(window.localStorage.getItem('data'));
    
    }

    createListOfFiles() {
        let listOfFiles = []
        Object.entries(this.jsonData).forEach(([key, value]) => {
            listOfFiles.push(
                <h1 key={key}>{key}</h1>
            );
        })
        return listOfFiles
    }

    render() {
        return (
            <div>
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