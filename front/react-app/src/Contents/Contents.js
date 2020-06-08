import React, {useState, Component} from "react";
import Nav from "../Nav/Nav";
import ContentElement from "./ContentElement";
import {Link} from "react-router-dom";
import "./Contents.css";
import Spinner from "../Spinner/Spinner";

class Contents extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
        this.jsonData = JSON.parse(window.localStorage.getItem('filenames'));
        this.jsonUploadDates = JSON.parse(window.localStorage.getItem('dates'));
    }

    createListOfFiles() {
        let listOfFiles = []
        for(let i = 0; i < this.jsonData.length; ++i) {
            listOfFiles.push(
                <ContentElement onclick={() => {this.setState({loading: true})}} filename={this.jsonData[i]} key={this.jsonData[i]} date={this.jsonUploadDates[i]}/>
            );
        }
        return listOfFiles
    }

    render() {
        return (
            <div>
                <Nav />
                {
                    this.state.loading ? 
                    <div style={{marginTop:"350px"}}>
                        <Spinner/>
                    </div>
                    :
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
                }
            </div>
        );
    }
}

export default Contents;