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
                filename: this.props.match.params.id
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
                this.mal_function = this.state.file["mal_functions"];
                this.setState({initialized : true});
            }
        });
    }

    createListOfOverviews(similarity) {
        let list = [];
        if(similarity) {
            for(var i = 0; i < this.all_functions.length; ++i) {
                list.push(
                    <Overview key={i} filename={this.props.match.params.id} hash={this.all_functions[i]} uploaded_mnemonics={this.uploaded_mnemonics[i]} sim={similarity}/>
                );
            }
        }
        else {
            Object.entries(this.mal_function).forEach(([key, value]) => {
                list.push(
                    <Overview key={i} filename={this.props.match.params.id} hash={key} uploaded_mnemonics={value} sim={similarity}/>
                );
            });
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
                                    <div className="file_name">{this.props.match.params.id}</div>
                                    <div className="file_meta">
                                        <li className="file_md5"> md5 : {this.meta["md5"]}</li>
                                        <li className="file_sha256"> sha256 : {this.meta["sha256"]} </li>
                                        <li className="file_size"> file size : {this.meta["filesize"]}</li>
                                    </div>
                                </div>
                            </div>
                            <hr className="under_line"></hr>
                            <ul className="nav nav-pills mb-3 sim-stran-tab" id="pills-tabs" role="tablist">
                                <li className="nav-item">
                                    <a className="tab-style nav-link active" id="pills-similary-tab" data-toggle="pill" href="#similary-tab" role="tab" aria-controls="pills-similary" aria-selected="true">유사도 검사</a>
                                </li>
                                <li className="nav-item">
                                    <a className="tab-style nav-link tab-style" id="pills-starange-tab" data-toggle="pill" href="#strange-tab" role="tab" aria-controls="pills-strange" aria-selected="false">이상탐지</a>
                                </li>
                            </ul>
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="similary-tab" role="tabpanel" aria-labelledby="pills-similary-tab">
                                    <div className="mnemonic">
                                        <div className="contents_title">Function</div>
                                        <div className="mnemonic-scroll">
                                            {this.createListOfOverviews(true)}
                                        </div>
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
                                <div className="tab-pane fade" id="strange-tab" role="tabpanel" aria-labelledby="pills-strange-tab">
                                    <div className="mnemonic">
                                        <div className="contents_title">Function</div>
                                        <div className="mnemonic-scroll">
                                            {this.createListOfOverviews(false)}
                                        </div>
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