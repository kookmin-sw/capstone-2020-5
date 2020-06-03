import React, { Component } from 'react';
import Axios from 'axios';
import "../Balloon/Balloon";
import "./Overview.css"
import "../Inspect.css";
import "../sample.css";
import Balloon from '../Balloon/Balloon';
import Spinner from "../../Spinner/Spinner";
import Slider from "@material-ui/core/Slider";
class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataloaded : false
        }
        this.filename = this.props.filename
        this.hash = this.props.hash
        this.sim = this.props.sim

        this.loadFunctionData = this.loadFunctionData.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
        this.createListOfMnemonics = this.createListOfMnemonics.bind(this);
    }

    downloadFile(data) {
        let fileData = {}
        let saving_mnemonics = this.uploaded_mnemonics
        for(let i = 0; i < saving_mnemonics.length; ++i) {
            saving_mnemonics[i] = saving_mnemonics[i].replace("^#!!#", " ");
        }
        fileData[this.hash] = this.uploaded_mnemonics
        let filename=this.hash+".json"
        let contentType = "application/json;charset=utf-8;";
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            var blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(fileData, null, 2)))], { type: contentType });
            navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            var a = document.createElement('a');
            a.download = filename;
            a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(fileData, null, 2));
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
 
         fileData = {}
         saving_mnemonics = data["mnemonics"]
        for(let i = 0; i < saving_mnemonics.length; ++i) {
            saving_mnemonics[i] = saving_mnemonics[i].replace("^#!!#", " ");
        }
         fileData[data["Function"]] = saving_mnemonics
         filename=data["Function"]+".json"
    
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            var blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(fileData, null, 2)))], { type: contentType });
            navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            var a = document.createElement('a');
            a.download = filename;
            a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(fileData, null, 2));
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }

    loadFunctionData() {
        if(!this.state.dataloaded) {
            Axios.get("http://127.0.0.1:5000/get_function_data", {
                params: {
                    filename:this.filename,
                    hash: this.hash,
                    sim: this.sim,
                    threshold: this.state.slider1
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

    createListOfMnemonics(array) {
        let list = [];
        for(let i = 0; i < array.length; ++i) {
            // if(i == 11) break;
            list.push(
                <tr>
                    <td>
                        {array[i].split("^#!!#")[0]}
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        {array[i].split("^#!!#")[1]}
                    </td>
                </tr>
            );
        }
        return list;
    }

    createListOfSameFunctions() {
        let list = [];
        Object.entries(this.function_data).forEach(([key, value]) => {
            list.push(
                <tr>
                    <th scope="row">{key}<br/>({value["Function"]})</th>
    
                    <td>{value["cosine"]}</td>
                    <td>{value["jaccard"]}</td>
                    <td>
                        <button type="button" className="zoomin-btn"
                                data-toggle="modal" data-target={"#h" + key + this.sim}>
                            <span className="material-icons">zoom_in</span>
                        </button>
                        <div className="modal fade modal-center" id={"h"+key + this.sim}
                             tabIndex="-1" role="dialog"
                             aria-labelledby={"h"+key + this.sim+"Title"}
                             aria-hidden="true">
                            <div className="modal-content-size modal-dialog modal-dialog-centered"
                                 role="document">
                                <div className="modal-content">
                                    <div className="modal-header modal-head-title">
                                        <div className="modal-title taget_title"
                                             id={"h"+key + this.sim+"Title"}>
                                           
                                        </div>
                                        <button type="button" className="close close-btn-white"
                                                data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body" style={{padding:"0"}}>
                                        <table className="gradient-table" style={{width:"100%"}}>
                                            <tr style={{padding:"0"}}>
                                                <th className="balloon-table compare-taget">{this.hash}</th>
                                                <th className="balloon-table" style={{width:"100%", padding:"0"}} className="gradient-img" rowSpan="2">
                                                    <Balloon mnemonics={this.uploaded_mnemonics}/>
                                                    <Balloon mnemonics={this.function_data[key]["mnemonics"]}/>
                                                </th>
                                            </tr>
                                            <tr>
                                                <td className="balloon-table compare-taget" style={{padding:"0"}}>
                                                    {this.function_data[key]["Function"]}
                                                </td>
                                                
                                            </tr>
                                        </table>
                                        <table className="function-donut-table">
                                            <thead>
                                            <tr>
                                                <th>업로드한 파일의 함수</th>
                                                <th>유사한 함수</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>
                                                    <div className="function-mnemonic-scroll">
                                                        {this.createListOfMnemonics(this.uploaded_mnemonics)}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="function-mnemonic-scroll">
                                                        {this.createListOfMnemonics(this.function_data[key]["mnemonics"])}
                                                    </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="modal-footer">
                                    <button type="button" onClick={() => this.downloadFile(this.function_data[key])}
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
    state = {
        slider1: 100
    };

    handleChange = name => (e, value) => {
        this.setState({
            [name]: value // --> Important bit here: This is how you set the value of sliders
        });
    };
    render() {
        const { classes } = this.props;
        const { slider1} = this.state;
        return (
            <div id="accordion">
                <div className="card full_accordion">
                    <div className="accordion-header" id="headingOne">
                        <div className="mb-0 each_function">
                            <div className="function_hash col-9">

                                {this.hash}
                            </div>
                            <div className="setting-button col-1">
                                <div className="dropdown">
                                    <div className="slider-button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="material-icons">settings</span>
                                    </div>
                                    <div className="dropdown-menu slider-center" aria-labelledby="dropdownMenuButton">
                                        <div className="slider-container">
                                            <Slider
                                            valueLabelDisplay="auto"
                                               defaultValue={90}
                                                aria-labelledby="label"
                                                onChange={this.handleChange("slider1")}
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="result-button-contain col-2">
                                <div className="filelist_btn purple" data-toggle="collapse"
                                     data-target={"#h"+this.hash+this.sim+"One"} aria-expanded="true"
                                     aria-controls={"h"+this.hash+this.sim+"One"} onClick={this.loadFunctionData} style={{verticalAlign:"middle"}}>
                                    유사도 검사

                                </div>
                            </div>
                        </div>
                    </div>
                        <div id={"h"+this.hash+this.sim+"One"} className="collapse" aria-labelledby="headingOne"
                        data-parent="#accordion">
                         {
                        this.state.dataloaded ?     
                            <div className="card-body">
                                <div className="progress-contain">
                                    <div className="progress" style={{height:"30px"}}>
                                    <div style={{width: (parseFloat(this.mal_ben["ben"]) * 100)+"%",backgroundColor:"#20c997", color:"#ffffff", fontSize:"20px", fontWeight:"bold"}} role="progressbar"
                                            aria-valuenow="30" aria-valuemin="0"
                                            aria-valuemax="100">{(parseFloat(this.mal_ben["ben"]) * 100)+"%"}</div>
                                        <div style={{width: (parseFloat(this.mal_ben["mal"]) * 100)+"%",backgroundColor:"#ff2b99", color:"#ffffff", fontSize:"20px", fontWeight:"bold"}} role="progressbar"
                                            aria-valuenow="20" aria-valuemin="0"
                                            aria-valuemax="100">{(parseFloat(this.mal_ben["mal"]) * 100)+"%"}</div>
                                    </div>
                                </div>
                                <div className="similary-result-table">
                                    <table className="table table-striped similary-table">
                                        <thead>
                                        <tr>
                                            <th scope="col">File MD5<br/>(Fuction ID)</th>
                                            
                                            <th className="similary-distance" scope="col">Cosine</th>
                                            <th className="similary-distance" scope="col">Jaccard-distance</th>
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