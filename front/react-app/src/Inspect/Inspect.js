import React, { Component } from 'react';
import {HorizontalBar} from "react-chartjs-2";
import Nav from "../Nav/Nav";
import "./Inspect.css";
import "./sample.css";

import Axios from 'axios';
import Spinner from '../Spinner/Spinner';
import Overview from './Overview/Overview';
import SearchTab from './SearchTab/SearchTab';
import LineGraph from './LineGraph';


class Inspect extends Component {

    constructor(props) {
        super(props);
            this.state = {
                file : null,
                initialized : false
            }
        this.createListOfOverviews = this.createListOfOverviews.bind(this);
        this.createDetails = this.createDetails.bind(this);
        this.createPE = this.createPE.bind(this);
        this.createList = this.createList.bind(this);
    }

    componentDidMount() {
        Axios.get("http://127.0.0.1:5000/get_files", {
            params: {
                filename: this.props.match.params.id
            }
        }).then((response) => {
            if (typeof response.data == "string"&& response.data.split(",")[0]  == "error") {
                window.localStorage.setItem('error_message', response.data.split(",")[1]);
                window.location = "/error";
            } else {
                this.setState({ file: response.data });

                this.meta = this.state.file["meta"];
                this.samefile = this.state.file["samefile"];
                this.string = this.state.file["string"]
                this.export = this.state.file["export"]
                this.import = this.state.file["import"]
                this.PE = this.state.file["PE"];

                // Create list of functions' hash
                this.all_functions = this.state.file["all_functions"];

                this.anomaly_functions = this.state.file["anomaly_functions"];
                this.virustotal="https://www.virustotal.com/gui/file/"+this.meta["sha256"]+"/details"


                this.setState({initialized : true});
            }
        });
    }

    createListOfOverviews(similarity) {
        let list = [];
        let array = similarity ? this.all_functions : this.anomaly_functions
        Object.entries(array).forEach(([key, value]) => {
            list.push(
                <Overview onclick={() => {this.setState({initialized : false})}} key={key} filename={this.props.match.params.id} hash={key} uploaded_mnemonics={value} sim={similarity}/>
            );
        });
        return list;
    }

    createDetails() {
        let tableContents = [];
        Object.entries(this.meta).forEach(([key, value]) => {
            tableContents.push(
                <tr>
                    <td>{key.toUpperCase()}</td>
                    <td>{value}</td>
                </tr>
            );
        });
        return tableContents;
    }

