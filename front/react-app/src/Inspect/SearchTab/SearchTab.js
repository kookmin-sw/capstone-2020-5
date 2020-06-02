import React, {Component} from 'react';
import Axios from 'axios';
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
        this.showResult = this.showResult.bind(this);   


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    createList() {
        let list = [];
        Object.entries(this.dict).forEach(([key, value]) => {
            if(this.listType == "Import") {
                list.push(
                    <li>
                        {"---------"+key+"---------"}
                        <br/>
                    </li>
                );
                for(let i = 0; i < value.length; ++i) {
                    list.push(
                        <li>
                            {value[i]}
                            <br/>
                        </li>
                    );
                }
            } else {
                list.push(
                    <li key={key}>
                        {value}
                        <br/>
                    </li>
                );
            }
        });
        return list;
    }

    handleChange(event) {
        this.setState({searchValue: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ searchResult: 1 });
        Axios.get("http://127.0.0.1:5000/get_search_data", {
            params: {
                search_value: this.state.searchValue,
                search_type: this.listType
            }
        }).then((response) => {
            if (response.data == "error") {
                window.localStorage.setItem('error_message', "Search result found error");
                window.location = "/error";
            } else {
                this.stringMal = {
                    labels: ["MAL_SIM","MAL_OTHER"],
                    datasets: [
                        {
                            labels: ["MAL_SIM","MAL_OTHER"],
                            data: [response.data["p_graph"][2], response.data["p_graph"][3]],
                            borderWidth: 0,
                            hoverBorderWidth: 0,
                            backgroundColor: [
                                "rgb(208,193,193)",
                                "rgb(255,25,44)"
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
                                "rgb(193,208,203)",
                                "rgb(25,255,148)"
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
                return(<Spinner/>);
            case 2:
                return(
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
                        </tr>
                    </tbody>
                </table>
                );
        }
    }

    render() {
        return (
            <div className="card-body card-width">
                <table className="table search_table">
                    <thead>
                    <tr>
                        <th scope ="col" className="search-table-font">{this.listType} List</th>
                        <th scope="col"  className="search-table-font">Search Similarity</th>
                    </tr>
                    </thead>
                    <tbody>
                    <td className="string-list-scroll">
                        <div className="string-list">
                            {this.createList()}
                        </div>
                    </td>
                    <td>
                        <div className="string-search-part">
                            <div className="string-search-input">
                                <input className="search-input" type="search" value={this.state.searchValue} onChange={this.handleChange} placeholder="Search string" />
                            </div>
                            <div className="string-search-button">
                                <button className="btn btn-lg btn-success search-button" type="submit" onClick={this.handleSubmit}>Search
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