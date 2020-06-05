import React, {useState, Component} from "react";
import Nav from "../Nav/Nav";
import ContentElement from "./ContentElement";
import {Link} from "react-router-dom";
import "./Contents.css";

class Contents extends Component{
    constructor(props) {
        super(props);
        this.jsonData = JSON.parse(window.localStorage.getItem('filenames'));
        this.jsonUploadDates = JSON.parse(window.localStorage.getItem('dates'));
    }

    createListOfFiles() {
        let listOfFiles = []
        for(let i = 0; i < this.jsonData.length; ++i) {
            listOfFiles.push(
                <ContentElement filename={this.jsonData[i]} key={this.jsonData[i]} date={this.jsonUploadDates[i]}/>
            );
        }
        return listOfFiles
    }

    render() {
        return (
            <div>
                <Nav />
                <div className="contents_container">
                    <div className="container">
                        <div className="">
                            <div className="title_text row">
                                <div className="col-9"><span>File List</span></div>
                                <div className="col-3"></div>
                            </div>
                        </div>
                        <div>
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th scope="col" colspan="2">File Name</th>
                                    <th scope="col">Result</th>
                                    <th scope="col">Re-analysis</th>
                                    <th scope="col">Scan Date</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.createListOfFiles()
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

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