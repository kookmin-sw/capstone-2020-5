import React, {Component} from "react";
import "./Balloon.css"

class Balloon extends Component{
    constructor(props) {
        super(props);
        var ballonData = JSON.parse(window.localStorage.getItem('data'))[props.filename]["samefile"]''
        this.malhits = ballonData["mal"]["hits"];
        this.malscore = ballonData["mal"]["score"];
        this.belhits = ballonData["ben"]["hits"];
        this.benscore = ballonData["ben"]["score"];
    }

    render() {
        return(
            <div className="d-flex justify-content-start">
                <div className="balloon mal">
                    <br/>
                    <h1>MAL</h1>
                    <br/>
                    <p>Score: {this.malscore}</p>
                    <p>Hits: {this.malhits}</p>
                </div>    

                <div className="balloon ben">
                    <br/>
                    <h1>BEN</h1>
                    <br/>
                    <p>Score: {this.benscore}</p>
                    <p>Hits: {this.malhits}</p>
                </div> 
            </div>   
        );
    }
}

export default Balloon;