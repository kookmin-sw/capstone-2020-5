import React, {useState, Component} from "react";
import Nav from "../Nav/Nav";
import ContentElement from "./ContentElement";
import {Link} from "react-router-dom";
import "./Contents.css";
import Spinner from "../Spinner/Spinner";
import Axios from 'axios';

class Contents extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
        
        if(window.localStorage.getItem('db_rescan_filename') === null) {
            this.jsonData = JSON.parse(window.localStorage.getItem('filenames'));
            this.jsonUploadDates = JSON.parse(window.localStorage.getItem('dates'));
        } else {
            this.setState({loading: true});
            this.state.loading =  true;
            
            Axios.get("http://127.0.0.1:5000/db_re_scan", {
                params: {
                    db_re_scan_file: window.localStorage.getItem('db_rescan_filename'),
                    filenames: window.localStorage.getItem('filenames'),
                    dates: window.localStorage.getItem('dates')
                }
            }).then((response) => {
                if (typeof response.data == "string"&& response.data.split(",")[0]  == "error") {
                    window.localStorage.setItem('error_message', response.data.split(",")[1]);
                    window.location = "/error";
                } else {
                    window.localStorage.setItem('filenames', "");
                    window.localStorage.setItem('filenames', JSON.stringify(response.data[0]));
                    window.localStorage.setItem('dates', "");
                    window.localStorage.setItem('dates', JSON.stringify(response.data[1]));
                    
                    window.localStorage.removeItem('db_rescan_filename');
                    this.jsonData = JSON.parse(window.localStorage.getItem('filenames'));
                    this.jsonUploadDates = JSON.parse(window.localStorage.getItem('dates'));

                    this.setState({loading: false});
                }
            });
        }
    }

    createListOfFiles() {
        if(!this.jsonData) {
            return [];
        }
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