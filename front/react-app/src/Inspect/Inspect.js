import React, { Component } from 'react';
import "./Inspect.css";
import Mnemonic from "./Mnemonic/Mnemonic";
class Inspect extends Component {
    constructor(props)
    {
        super(props)
        this.state={isMnemonicsOpened:false}
        this.onMnemonicsClick=this.onMnemonicsClick.bind(this);
    }
    
        // componentDidMount(){
        //     this.setState({ id: this.props.match.params.id })
        // }
    onMnemonicsClick(){
        this.setState({isMnemonicsOpened:!this.state.isMnemonicsOpened});
        
    }
    render() {

        return (
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

            { this.state.isMnemonicsOpened ? <Mnemonic filename={this.props.match.params.id} />:<br/>}
               
               
            
            
        </div>

        
        );
    }
}


export default Inspect;