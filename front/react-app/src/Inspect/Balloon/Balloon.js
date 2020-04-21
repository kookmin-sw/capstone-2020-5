import React, {Component} from "react";
import "./Balloon.css"

class Balloon extends Component{
    constructor(props) {
        super(props);
        var filename = "file1.txt"
        var jsonData = JSON.parse(window.localStorage.getItem('data'));
        this.malhits
        jsonData[filename]["samefile"]["mal"]
    }

    render() {
        return(
            <div className="d-flex justify-content-start">
                <div className="balloon mal">
                    <br/>
                    <h1>MAL</h1>
                    <br/>
                    <p>Score: 10%</p>
                    <p>Hits: 34</p>
                </div>    

                <div className="balloon ben">
                    <br/>
                    <h1>BEN</h1>
                    <br/>
                    <p>Score: 90%</p>
                    <p>Hits: 34213</p>
                </div> 
            </div>   
        );
    }
}

export default Balloon;