import React, { Component } from 'react';
import Axios from 'axios';
import "../Balloon/Balloon";
import "./Overview.css"
import "../Inspect.css";
import "../sample.css";
import Balloon from '../Balloon/Balloon';
import Spinner from "../../Spinner/Spinner";
class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataloaded : false
        }
        this.filename = this.props.filename
        this.hash = this.props.hash

        this.loadFunctionData = this.loadFunctionData.bind(this);
    }

    loadFunctionData() {
        if(!this.state.dataloaded) {
            Axios.get("http://127.0.0.1:5000/get_function_data", {
                params: {
                    filename:this.filename,
                    hash: this.hash
                }
            }).then((response) => {
                if (response.data == "error") {
                    window.localStorage.setItem('error_message', "Function data not found error");
                    window.location = "/error";
                } else {
                    this.uploaded_mnemonics = this.props.uploaded_mnemonics
                    this.mal_ben = response.data["mal_ben"];
                    this.function_data = response.data["same_functions"]
                    this.setState({dataloaded : true});
                }
            });
        }
    }

    createListOfSameFunctions() {
        let list = [];
        Object.entries(this.function_data).forEach(([key, value]) => {
            list.push(
                <tr>
                    <th scope="row">{key}</th>
                    <td>{value["cosine"]}</td>
                    <td>{value["edit"]}</td>
                    <td>
                        <button type="button" className="zoomin-btn"
                                data-toggle="modal" data-target={"#h" + key}>
                            <span className="material-icons">zoom_in</span>
                        </button>
                        <div className="modal fade modal-center" id={"h"+key}
                             tabIndex="-1" role="dialog"
                             aria-labelledby={"h"+key+"Title"}
                             aria-hidden="true">
                            <div className="modal-content-size modal-dialog modal-dialog-centered"
                                 role="document">
                                <div className="modal-content">
                                    <div className="modal-header modal-head-title">
                                        <div className="modal-title taget_title"
                                             id={"h"+key+"Title"}>
                                            (유사한 파일 md5)
                                        </div>
                                        <button type="button" className="close close-btn-white"
                                                data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body" style={{padding:"0"}}>
                                        <table className="gradient-table" style={{width:"100%"}}>
                                            <tr style={{padding:"0"}}>
                                                <th className="compare-taget">{this.hash}</th>
                                                <th style={{width:"100%", padding:"0"}} className="gradient-img" rowSpan="2">
                                                    <Balloon mnemonics={this.uploaded_mnemonics}/>
                                                    <Balloon mnemonics={this.function_data[key]["mnemonics"]}/>
                                                </th>
                                            </tr>
                                            <tr>
                                                <td style={{padding:"0"}} className="compare-taget">
                                                    {key}
                                                </td>
                                                
                                            </tr>
                                        </table>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button"
                                                className="filelist_btn purple">Download</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            );
        });
        return list;
    }

    render() {
        return (
            <div id="accordion">
                <div className="card full_accordion">
                    <div className="accordion-header" id="headingOne">
                        <div className="mb-0 each_function">
                            <div className="function_hash col-10">
                                {this.hash}
                            </div>
                            <div className="result-button-contain col-2">
                                <div className="filelist_btn purple" data-toggle="collapse"
                                     data-target={"#h"+this.hash+"One"} aria-expanded="true"
                                     aria-controls={"h"+this.hash+"One"} onClick={this.loadFunctionData}>
                                    유사도 검사
                                </div>
                            </div>
                        </div>
                    </div>
                        <div id={"h"+this.hash+"One"} className="collapse" aria-labelledby="headingOne"
                        data-parent="#accordion">
                         {
                        this.state.dataloaded ?     
                            <div className="card-body">
                                <div className="progress-contain">
                                    <div className="progress">
                                    <div style={{width: (parseFloat(this.mal_ben["ben"]) * 100)+"%",backgroundColor:"#20c997"}} role="progressbar"
                                            aria-valuenow="30" aria-valuemin="0"
                                            aria-valuemax="100"></div>
                                        <div style={{width: (parseFloat(this.mal_ben["mal"]) * 100)+"%",backgroundColor:"#ff2b99"}} role="progressbar"
                                            aria-valuenow="20" aria-valuemin="0"
                                            aria-valuemax="100"></div>
                                    </div>
                                    <table className="mal-ben-percentage">
                                        <th className="part-ben">정상</th>
                                        <th className="part-mal">악성</th>
                                    </table>
                                </div>
                                <div className="similary-result-table">
                                    <table className="table table-striped">
                                        <thead>
                                        <tr>
                                            <th scope="col">md5</th>
                                            <th scope="col">Cosine</th>
                                            <th scope="col">Jaccard-distance</th>
                                            <th scope="col">Details</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {this.createListOfSameFunctions()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            :
                            <Spinner/>
                        }
                        </div>
                        
                </div>
            </div>
        );
    }
}

export default Overview;