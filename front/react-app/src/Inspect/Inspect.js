import React, { Component } from 'react';
import Nav from "../Nav/Nav";
import "./Inspect.css";
import Mnemonic from "./Mnemonic/Mnemonic";
import String from "./String/String";
import Import from "./Import/Import";
import Export from "./Export/Export";
import Balloon from "./Balloon/Balloon";
import Axios from 'axios';
import Spinner from '../Spinner/Spinner';


class Inspect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mnemonicIndices : null
        }
        this.createListOfMnemonics = this.createListOfMnemonics.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
    }

    downloadFile() {
        let filename = this.props.match.params.id;
        let contentType = "application/json;charset=utf-8;";
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            var blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(this.state.file)))], { type: contentType });
            navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            var a = document.createElement('a');
            a.download = filename;
            a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(this.state.file));
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }

    componentDidMount() {
        Axios.get("http://127.0.0.1:5000/get_files", {
            params: {
                //filename:"fd63829b39eb6a034b609e4e25ee8d22.pickle"
                filename: this.props.match.params.id
            }
        }).then((response) => {
            if (response.data == "error") {
                window.localStorage.setItem('error_message', "File not found error");
                window.location = "/error";
            } else {
                this.setState({ file: response.data });
                this.mnemonics = this.state.file["mal_functions"];
                this.state.mnemonicIndices = [];
                Object.entries(this.mnemonics).forEach(([key, value]) => {
                    this.state.mnemonicIndices.push(key);
                });

                this.string = this.state.file["string"];
                this.stringIndices = [];
                Object.entries(this.string).forEach(([key, value]) => {
                    this.stringIndices.push(key);
                });

                this.import = this.state.file["import"];
                this.importIndices = [];
                Object.entries(this.import).forEach(([key, value]) => {
                    this.importIndices.push(key);
                });

                this.export = this.state.file["export"];
                this.exportIndices = [];
                Object.entries(this.export).forEach(([key, value]) => {
                    this.exportIndices.push(key);
                });
            }
        });
    }

    createListOfMnemonics() {
        let listOfFunc = []
        for (let i = 0; i < this.state.mnemonicIndices.length; i++) {
            console.log(this.state.mnemonicIndices[i]);
            listOfFunc.push(
                <p key={i}>{i+1} {this.state.mnemonicIndices[i]}</p>
            );
        }
        return listOfFunc
    }

    render() {
        return(
            <div>
            MNEMONIC: {this.state.mnemonicIndices == null ? <br/> : this.createListOfMnemonics()}
            <br/>
            STRING: {this.string}
            <br/>
            IMPORT: {this.import}
            <br/>
            EXPORT: {this.export}
            </div>
        );
    }
}


export default Inspect;