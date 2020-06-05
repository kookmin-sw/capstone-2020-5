import React, {Component} from "react";
import "./Contents.css";
import {Link} from "react-router-dom";
import Axios from 'axios';

class ContentElement extends Component{
    constructor(props) {
        super(props);
        this.reScan = this.reScan.bind(this);
    }

    reScan() {
        console.log(this.props.filename)
        console.log(JSON.parse(window.localStorage.getItem('filenames')))
        Axios.get("http://127.0.0.1:5000/re_scan", {
            params: {
                re_scan_file: this.props.filename,
                filenames: window.localStorage.getItem('filenames')
            }
        }).then((response) => {
            if (typeof response.data == "string"&& response.data.split(",")[0]  == "error") {
                window.localStorage.setItem('error_message', response.data.split(",")[1]);
                window.location = "/error";
            } else {
                window.localStorage.setItem('filenames', "");
                window.localStorage.setItem('filenames', JSON.stringify(response.data[0]));
                window.localStorage.setItem('dates', "");
                window.localStorage.setItem('dates', JSON.stringify(response.data[1]));
                window.location = "/contents";
            }
        });
    }

    render() {
        return(
                <tr>
                    <td className="file_icon">
                        <span className="material-icons">cloud_done</span>
                    </td>
                    <td className="left">{this.props.filename}
                    </td>
                    <td>
                        <Link to={"/contents/" + this.props.filename}>
                            <input type="button" className="filelist_btn" value="Show Results" />
                        </Link>
                    </td>
                    <td>
                        <input type="button" className="filelist_btn2" value="Re-analysis" onClick={()=>{this.reScan()}}/>
                    </td>
                    <td>{this.props.date}</td>
                </tr>
        );
    }
}

export default ContentElement;