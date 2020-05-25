import React, { Component } from 'react';
import Nav from "../Nav/Nav";
import "./Inspect.css";
import "./sample.css";
import Mnemonic from "./Mnemonic/Mnemonic";
import String from "./String/String";
import Import from "./Import/Import";
import Export from "./Export/Export";
import Balloon from "./Balloon/Balloon";
import Axios from 'axios';
import Spinner from '../Spinner/Spinner';
import Overview from './Overview/Overview'


class Inspect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file : null,
            initialized : false
        }
        this.createListOfOverviews = this.createListOfOverviews.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
    }

    downloadFile() {
        let filename = this.props.match.params.id;
        let contentType = "application/json;charset=utf-8;";
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            var blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(this.state.file)))], { type: contentType });
            navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            var a = document.createElement('a');
            a.download = filename;
            a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(this.state.file));
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }

    componentDidMount() {
        Axios.get("http://127.0.0.1:5000/get_files", {
            params: {
                filename:"fd63829b39eb6a034b609e4e25ee8d22.pickle.txt"
                // filename: this.props.match.params.id
            }
        }).then((response) => {
            if (response.data == "error") {
                window.localStorage.setItem('error_message', "File not found error");
                window.location = "/error";
            } else {
                this.setState({ file: response.data });

                this.meta = this.state.file["meta"];
                this.samefile = this.state.file["samefile"];

                this.uploaded_mnemonics = []
                Object.entries(this.state.file["mal_functions"]).forEach(([key, value]) => {
                    this.uploaded_mnemonics.push(value);
                });
                
                // Create list of functions' hash
                this.all_functions = []
                for(var i = 0; i < this.state.file["all_functions"].length; ++i) {
                    this.all_functions.push(this.state.file["all_functions"][i]);
                }
                this.setState({initialized : true});
            }
        });
    }

    createListOfOverviews() {
        let list = [];
        for(var i = 0; i < this.all_functions.length; ++i) {
            list.push(
                <Overview key={i} filename={this.props.match.params.id} hash={this.all_functions[i]} uploaded_mnemonics={this.uploaded_mnemonics[i]}/>
            );
        }
        return list;
    }

    render() {
        return(
            <div>
                {
                    this.state.initialized ? 
                    <div className="sample_container">
                        <Nav />
                        <div className="sample_body">
                            <div className="file_info">
                                <div className="reportImg">
                                    <img className="report_result_img" src="/img/report.png"></img>
                                </div>
                                <div className="file_contents">
                                    <div className="file_name"> file name</div>
                                    <div className="file_meta">
                                        <li className="file_md5"> md5 : {this.meta["md5"]}</li>
                                        <li className="file_sha256"> sha256 : {this.meta["sha256"]} </li>
                                        <li className="file_size"> file size : {this.meta["filesize"]}</li>
                                    </div>
                                </div>
                            </div>
                            <hr className="under_line"></hr>
                            <div className="mnemonic">
                                <div className="contents_title">Mnimonic</div>
                                {this.createListOfOverviews()}
                            </div>
                            <div className="string">
                                <div className="contents_title">String</div>
                            </div>
                            <div className="import">
                                <div className="contents_title">Import</div>
                            </div>
                            <div className="Export">
                                <div className="contents_title">Export</div>
                            </div>

                        </div>
                    </div>
                    :
                    <br/>
                }
            </div>
        );
    }
}


export default Inspect;