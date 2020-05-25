import React, { Component } from 'react';
import "./Overview.css"
import "../Inspect.css";
import "../sample.css";
class Overview extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="accordion">
                <div className="card full_accordion">
                    <div className="accordion-header" id="headingOne">
                        <div className="mb-0 each_function">
                            <div className="function_hash col-10">
                                55cb06fc7ddebaf8c87df15c3681a1fd
                            </div>
                            <div className="result-button-contain col-2">
                                <div className="filelist_btn purple" data-toggle="collapse"
                                     data-target="#collapseOne" aria-expanded="true"
                                     aria-controls="collapseOne">
                                    유사도 검사
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="collapseOne" className="collapse" aria-labelledby="headingOne"
                         data-parent="#accordion">
                        <div className="card-body">
                            <div className="progress-contain">
                                <div className="progress">
                                <div style={{width: this.percentage+"%",backgroundColor:"#20c997"}} role="progressbar"
                                         aria-valuenow="30" aria-valuemin="0"
                                         aria-valuemax="100"></div>
                                    <div style={{width: this.percentage+"%",backgroundColor:"#ff2b99"}} role="progressbar"
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
                                        <th scope="col">Edit</th>
                                        <th scope="col">Details</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">55cb06fc7ddebaf8c87df15c3681a1fd</th>
                                        <td>0.00</td>
                                        <td>0.00</td>
                                        <td>
                                            <button type="button" className="zoomin-btn"
                                                    data-toggle="modal" data-target="#exampleModalCenter">
                                                <span className="material-icons">zoom_in</span>
                                            </button>
                                            <div className="modal fade modal-center" id="exampleModalCenter"
                                                 tabIndex="-1" role="dialog"
                                                 aria-labelledby="exampleModalCenterTitle"
                                                 aria-hidden="true">
                                                <div className="modal-content-size modal-dialog modal-dialog-centered"
                                                     role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header modal-head-title">
                                                            <div className="modal-title taget_title"
                                                                 id="exampleModalCenterTitle">
                                                                (유사한 파일 md5)
                                                            </div>
                                                            <button type="button" className="close close-btn-white"
                                                                    data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <div>
                                                                <table className="gradient-table">
                                                                    <thead>
                                                                    <tr>
                                                                        <th className="compare-taget">(사용자가 올린파일)</th>
                                                                        <th className="compare-taget">(유사한 파일)</th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    <tr>
                                                                        <td className="gradient-img">
                                                                            <img src="/img/gradient-img.jpeg" />
                                                                        </td>
                                                                        <td className="gradient-img">
                                                                            <img src="/img/gradient-img.jpeg" />
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
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
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Overview;