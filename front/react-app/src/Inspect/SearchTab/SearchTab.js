import React, {Component} from 'react';
import axios from 'axios';
import {Doughnut} from "react-chartjs-2";
import Spinner from '../../Spinner/Spinner';

class SearchTab extends Component {
    constructor(props) {
        super(props);
        this.listType = this.props.listType
        this.dict = this.props.dict;
        this.createList = this.createList.bind(this);
        this.state = {
            searchValue:"",
            // 0 - empty
            // 1 - loading
            // 2 - result
            searchResult : 0
        }
        this.stringMal = {};
        this.stringBen = {};
        this.filemalben={};
        this.showResult = this.showResult.bind(this);   

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.autoSearch = this.autoSearch.bind(this);
    }

    createList() {
        let list = [];
        var count = 0;
        Object.entries(this.dict).forEach(([key, value]) => {
            if(this.listType == "Import") {
                count++;
                let body=[];
                for(let i = 0; i < value.length; ++i) {
                    body.push(
                        <li onClick={() => {this.autoSearch(value[i])}} key={key+i}>
                            {value[i]}
                            <br/>
                        </li>
                    );
                }
                list.push(
                    <div className="accordion" id="accordionImport">
                        <div className="card">
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

            }else {
                for(let i = 0; i < value.length; ++i) {
                    list.push(
                        <li onClick={() => {this.autoSearch(value[i])}} key={key}>
                            {value[i]}
                        </li>
                    );
                }
            }
        });
        return list;
    }

    autoSearch(value) {
        this.setState({searchValue: value});
        this.handleSubmit(null, value);
    }

    handleChange(event) {
        this.setState({searchValue: event.target.value});
    }

    handleSubmit(event, autoSearchValue) {
        if(event != null) {
            event.preventDefault();
        }
        this.setState({ searchResult: 1 });
        axios.get("http://127.0.0.1:5000/get_search_data", {
            params: {
                search_value: autoSearchValue == undefined ? this.state.searchValue : autoSearchValue,
                search_type: this.listType
            }
        }).then((response) => {
            if (typeof response.data == "string") {
                this.setState({ searchResult: 3 });
            } else {
                this.originBen = [];
                for(let i = 0; i < response.data["origin_file_hash"][0].length; ++i) {
                    this.originBen.push(
                        <li>
                            {response.data["origin_file_hash"][0][i]}
                        </li>
                    );
                }
                this.originMal = [];
                for(let i = 0; i < response.data["origin_file_hash"][1].length; ++i) {
                    this.originMal.push(
                        <li>
                            {response.data["origin_file_hash"][1][i]}
                        </li>
                    );
                }
                
                this.stringMal = {
                    labels: ["MAL_SIM","MAL_OTHER"],
                    datasets: [
                        {
                            labels: ["MAL_SIM","MAL_OTHER"],
                            data: [response.data["p_graph"][2], response.data["p_graph"][3]],
                            borderWidth: 0,
                            hoverBorderWidth: 0,
                            backgroundColor: [
                                "rgb(255,25,44)",
                                "rgb(208,193,193)"
                            ],
                            fill: true
                        }
                    ]
                };
                this.stringBen = {
                    labels: ["BEN_SIM","BEN_OTHER"],
                    datasets: [
                        {
                            labels: ["BEN_SIM","BEN_OTHER"],
                            data: [response.data["p_graph"][0], response.data["p_graph"][1]],
                            borderWidth: 0,
                            hoverBorderWidth: 0,
                            backgroundColor: [
                                "rgb(25,255,148)",
                                "rgb(193,208,203)"
                            ],
                            fill: true
                        }
                    ]
                };
                this.filemalben = {
                    labels: ["FILE_BEN","FILE_MAL"],
                    datasets: [
                        {
                            labels: ["FILE_BEN","FILE_MAL"],
                            data: [response.data["p_graph"][4], response.data["p_graph"][5]],
                            borderWidth: 0,
                            hoverBorderWidth: 0,
                            backgroundColor: [
                                "rgb(25,255,148)",
                                "rgb(255,25,44)",
                            ],
                            fill: true
                        }
                    ]
                };
                this.setState({ searchResult: 2 });
            }
        });
    }

    showResult() {
        switch(this.state.searchResult) {
            case 0:
                return(<div></div>);
            case 1:
                return(<Spinner />);
            case 2:
                return(
                    <div className="string-donut-table-contain">
                        <table className="table string-donut-table">
                            <thead>
                            <tr>
                                <th>
                                    Ben(%)
                                </th>
                                <th>
                                    Mal(%)
                                </th>
                                <th>
                                    Mal Ben Rate(%)
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <div className="donut-container">
                                        <Doughnut
                                            options={{
                                                legend: {
                                                    display: false,
                                                    position: "right"
                                                }
                                            }}
                                            data={this.stringBen}
                                            height={120}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className="donut-container">
                                        <Doughnut
                                            options={{
                                                legend: {
                                                    display: false,
                                                    position: "right"
                                                }
                                            }}
                                            data={this.stringMal}
                                            height={120}
                                        />
                                    </div>
                                </td>
                                <td rowSpan="2">
                                    <div className="donut-container">
                                        <Doughnut
                                            options={{
                                                legend: {
                                                    display: false,
                                                    position: "right"
                                                }
                                            }}
                                            data={this.filemalben}
                                            height={120}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="origin-similary-data">{this.originBen}</div>
                                </td>
                                <td>
                                    <div className="origin-similary-data">{this.originMal}</div>
                                </td>
                            </tr>
                            </tbody>
                        </table>

                    </div>
                );
            case 3:
                return(<div>No Data Found</div>);
        }
    }

    render() {
        return (
            <div className="card-body card-width">
                <table className="table search_table">
                    <thead>
                    <tr>
                        <th scope ="col" className="search-table-font">{this.listType} List</th>
                        <th scope="col"  className="search-table-font" colSpan="2">Search Similarity</th>
                    </tr>
                    </thead>
                    <tbody>
                    <td className="string-list-scroll">
                        <div className="string-list">
                            {this.createList()}
                        </div>
                    </td>
                    <td className="search-similary-tab" colSpan="2">
                        <div className="string-search-part">
                            <div className="string-search-input">
                                <input className="search-input" type="search" value={this.state.searchValue} onChange={this.handleChange} placeholder="Search string" />
                            </div>
                            <div className="string-search-button">
                                <button style={{color:"white"}} className="btn btn-lg search-button" type="submit" onClick={this.handleSubmit}>Search
                                </button>
                            </div>
                        </div>
                        {this.showResult()}
                    </td>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SearchTab;