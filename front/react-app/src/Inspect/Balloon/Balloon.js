import React, {Component} from "react";
import "./Balloon.css"
import Axios from 'axios';
class Balloon extends Component{
    
   
    
    constructor(props) {
       
        super(props);
        this.state={
          file:[]
        }
       
        Axios.get("http://127.0.0.1:5000/get_files",  {
            params:{
                filename:this.props.filename
            }
        }).then((response) => {
            
            const file=response.data
            
            //this.file=response.data
            var ballonData = (file["samefile"]);
            this.malhits = ballonData["mal"]["hits"];
            this.malscore = ballonData["mal"]["score"];
            this.benhits = ballonData["ben"]["hits"];
            this.benscore = ballonData["ben"]["score"];
            console.log(file);  
            console.log(file["samefile"])  
            this.setState({file}) ;
            
      
        });
           
    }

    render() {
       
         return(
             <div>
             {
        
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
             }
             
             </div>
        );
    }
}

export default Balloon;