import React from "react";
import "./Contents.css";

function ContentElement() {
    return(
        <div className="row content-element">
            <h3 className="col-3">file_name.txt</h3>
            <h3 className="col-7"></h3>
            <h3 type="button"className="col-1 content-element-button btn btn-success">결과 보기</h3>
        </div>
    );
}

export default ContentElement;