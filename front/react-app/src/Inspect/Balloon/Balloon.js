import React, {Component} from "react";
import "./Balloon.css"

class Balloon extends Component{
    constructor(props) {
        super(props);
        var ballonData = (this.props.file["samefile"]);
        var meta=(this.props.file["meta"]);
        this.md5=meta["md5"];
        this.sha256=meta["sha256"];
        this.size=meta["size"];
        this.malhits = ballonData["mal"]["hits"];
        this.malscore = ballonData["mal"]["score"];
        this.benhits = ballonData["ben"]["hits"];
        this.benscore = ballonData["ben"]["score"]; 
       
    }

    render() {
        return(
            <div className="d-flex justify-content-start">
                <div className="balloon mal">
                    <br/>
                    <h1>MAL</h1>
                    <br/>
                    <p className="mal_score">Score: {this.malscore}</p>
                    <p>Hits: {this.malhits}</p>
                </div>    
                <div className="balloon ben">
                    <br/>
                    <h1>BEN</h1>
                    <br/>
                    <p>Score: {this.benscore}</p>
                    <p>Hits: {this.malhits}</p>
                </div> 
            

             
             <div className="balloon mal">
                 <br/>
                 <h1>Meta</h1>
                 <br/>
                 <p className="mal_score">Md5: {this.md5}</p>

                 <p>Sha256: {this.sha256}</p>
                 <p>Size:{this.size}</p>
             </div>    
            </div>
         
        );
    }
}

export default Balloon;