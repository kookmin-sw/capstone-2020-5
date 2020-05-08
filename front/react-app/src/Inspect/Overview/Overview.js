import React, { Component } from 'react';
import "./Overview.css"
class Overview extends Component {
    render() {
        return (
            <div className="container upload-page">

                <div className="container vertical-element w-100">
                    <h1>전체보기</h1>
                </div>
                <div ref={this.dropInput} id="drop-area" className="container bg-light vertical-element vertical-center text-center">
                    <form className="my-form w-100">

                    </form>
                </div>
                <div className="container d-flex vertical-element">
                    <div className="row w-100 justify-content-end">
                        <input ref={this.fileInput} type="file" id="file" className="inputfile" multiple onChange={(e) => { this.files = e.target.files; this.forceUpdate(); }} />
                        <label type="button" htmlFor="file" className="col-2 text-light text-center button btn btn-primary">목록으로</label>
                        <p className="col-1"></p>
                        <button id="button-upload" type="button" className="col-2 text-light text-center button btn btn-success" onClick={this.handleSubmit}>제출</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Overview;