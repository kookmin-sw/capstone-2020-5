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
        this.showMeta = this.showMeta.bind(this);
        this.showSameFile = this.showSameFile.bind(this);
        this.createList = this.createList.bind(this);
        this.createListValues = this.createListValues.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
        this.initLists = this.initLists.bind(this);
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
                this.percentage = 50;
                this.initLists("all_functions");
                this.initLists("string");
                this.initLists("import");
                this.initLists("export");

                this.setState({initialized : true});
            }
        });
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
                                        <li className="file_md5"> md5 : 	55cb06fc7ddebaf8c87df15c3681a1fd</li>
                                        <li className="file_sha256"> sha256 : 	b384422960a820e3091e011d1a74d6cb5f5fb9f98a67e88233c7da1e3f91e778 </li>
                                        <li className="file_size"> file size : 440.92 KB</li>
                                    </div>
                                </div>
                            </div>
                            <hr className="under_line"></hr>
                            <div className="mnemonic">
                                <div className="contents_title">Mnimonic</div>
                                <Overview/>

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