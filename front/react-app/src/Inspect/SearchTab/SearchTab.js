import React, {Component} from 'react';
import axios from 'axios';
import {Doughnut} from "react-chartjs-2";
import Spinner from '../../Spinner/Spinner';

class SearchTab extends Component {
    constructor(props) {
        super(props);
        this.listType = this.props.listType
        this.dict = this.props.dict;
        this.isFirstTab = this.props.isFirstTab
        this.createList = this.createList.bind(this);
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

    render() {
        const stringMal = {
            labels: ["ben","mal"],
            datasets: [
                {
                    labels: ["ben","mal"],
                    data: [60, 13],
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
        const stringBen = {
            labels: ["ben","mal"],
            datasets: [
                {
                    labels: ["ben","mal"],
                    data: [60, 13],
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
                                    <div className="donut-container">
                                        <Doughnut
                                            options={{
                                                legend: {
                                                    display: false,
                                                    position: "right"
                                                }
                                            }}
                                            data={stringBen}
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
                                            data={stringMal}
                                            height={120}
                                        />
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SearchTab;