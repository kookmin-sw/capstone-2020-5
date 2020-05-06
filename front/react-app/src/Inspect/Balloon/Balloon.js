import React, {Component} from "react";
import "./Balloon.css"
import Axios from 'axios';
class Balloon extends Component{
    constructor(props) {
        super(props);
        this.state={
          dataRecieved: false
        }
       
        Axios.get("http://127.0.0.1:5000/get_files",  {
            params:{
                filename:this.props.filename
            }
        }).then((response) => {
            var ballonData = (response.data["samefile"]);
            this.malhits = ballonData["mal"]["hits"];
            this.malscore = ballonData["mal"]["score"];
            this.benhits = ballonData["ben"]["hits"];
            this.benscore = ballonData["ben"]["score"]; 
            this.setState({dataRecieved: true}) ;
        });
           
    }

    render() {
        return(
            <div>
                {
                this.state.dataRecieved ?
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
                :
                <div></div>
                }
             </div>
        );
    }
}

export default Balloon;