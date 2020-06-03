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
                <div className="contents_container">
                    <div className="container">
                        <div className="">
                            <div className="title_text row">
                                <div className="col-9">Upload / <span>File List</span></div>
                                <div className="col-3"><input type="button" value="Download ZIP" className="filelist_btn purple" /></div>
                            </div>
                        </div>
                        <div>
                            <table className="table table-striped">
                                <caption>List of users</caption>
                                <thead>
                                <tr>
                                    <th scope="col" colspan="2">파일명</th>
                                    <th scope="col">결과</th>
                                    <th scope="col">정보</th>
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