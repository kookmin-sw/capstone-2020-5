import React, {Component} from "react";
import Nav from "../Nav/Nav";
import axios from 'axios';
import "./Upload.css"
import "../index/btn.css"
import CountUp from "react-countup";
import {HorizontalBar} from "react-chartjs-2";
import { Redirect } from "react-router-dom";
import slider from "react-slider"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import Button from '@material-ui/core/Button';
import Spinner from "../Spinner/Spinner";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));
class Upload extends Component{



    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
        this.dropInput = React.createRef();
        this.files = []
        this.uploadJsonData = {};
        this.getDbData=this.getDbData.bind(this);
       
    }
    state = {
        dragging: false,
        loading: false,
        db_loaded:false
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
        this.getDbData()
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
    getDbData(){
        axios.get("http://127.0.0.1:5000/get_db_data", {
          
        }).then((response) => {
            if (response.data == "error") {
                window.localStorage.setItem('error_message', "db_data not found error");
                window.location = "/error";
            } else {
               
                this.mal_data = parseFloat(response.data["mal_data"])
                this.ben_data =  parseFloat(response.data["ben_data"])
                this.setState({db_loaded:true})
            }
        });
    
    }
    render() {
       

        return(
            

        <div className="upload_container">
            <Nav />
            {
                
                !this.state.loading ? 
                
                <div className="upload_container">
                    {
                        this.state.db_loaded ?
                        <table className="amount-data">
                            <thead>
                                <tr>
                                    <th>Benign</th>
                                    <th>Malware</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="ben-green">
                                        <CountUp end={this.ben_data} start={0} />
                                    </td>
                                    <td className="mal-red">
                                        <CountUp end={this.mal_data} start={0} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        :
                        <p></p>
                    }
                    
                    <div>
                    </div>

                    <div className="upload_title">
                        File upload
                    </div>
                    <div>
                        Providing information such as anomaly detection of function units <br />and similarity checking by uploading suspicious files.
                    </div>

                    <div className="upload_body">
                        <div ref={this.dropInput} id="drop-area" className={this.state.dragging ? "drag_drop bg_dark" : "drag_drop bg_light"}>
                            <form className="my-form w-100">
                                {
                                    (this.files.length === 0) && <div className="drag_drop_body">
                                        <span className="material-icons">file_copy</span>
                                        Drag and Drop</div>
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
                        <div className="upload-button-body">
                            <div className="label-button">
                                <input ref={this.fileInput} type="file" id="file" className="inputfile" multiple
                                       onChange={(e) => {
                                           this.files = e.target.files;
                                           this.forceUpdate();
                                       }}/>
                                <label type="button" htmlFor="file" className="button-border-puple">
                                    <div className="pupleline-contents" style={{paddingTop:"15px"}}>
                                        <div style={{fontWeight:"bold"}}>Upload</div>
                                    </div>
                                </label>
                            </div>

                            <button id="button-upload" type="button" className="button-border-puple" onClick={this.handleSubmit}>
                                <div className="pupleline-contents" style={{fontWeight:"bold"}}>
                                    Submit
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                :
                    <div style={{marginTop:"350px"}}>
                        <Spinner/>
                    </div>

            }
        </div>
    );

    }

}

export default Upload;
