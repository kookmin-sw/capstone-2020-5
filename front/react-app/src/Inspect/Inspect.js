import React, { Component } from 'react';
import Nav from "../Nav/Nav";
import "./Inspect.css";
import Mnemonic from "./Mnemonic/Mnemonic";
import Balloon from "./Balloon/Balloon";
import Axios from 'axios';
import Spinner from '../Spinner/Spinner';


class Inspect extends Component {
    constructor(props)
    {
        super(props)
        this.state={
            isMnemonicsOpened:false, 
            file:null
        }

        this.onMnemonicsClick=this.onMnemonicsClick.bind(this);
    }

    componentDidMount() {
        Axios.get("http://127.0.0.1:5000/get_files",  {
            params:{
                filename:"fd63829b39eb6a034b609e4e25ee8d22.pickle"
                // filename:this.props.match.params.id
            }
        }).then((response) => {
            if(response.data == "error") {
                window.localStorage.setItem('error_message', "File not found error");
                window.location = "/error";
            } else {
                this.setState({file:response.data})
            }
        });
    }
    
    onMnemonicsClick(){
        this.setState({isMnemonicsOpened:!this.state.isMnemonicsOpened});
        
    }
    render() {

        return (
            <div>
                <Nav />
                {
                    this.state.file == null ? 
                    <div><Spinner/></div> 
                    :
                    <div className="container center">
                        <nav className="menu">
                            <h1 className="menu__logo">Epic Co.</h1>
                
                            <div className="menu__right">
                                <ul className="menu__list">
                                    <li className="menu__list-item"><a className="menu__link menu__link--active" href="#" onClick={this.onMnemonicsClick}>Mnemonics</a></li>
                                    <li className="menu__list-item"><a className="menu__link" href="#">Strings</a></li>
                                    <li className="menu__list-item"><a className="menu__link" href="#">Import</a></li>
                                    <li className="menu__list-item"><a className="menu__link" href="#">Export</a></li>
                                </ul>
                
                                <button className="menu__search-button"></button>
                
                                <form className="menu__search-form hide" method="POST">
                                    <input className="menu__search-input" placeholder="Type and hit enter"/>
                                </form>
                            </div>
                        </nav>
                        <Balloon file={this.state.file}/>

                        { 
                            this.state.isMnemonicsOpened ? 
                            <Mnemonic file={this.state.file} onClose={(e) => this.setState({isMnemonicsOpened: false})}/>
                            :
                            <div></div>
                        }     
                    </div>
                }
            </div>
        );
    }
}


export default Inspect;