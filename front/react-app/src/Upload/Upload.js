import React, {Component} from "react";
import Nav from "../Nav/Nav";
import axios from 'axios';
import "./Upload.css"
import "../index/btn.css"
import {HorizontalBar} from "react-chartjs-2";
import { Redirect } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
var CanvasJSReact = require('../canvasJS/canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Upload extends Component{


    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
        this.dropInput = React.createRef();
        this.files = []
        this.uploadJsonData = {};
    }
    state = {
        dragging: false,
        loading: false
    };

    handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            this.setState({dragging: true});
        }
    };

    handleDragIn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            this.setState({dragging: true});
        }
    };

    handleDragOut = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({dragging: false});
    };

    handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({dragging: false});
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            this.files = e.dataTransfer.files;
            e.dataTransfer.clearData();
            this.forceUpdate();
        }
    };

    componentDidMount() {
        let div = this.dropInput.current;
        div.addEventListener('dragenter', this.handleDragIn);
        div.addEventListener('dragleave', this.handleDragOut);
        div.addEventListener('dragover', this.handleDrag);
        div.addEventListener('drop', this.handleDrop);
    }

    componentWillUnmount() {
        let div = this.dropInput.current;
        div.removeEventListener('dragenter', this.handleDragIn);
        div.removeEventListener('dragleave', this.handleDragOut);
        div.removeEventListener('dragover', this.handleDrag);
        div.removeEventListener('drop', this.handleDrop);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({loading: true});
        var formData = new FormData();
        for(const key of Object.keys(this.files)) {
            formData.append("fileCollection", this.files[key]);
        }
        axios.post("http://127.0.0.1:5000/upload-files", formData, {
        }).then((response) => {
            if(response.data == "error") {
                window.localStorage.setItem('error_message', "Server uploading error");
                window.location = "/error";
            } else {
                window.localStorage.setItem('filenames', "");
                window.localStorage.setItem('filenames', JSON.stringify(response.data));
                window.location = "/contents";
            }
        });
    }

    async prepareJsonData() {
        for(var file of this.files) {
            console.log(file.name);
            await this.processFile(file)
        }
    }

    async processFile(file) {
        try {
            let contentBuffer = await this.readFileAsync(file);
            this.uploadJsonData[file.name] = contentBuffer;
        } catch(error) {
            console.log(error);
        }
    }

    readFileAsync(file) {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();
            fileReader.onloadend = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = reject;
            fileReader.readAsText(file);
        })
    }

    createListOfFiles() {
        let listOfFiles = []
        for(let i = 0; i < this.files.length; ++i) {
            listOfFiles.push(
                <p key={i}>{this.files[i].name}</p>
            );
        }
        return listOfFiles
    }
    render() {
        const data = {
            labels: ['ben', 'mal',''],
            datasets: [
                {

                    backgroundColor: [
                        "rgb(0,238,159)",
                        "rgb(255,25,33)"
                    ],
                    borderColor: [
                        "rgb(0,168,113)",
                        "rgb(175,0,7)"
                    ],
                    borderWidth: 1,
                    hoverBackgroundColor: [
                        "rgb(86,243,192)",
                        "rgb(253,112,117)"
                    ],
                    hoverBorderColor: [
                        "rgb(0,168,113)",
                        "rgb(175,0,7)"
                    ],
                    data: [22000, 20000,0]
                }
            ]
        };

        return(

        <div className="upload_container">
            <Nav />
            {
                !this.state.loading ?
                <div className="upload_container">
                    <div>
                        <div className="amountdatachart">Amount of data</div>
                        <div className="horizontalbar-css">
                            <HorizontalBar data={data} width="1000px"/>
                        </div>
                    </div>
                    <div className="upload_title">
                        분석 요청하기
                    </div>
                    <hr className="underbar"></hr>

                    <div className="upload_body">
                        <div className="upload_img">
                            <img src="/img/upload_file.png"></img>
                        </div>
                        <div ref={this.dropInput} id="drop-area" className={this.state.dragging ? "drag_drop bg_dark" : "drag_drop bg_light"}>
                            <form className="my-form w-100">
                                {
                                    (this.files.length === 0) && <div className="drag_drop_body">Drag and Drop</div>
                                }
                                {
                                    (this.files.length > 0) &&
                                    <div className="after_upload" id="scroll-view-upload">
                                        {this.createListOfFiles()}
                                    </div>
                                }
                            </form>
                        </div>
                    </div>
                    <div className="container d-flex vertical-element">
                        <div className="row w-100 justify-content-end">
                            <input ref={this.fileInput} type="file" id="file" className="inputfile" multiple onChange={(e) => {this.files = e.target.files;this.forceUpdate();}}/>
                            <label type="button" htmlFor="file" className="snip1535">파일 업로드</label>
                            <button id="button-upload" type="button" className="snip1535" onClick={this.handleSubmit}>제출</button>
                        </div>
                    </div>
                </div>
                :
                 <Spinner/>
            }
        </div>
    );
    }
}

export default Upload;
