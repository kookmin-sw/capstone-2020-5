import React, {Component} from "react";
import "./Contents.css";

class ContentElement extends Component{
    render() {
        return(
            <div className="row content-element">
                <h3 className="col-3">{this.props.filename}</h3>
                <h3 className="col-7"></h3>
                <h3 type="button"className="col-1 content-element-button btn btn-success">결과 보기</h3>
            </div>
        );
    }
}

export default ContentElement;