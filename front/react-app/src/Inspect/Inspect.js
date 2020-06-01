import React, { Component } from 'react';
import { Doughnut } from "react-chartjs-2";
import Nav from "../Nav/Nav";
import "./Inspect.css";
import "./sample.css";

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
                
                // Create list of functions' hash
                this.all_functions = this.state.file["all_functions"];
                this.anomaly_functions = this.state.file["anomaly_functions"];
                this.setState({initialized : true});
            }
        });
    }

    createListOfOverviews(similarity) {
        let list = [];
        let array = similarity ? this.all_functions : this.anomaly_functions
        Object.entries(array).forEach(([key, value]) => {
            list.push(
                <Overview key={key} filename={this.props.match.params.id} hash={key} uploaded_mnemonics={value} sim={similarity}/>
            );
        });
        return list;
    }


    render() {
        const expData = {
            labels: ["긍정적", "부정적", "보통"],
            datasets: [
                {
                    labels: ["긍정적", "부정적", "보통"],
                    data: [60, 13, 27],
                    borderWidth: 2,
                    hoverBorderWidth: 3,
                    backgroundColor: [
                        "rgba(238, 102, 121, 1)",
                        "rgba(98, 181, 229, 1)",
                        "rgba(255, 198, 0, 1)"
                    ],
                    fill: true
                }
            ]
        };
        return(
            <div>
                {
                    this.state.initialized ? 
                    <div className="sample_container">
                        <Nav id="top" />
                        <div className="sample_body">
                            <div className="file_info">
                                <div className="reportImg">
                                    <img className="report_result_img" src="/img/report.png"></img>
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
                                        <td>md5</td>
                                        <td>{this.meta["md5"]}</td>
                                    </tr>
                                    <tr>
                                        <td>sha256</td>
                                        <td>{this.meta["sha256"]}</td>
                                    </tr>
                                    <tr>
                                        <td>size</td>
                                        <td>{this.meta["filesize"]}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <hr className="under_line"></hr>
                            <ul className="nav nav-pills mb-3 sim-stran-tab" id="pills-tabs" role="tablist">
                                <li className="nav-item">
                                    <a className="tab-style nav-link active" id="pills-similary-tab" data-toggle="pill" href="#similary-tab" role="tab" aria-controls="pills-similary" aria-selected="true">similarity</a>
                                </li>
                                <li className="nav-item">
                                    <a className="tab-style nav-link tab-style" id="pills-starange-tab" data-toggle="pill" href="#strange-tab" role="tab" aria-controls="pills-strange" aria-selected="false">anomaly detection</a>
                                </li>
                            </ul>
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="similary-tab" role="tabpanel" aria-labelledby="pills-similary-tab">
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
                                                                arrow_drop_down_circle
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
                                                                arrow_drop_down_circle
                                                            </span>
                                                        </h5>
                                                    </a>
                                                </div>

                                                <div id="String_contents_acco" className="collapse" role="tabpanel"
                                                     aria-labelledby="String_handle_acco"
                                                     data-parent="#accordionEx">
                                                    <div className="card-body card-width">
                                                        <table className="table search_table">
                                                            <thead>
                                                            <tr>
                                                                <th scope ="col" className="search-table-font">string list</th>
                                                                <th scope="col"  className="search-table-font">search similarity</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            <td className="string-list-scroll">
                                                                <div className="string-list">
                                                                    this is a dangerous file
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="string-search-part">
                                                                    <div className="string-search-input">
                                                                        <input className="search-input" type="search" placeholder="Search string" />
                                                                    </div>
                                                                    <div className="string-search-button">
                                                                        <button className="btn btn-lg btn-success search-button" type="submit">Search
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <table className="table string-donut-table">
                                                                    <thead>
                                                                    <tr>
                                                                        <th>
                                                                            ben(%)
                                                                        </th>
                                                                        <th>
                                                                            mal(%)
                                                                        </th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <Doughnut
                                                                                options={{
                                                                                    legend: {
                                                                                        display: true,
                                                                                        position: "right"
                                                                                    }
                                                                                }}
                                                                                data={expData}
                                                                                height={120}
                                                                            />
                                                                        </td>
                                                                        <td>mal 도넛 들어갈 자리</td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>


                                                            </td>
                                                            </tbody>
                                                        </table>
                                                    </div>
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
                                                                arrow_drop_down_circle
                                                            </span>
                                                        </h5>
                                                    </a>
                                                </div>

                                                <div id="Import_contents_acco" className="collapse" role="tabpanel"
                                                     aria-labelledby="Import_handle_acco"
                                                     data-parent="#accordionEx">
                                                    <div className="card-body card-width">
                                                        <table className="table search_table">
                                                            <thead>
                                                            <tr>
                                                                <th scope ="col" className="search-table-font">import list</th>
                                                                <th scope="col"  className="search-table-font">search similarity</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            <td className="string-list-scroll">hi, yerin</td>
                                                            <td>
                                                                <div className="string-search-part">
                                                                    <div className="string-search-input">
                                                                        <input className="search-input" type="search" placeholder="Search import" />
                                                                    </div>
                                                                    <div className="string-search-button">
                                                                        <button className="btn btn-lg btn-success search-button" type="submit">Search
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <table className="table string-donut-table">
                                                                    <thead>
                                                                    <tr>
                                                                        <th>
                                                                            ben
                                                                        </th>
                                                                        <th>
                                                                            mal
                                                                        </th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    <tr>
                                                                        <td>donut</td>
                                                                        <td>donut</td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>


                                                            </td>
                                                            </tbody>
                                                        </table>
                                                    </div>
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
                                                                arrow_drop_down_circle
                                                            </span>
                                                        </h5>
                                                    </a>
                                                </div>

                                                <div id="Export_contents_acco" className="collapse" role="tabpanel"
                                                     aria-labelledby="Export_handle_acco"
                                                     data-parent="#accordionEx">
                                                    <div className="card-body card-width">
                                                        <table className="table search_table">
                                                            <thead>
                                                            <tr>
                                                                <th scope ="col" className="search-table-font">Export list</th>
                                                                <th scope="col"  className="search-table-font">search similarity</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            <td className="string-list-scroll">hi, yerin</td>
                                                            <td>
                                                                <div className="string-search-part">
                                                                    <div className="string-search-input">
                                                                        <input className="search-input" type="search" placeholder="Search Export" />
                                                                    </div>
                                                                    <div className="string-search-button">
                                                                        <button className="btn btn-lg btn-success search-button" type="submit">Search
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <table className="table string-donut-table">
                                                                    <thead>
                                                                    <tr>
                                                                        <th>
                                                                            ben
                                                                        </th>
                                                                        <th>
                                                                            mal
                                                                        </th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    <tr>
                                                                        <td>donut</td>
                                                                        <td>donut</td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>


                                                            </td>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                    </div>

                                </div>
                                <div className="tab-pane fade" id="strange-tab" role="tabpanel" aria-labelledby="pills-strange-tab">
                                    <div className="mnemonic">
                                        <div className="accordion md-accordion" id="accordionEx" role="tablist"
                                             aria-multiselectable="true">

                                            <div className="card">
                                                <div className="accordion_head" role="tab" id="function_handle_acco">
                                                    <div className="contents_title_strange acco_header_title">Function</div>
                                                    <a  className="acco_header_title dropdown-icon-strange" data-toggle="collapse" data-parent="#accordionEx"
                                                        href="#function_contents_acco" aria-expanded="true"
                                                        aria-controls="collapseOne1">
                                                        <h5 className="mb-0">
                                                                <span className="material-icons">
                                                                arrow_drop_down_circle
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
                                                                arrow_drop_down_circle
                                                            </span>
                                                        </h5>
                                                    </a>
                                                </div>

                                                <div id="String_contents_acco" className="collapse" role="tabpanel"
                                                     aria-labelledby="String_handle_acco"
                                                     data-parent="#accordionEx">
                                                    <div className="card-body card-width">
                                                        <table className="table search_table">
                                                            <thead>
                                                            <tr>
                                                                <th scope ="col" className="search-table-font">string list</th>
                                                                <th scope="col"  className="search-table-font">search similaryty</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            <td className="string-list-scroll">this is a dangerous file</td>
                                                            <td>
                                                                <div className="string-search-part">
                                                                    <div className="string-search-input">
                                                                        <input className="search-input" type="search" placeholder="Search string" />
                                                                    </div>
                                                                    <div className="string-search-button">
                                                                        <button className="btn btn-lg btn-success search-button" type="submit">Search
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <table className="table string-donut-table">
                                                                    <thead>
                                                                    <tr>
                                                                        <th>
                                                                            ben
                                                                        </th>
                                                                        <th>
                                                                            mal
                                                                        </th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    <tr>
                                                                        <td>donut</td>
                                                                        <td>donut</td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>


                                                            </td>
                                                            </tbody>
                                                        </table>
                                                    </div>
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
                                                                arrow_drop_down_circle
                                                            </span>
                                                        </h5>
                                                    </a>
                                                </div>

                                                <div id="Import_contents_acco" className="collapse" role="tabpanel"
                                                     aria-labelledby="Import_handle_acco"
                                                     data-parent="#accordionEx">
                                                    <div className="card-body card-width">
                                                        <table className="table search_table">
                                                            <thead>
                                                            <tr>
                                                                <th scope ="col" className="search-table-font">import list</th>
                                                                <th scope="col"  className="search-table-font">search similarity</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            <td className="string-list-scroll">hi, yerin</td>
                                                            <td>
                                                                <div className="string-search-part">
                                                                    <div className="string-search-input">
                                                                        <input className="search-input" type="search" placeholder="Search import" />
                                                                    </div>
                                                                    <div className="string-search-button">
                                                                        <button className="btn btn-lg btn-success search-button" type="submit">Search
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <table className="table string-donut-table">
                                                                    <thead>
                                                                    <tr>
                                                                        <th>
                                                                            ben
                                                                        </th>
                                                                        <th>
                                                                            mal
                                                                        </th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    <tr>
                                                                        <td>donut</td>
                                                                        <td>donut</td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>


                                                            </td>
                                                            </tbody>
                                                        </table>
                                                    </div>
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
                                                                arrow_drop_down_circle
                                                            </span>
                                                        </h5>
                                                    </a>
                                                </div>

                                                <div id="Export_contents_acco" className="collapse" role="tabpanel"
                                                     aria-labelledby="Export_handle_acco"
                                                     data-parent="#accordionEx">
                                                    <div className="card-body card-width">
                                                        <table className="table search_table">
                                                            <thead>
                                                            <tr>
                                                                <th scope ="col" className="search-table-font">Export list</th>
                                                                <th scope="col"  className="search-table-font">search similarity</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            <td className="string-list-scroll">hi, yerin</td>
                                                            <td>
                                                                <div className="string-search-part">
                                                                    <div className="string-search-input">
                                                                        <input className="search-input" type="search" placeholder="Search Export" />
                                                                    </div>
                                                                    <div className="string-search-button">
                                                                        <button className="btn btn-lg btn-success search-button" type="submit">Search
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <table className="table string-donut-table">
                                                                    <thead>
                                                                    <tr>
                                                                        <th>
                                                                            ben
                                                                        </th>
                                                                        <th>
                                                                            mal
                                                                        </th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    <tr>
                                                                        <td>donut</td>
                                                                        <td>donut</td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>


                                                            </td>
                                                            </tbody>
                                                        </table>
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
                    <br/>
                }
            </div>
        );
    }
}


export default Inspect;