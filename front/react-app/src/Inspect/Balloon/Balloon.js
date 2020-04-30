import React, {Component} from "react";
import "./Balloon.css"
import Axios from 'axios';
class Balloon extends Component{
    
    state = {
            
        ready : false
    
    };
    
    constructor(props) {
       
        super(props);
        
       
        Axios.get("http://127.0.0.1:5000/get_files",  {
            params:{
                filename:this.props.filename
            }
        }).then((response) => {
           
            this.file=response.data
            var ballonData = (this.file["samefile"]);
            this.malhits = ballonData["mal"]["hits"];
            this.malscore = ballonData["mal"]["score"];
            this.belhits = ballonData["ben"]["hits"];
            this.benscore = ballonData["ben"]["score"];
            console.log(this.file);  
            console.log(this.file["samefile"])   
            console.log(this.benscore); 
            this.state.ready = true;
        });
        
    }

    render() {
       
         return(
             <div>
             {
            this.state.ready?
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
            </div>   :
            <div></div>
             }
             </div>
        );
    }
}

export default Balloon;