import React, {Component} from "react";
import "./Contents.css";
import {Link} from "react-router-dom";

class ContentElement extends Component{
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
                            <input type="button" className="filelist_btn" value="결과 보기" />
                        </Link>
                    </td>
                    <td>@meta</td>
                </tr>
        );
    }
}

export default ContentElement;