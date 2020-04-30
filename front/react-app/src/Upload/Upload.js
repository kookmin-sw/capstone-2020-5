import React, {Component} from "react";
import axios from 'axios';
import "./Upload.css"
import { Redirect } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

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
            console.log(response.data);
            window.localStorage.setItem('filenames', "");
            window.localStorage.setItem('filenames', JSON.stringify(response.data));
            window.location = "/contents";
        });
        // this.uploadJsonData = {};
        // Prepare json data -> extract name + content
        // this.prepareJsonData().then(() => {
        //     // Send JSON file
        //     axios.post("/upload-files", this.uploadJsonData, {
        //     }).then((response) => {
                // console.log(response.data);
                // window.localStorage.setItem('data', "");
                // window.localStorage.setItem('data', JSON.stringify(response.data));
                // window.location = "/contents";
        //     }).catch(error => {
        //         console.log(error)
        //         window.localStorage.setItem("errorMessage", "File is too large!");
        //         // window.location = "/error";
        //     });
        // });
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
    return(
        <div className="container upload-page">
            {
                !this.state.loading ?
                <div>
                    <div className="container vertical-element w-100">
                        <h1>분석 요청하기</h1>
                    </div>
                    <div ref={this.dropInput} id="drop-area" className={this.state.dragging ? "container bg-dark vertical-element vertical-center text-center" : "container bg-light vertical-element vertical-center text-center"}>
                        <form className="my-form w-100">
                            {
                                (this.files.length === 0) && <h1 id="list-items">드래그로 업로드</h1>
                            }
                            {
                                (this.files.length > 0) &&
                                <div id="scroll-view-upload">
                                    {this.createListOfFiles()}
                                </div>
                            }
                        </form>
                    </div>
                    <div className="container d-flex vertical-element">
                        <div className="row w-100 justify-content-end">
                            <input ref={this.fileInput} type="file" id="file" className="inputfile" multiple onChange={(e) => {this.files = e.target.files;this.forceUpdate();}}/>
                            <label type="button" htmlFor="file" className="col-2 text-light text-center button btn btn-primary">파일 업로드</label>
                            <p className="col-1"></p>
                            <button id="button-upload" type="button" className="col-2 text-light text-center button btn btn-success" onClick={this.handleSubmit}>제출</button>
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
