import React, { Component } from 'react';
import "./Overview.css"
import "../Inspect.css";
import "../sample.css";
class Overview extends Component {

    render() {
        return (
            <div className="card full_accordion">
                <div className="accordion-header" id={"heading"+1}>
                    <div className="mb-0 each_function">
                        <div className="function_hash col-10">
                            55cb06fc7ddebaf8c87df15c3681a1fd
                        </div>
                        <div className="result-button-contain col-2">
                            <div className="result-button" data-toggle="collapse"
                                    data-target={"#" + "md5"} aria-expanded="true"
                                    aria-controls={"md5"}>
                                유사도 검사
                            </div>
                        </div>
                    </div>
                </div>
                <div id={"md5"} className="collapse" aria-labelledby={"heading"+1}
                     data-parent="#accordion">
                    <div className="card-body">
                        <div>
                            progress bar
                        </div>
                        <div>
                            유사한 md5   cosine   edit   보기
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Overview;