import React, {Component} from "react";
import "./Upload.css"
import { isCompositeComponent } from "react-dom/test-utils";
import axios, { post } from 'axios';

class Upload extends Component{
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmit = this.uploadFiles.bind(this);
        this.fileInput = React.createRef();
        this.dropInput = React.createRef();
        this.files = []
        this.uploadFiles = [];
    }

    state = {
        dragging: false
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

    async processFile(index) {
        try {
            let file = this.files[index];
            let contentBuffer = await this.readFileAsync(file);
            this.uploadFiles.push({
                name:  this.files[index].name,
                content: contentBuffer                
            });
        } catch(error) {
            console.log(error);
        }
    }

    uploadFiles() {
        const url = "http://localhost:5000/fileUpload";
        const data = new FormData();
        // data.append('file', this.files[0]);
        for (var i = 0; i < this.files.length; ++i) {
            data.append(this.files[i].name, this.files[i]);
        }

        axios
        .post(url, data)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    handleSubmit(event) {
        event.preventDefault();
        // this.uploadFiles = [];
        // console.log(this.files);
        // let i = 0;
        // do {
        //     console.log("Begin processing for file "+(i+1));
        //     this.processFile(i);
        //     console.log("File "+(i+1)+" processed successfuly!");
        //     i++;
        // } while(i < this.files.length);

        // console.log(this.uploadFiles);
        this.uploadFiles();
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
                        <div className="scroll-view">
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
    );
    }
}

export default Upload;