    createList(array, isImport) {
        let list = [];
        var count = 100000;
        Object.entries(array).forEach(([key, value]) => {
            if(isImport) {
                count++;
                let body=[];
                for(let i = 0; i < value.length; ++i) {
                    body.push(
                        <tr key={key+i}>
                            {value[i]}
                            <br/>
                        </tr>
                    );
                }
                list.push(
                    <div className="accordion" id="accordionImport">
                        <div className="card" style={{"margin-left": 30}}>
                            <div className="import-card" id={"importHead"+count}>
                                    <div className="import-button" type="button" data-toggle="collapse" data-target={"#collapseImport"+count} aria-expanded="true" aria-controls={"collapseImport"+count}>
                                        {key}<span className="material-icons">keyboard_arrow_down</span>
                                    </div>
                            </div>

                            <div id={"collapseImport"+count} className="collapse" aria-labelledby={"importHead"+count}
                                 data-parent="#accordionImport">
                                <div className="card-body import-body">
                                    {body}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            }else {
                for(let i = 0; i < value.length; ++i) {
                    list.push(
                        <li key={key}>
                            {value[i]}
                        </li>
                    );
                }
            }
        });
        return list;
    }

    createPE() {
        let list = []
        var count = 10000;
        Object.entries(this.PE).forEach(([key, value]) => {
            count++;
            let body = []
            Object.entries(value).forEach(([ikey, ivalue]) => {
                console.log(ikey)
                console.log(ivalue)
                body.push(
                    <tr>
                        <td>
                            {ikey}
                        </td>
                        <td>
                            {ivalue}
                        </td>
                    </tr>
                );
            });
            list.push(
                <div className="accordion" id="accordionImport">
                    <div className="card" style={{"margin-left": 30}}>
                        <div className="import-card" id={"importHead"+count}>
                                <div className="import-button" type="button" data-toggle="collapse" data-target={"#collapseImport"+count} aria-expanded="true" aria-controls={"collapseImport"+count}>
                                    {key+count}<span className="material-icons">keyboard_arrow_down</span>
                                </div>
                        </div>
                        <div id={"collapseImport"+count} className="collapse" aria-labelledby={"importHead"+count}
                             data-parent="#accordionImport">
                            <div className="card-body import-body">
                                {body}
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
        return list;
    }


    render() {
        return(
            <div>
                {
                    this.state.initialized ?
                    <div className="sample_container">
                        <Nav id="top" />
                        <div className="sample_body">
                            <div className="file_info">
                                <div className="reportImg">
                                    <img className="report_result_img" src="/img/reports.png"></img>
                                </div>
                                <table className="file_contents">
                                    <thead>
                                    <tr>
                                        <th colSpan="2">
                                            {this.props.match.params.id}
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>MD5</td>
                                        <td>{this.meta["md5"]}</td>
                                    </tr>
                                    <tr>
                                        <td>SHA256</td>
                                        <td>{this.meta["sha256"]}</td>
                                    </tr>
                                    <tr>
                                        <td>SIZE</td>
                                        <td>{this.meta["filesize"]}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">
                                            <a href={this.virustotal} target="_blank" title="Virustotal Link" style={{"font-weight": "bold"}}>
                                                <img class="virustotal-img" src="/img/vt_logo.svg" width="24" height="24"/>
                                                &#160;&#160;VIRUSTOTAL
                                            </a>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <hr className="under_line"></hr>
                            <ul className="nav nav-pills mb-3 sim-stran-tab" id="pills-tabs" role="tablist">
                                <li className="nav-item">
                                    <a className="tab-style nav-link blue-tab active" id="pills-details-tab" data-toggle="pill" href="#details-tab" role="tab" aria-controls="pills-details" aria-selected="true">Details</a>
                                </li>
                                <li className="nav-item">
                                    <a className="tab-style nav-link blue-tab " id="pills-similary-tab" data-toggle="pill" href="#similary-tab" role="tab" aria-controls="pills-similary" aria-selected="true">Similarity</a>
                                </li>
                                <li className="nav-item">
                                    <a className="tab-style nav-link red-tab tab-style" id="pills-starange-tab" data-toggle="pill" href="#strange-tab" role="tab" aria-controls="pills-strange" aria-selected="false">Anomaly Detection</a>
                                </li>

                            </ul>
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade" id="similary-tab" role="tabpanel" aria-labelledby="pills-similary-tab">
                                    <div className="mnemonic">
                                        <div className="accordion md-accordion" id="accordionEx" role="tablist"
                                             aria-multiselectable="true">

                                            <div className="card">
                                                <div className="accordion_head" role="tab" id="function_handle_acco">
                                                    <div className="contents_title acco_header_title">Function</div>
                                                    <a  className="acco_header_title dropdown-icon" data-toggle="collapse" data-parent="#accordionEx"
                                                       href="#function_contents_acco" aria-expanded="true"
                                                       aria-controls="collapseOne1">
                                                        <h5 className="mb-0">
                                                                <span className="material-icons">
                                                                keyboard_arrow_down
                                                            </span>
                                                        </h5>
                                                    </a>
                                                </div>

                                                <div id="function_contents_acco" className="collapse show" role="tabpanel"
                                                     aria-labelledby="function_handle_acco"
                                                     data-parent="#accordionEx">
                                                    <div className="card-body card-width">
                                                        <div className="mnemonic-scroll">
                                                            {this.createListOfOverviews(true)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                    </div>
                                    <div className="String">
                                        <div className="accordion md-accordion" id="accordionEx" role="tablist"
                                             aria-multiselectable="true">
                                            <div className="card">
                                                <div className="accordion_head" role="tab" id="String_handle_acco">
                                                    <div className="contents_title acco_header_title">String</div>
                                                    <a  className="acco_header_title dropdown-icon" data-toggle="collapse" data-parent="#accordionEx"
                                                       href="#String_contents_acco" aria-expanded="true"
                                                       aria-controls="collapseOne2">
                                                        <h5 className="mb-0">
                                                                <span className="material-icons">
                                                                keyboard_arrow_down
                                                            </span>
                                                        </h5>
                                                    </a>
                                                </div>

                                                <div id="String_contents_acco" className="collapse" role="tabpanel"
                                                     aria-labelledby="String_handle_acco"
                                                     data-parent="#accordionEx">
                                                    <SearchTab listType="String" dict={this.string}/>
                                                </div>
                                            </div>
                                        </div>



                                    </div>
                                    <div className="Import">
                                        <div className="accordion md-accordion" id="accordionEx" role="tablist" aria-multiselectable="true">
                                            <div className="card">
                                                <div className="accordion_head" role="tab" id="Import_handle_acco">
                                                    <div className="contents_title acco_header_title">Import</div>
                                                    <a  className="acco_header_title dropdown-icon" data-toggle="collapse" data-parent="#accordionEx"
                                                       href="#Import_contents_acco" aria-expanded="true"
                                                       aria-controls="collapseOne3">
                                                        <h5 className="mb-0">
                                                                <span className="material-icons">
                                                                keyboard_arrow_down
                                                            </span>
                                                        </h5>
                                                    </a>
                                                </div>

                                                <div id="Import_contents_acco" className="collapse" role="tabpanel"
                                                     aria-labelledby="Import_handle_acco"
                                                     data-parent="#accordionEx">
                                                    <SearchTab listType="Import" dict={this.import}/>
                                                </div>
                                            </div>
                                        </div>



                                    </div>
                                    <div className="Export">
                                        <div className="accordion md-accordion" id="accordionEx" role="tablist" aria-multiselectable="true">
                                            <div className="card">
                                                <div className="accordion_head" role="tab" id="Export_handle_acco">
                                                    <div className="contents_title acco_header_title">Export</div>
                                                    <a  className="acco_header_title dropdown-icon" data-toggle="collapse" data-parent="#accordionEx"
                                                       href="#Export_contents_acco" aria-expanded="true"
                                                       aria-controls="collapseOne4">
                                                        <h5 className="mb-0">
                                                                <span className="material-icons">
                                                                keyboard_arrow_down
                                                            </span>
                                                        </h5>
                                                    </a>
                                                </div>

                                                <div id="Export_contents_acco" className="collapse" role="tabpanel"
                                                     aria-labelledby="Export_handle_acco"
                                                     data-parent="#accordionEx">
                                                    <SearchTab listType="Export" dict={this.export}/>
                                                </div>
                                            </div>
                                        </div>



                                    </div>

                                </div>
                                <div className="tab-pane fade" id="strange-tab" role="tabpanel" aria-labelledby="pills-strange-tab">
                                    <div className="mnemonic">
                                        <div className="accordion md-accordion" id="accordionEx" role="tablist"
                                             aria-multiselectable="true">
                                            <LineGraph filename={this.props.match.params.id}/>
                                            <div className="card">
                                                <div className="accordion_head" role="tab" id="function_handle_acco">
                                                    <div className="contents_title_strange acco_header_title">Function</div>
                                                    <a  className="acco_header_title dropdown-icon-strange" data-toggle="collapse" data-parent="#accordionEx"
                                                        href="#function_contents_acco" aria-expanded="true"
                                                        aria-controls="collapseOne1">
                                                        <h5 className="mb-0">
                                                                <span className="material-icons">
                                                                keyboard_arrow_down
                                                            </span>
                                                        </h5>
                                                    </a>
                                                </div>

                                                <div id="function_contents_acco" className="collapse show" role="tabpanel"
                                                     aria-labelledby="function_handle_acco"
                                                     data-parent="#accordionEx">
                                                    <div className="card-body card-width">
                                                        <div className="mnemonic-scroll">
                                                            {this.createListOfOverviews(false)}                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                    </div>
                                    <div className="String">
                                        <div className="accordion md-accordion" id="accordionEx" role="tablist"
                                             aria-multiselectable="true">

                                            <div className="card">
                                                <div className="accordion_head" role="tab" id="String_handle_acco">
                                                    <div className="contents_title_strange acco_header_title">String</div>
                                                    <a  className="acco_header_title dropdown-icon-strange" data-toggle="collapse" data-parent="#accordionEx"
                                                        href="#String_contents_acco" aria-expanded="true"
                                                        aria-controls="collapseOne2">
                                                        <h5 className="mb-0">
                                                                <span className="material-icons">
                                                                keyboard_arrow_down
                                                            </span>
                                                        </h5>
                                                    </a>
                                                </div>

                                                <div id="String_contents_acco" className="collapse" role="tabpanel"
                                                     aria-labelledby="String_handle_acco"
                                                     data-parent="#accordionEx">
                                                    <SearchTab listType="String" dict={this.string} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Import">
                                        <div className="accordion md-accordion" id="accordionEx" role="tablist" aria-multiselectable="true">
                                            <div className="card">
                                                <div className="accordion_head" role="tab" id="Import_handle_acco">
                                                    <div className="contents_title_strange acco_header_title">Import</div>
                                                    <a  className="acco_header_title dropdown-icon-strange" data-toggle="collapse" data-parent="#accordionEx"
                                                        href="#Import_contents_acco" aria-expanded="true"
                                                        aria-controls="collapseOne3">
                                                        <h5 className="mb-0">
                                                                <span className="material-icons">
                                                                keyboard_arrow_down
                                                            </span>
                                                        </h5>
                                                    </a>
                                                </div>

                                                <div id="Import_contents_acco" className="collapse" role="tabpanel"
                                                     aria-labelledby="Import_handle_acco"
                                                     data-parent="#accordionEx">
                                                    <SearchTab listType="Import" dict={this.import}/>
                                                </div>
                                            </div>
                                        </div>



                                    </div>
                                    <div className="Export">
                                        <div className="accordion md-accordion" id="accordionEx" role="tablist" aria-multiselectable="true">
                                            <div className="card">
                                                <div className="accordion_head" role="tab" id="Export_handle_acco">
                                                    <div className="contents_title_strange acco_header_title">Export</div>
                                                    <a  className="acco_header_title dropdown-icon-strange" data-toggle="collapse" data-parent="#accordionEx"
                                                        href="#Export_contents_acco" aria-expanded="true"
                                                        aria-controls="collapseOne4">
                                                        <h5 className="mb-0">
                                                                <span className="material-icons">
                                                                keyboard_arrow_down
                                                            </span>
                                                        </h5>
                                                    </a>
                                                </div>

                                                <div id="Export_contents_acco" className="collapse" role="tabpanel"
                                                     aria-labelledby="Export_handle_acco"
                                                     data-parent="#accordionEx">
                                                    <SearchTab listType="Export" dict={this.export}/>
                                                </div>
                                            </div>
                                        </div>



                                    </div>
                                </div>
                                <div className="tab-pane fade  show active" id="details-tab" role="tabpanel" aria-labelledby="pills-strange-tab">
                                    <div className="mnemonic">

                                        <div className="Details-accord" style={{"margin-bottom":"30px"}}>
                                            <h2>HASH</h2>
                                            <table className="">
                                                {this.createDetails()}
                                            </table>
                                        </div>
                                            <div className="accordion Details-accord"  id="pe_det_acc" style={{"margin-bottom":"30px"}}>
                                                <div className="card">
                                                    <div className="import-card" id="pe_det_">
                                                            <div className="import-button" type="button" data-toggle="collapse" data-target="#pe_det" aria-expanded="true" aria-controls="pe_det">
                                                                <h2>PE</h2><span className="material-icons">keyboard_arrow_down</span>
                                                            </div>
                                                    </div>

                                                    <div id="pe_det" className="collapse" aria-labelledby="pe_det"
                                                        data-parent="#pe_det_acc">
                                                        <div className="card-body import-body">
                                                            {this.createPE()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="accordion Details-accord" id="string_det_acc" style={{"margin-bottom":"30px"}}>
                                                <div className="card">
                                                    <div className="import-card" id="string_det_">
                                                            <div className="import-button" type="button" data-toggle="collapse" data-target="#string_det" aria-expanded="true" aria-controls="string_det">
                                                                <h2>STRING</h2><span className="material-icons">keyboard_arrow_down</span>
                                                            </div>
                                                    </div>

                                                    <div id="string_det" className="collapse" aria-labelledby="string_det"
                                                        data-parent="#string_det_acc">
                                                        <div className="card-body import-body details-string">
                                                            {this.createList(this.string, false)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="accordion Details-accord" id="import_det_acc" style={{"margin-bottom":"30px"}}>
                                                <div className="card">
                                                    <div className="import-card" id="pe_det_">
                                                            <div className="import-button" type="button" data-toggle="collapse" data-target="#import_det" aria-expanded="true" aria-controls="import_det">
                                                                <h2>IMPORT</h2><span className="material-icons">keyboard_arrow_down</span>
                                                            </div>
                                                    </div>

                                                    <div id="import_det" className="collapse" aria-labelledby="import_det"
                                                        data-parent="#import_det_acc">
                                                        <div className="card-body import-body">
                                                            {this.createList(this.import, true)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="accordion Details-accord" id="export_det_acc" style={{"margin-bottom":"30px"}}>
                                                <div className="card">
                                                    <div className="import-card" id="export_det_">
                                                            <div className="import-button" type="button" data-toggle="collapse" data-target="#export_det" aria-expanded="true" aria-controls="export_det">
                                                                <h2>EXPORT</h2><span className="material-icons">keyboard_arrow_down</span>
                                                            </div>
                                                    </div>

                                                    <div id="export_det" className="collapse" aria-labelledby="export_det"
                                                        data-parent="#export_det_acc">
                                                        <div className="card-body import-body details-export">
                                                            {this.createList(this.export, false)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                        </div>
                        <div className="homebutton">
                            <a href="#top">
                                <span className="material-icons">arrow_upward</span>
                            </a>

                        </div>
                    </div>

                    :

            <div style={{marginTop:"350px"}}>
                <Spinner/>
            </div>
                }
            </div>
        );
    }
}


export default Inspect;
