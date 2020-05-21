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
            mnemonicIndices : null,
            stringIndices : null,
            importIndices : null,
            exportIndices : null
        }
        this.createListOfInnerElements = this.createListOfInnerElements.bind(this);
        this.createListOfIndices = this.createListOfIndices.bind(this);
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
                var mnemonicIndicesTemp = [];
                Object.entries(this.mnemonics).forEach(([key, value]) => {
                    mnemonicIndicesTemp.push(key);
                });
                this.setState({mnemonicIndices : mnemonicIndicesTemp})

                this.string = this.state.file["string"];
                var stringIndicesTemp = [];
                Object.entries(this.string).forEach(([key, value]) => {
                    stringIndicesTemp.push(key);
                });
                this.setState({stringIndices : stringIndicesTemp})

                this.import = this.state.file["import"];
                var importIndicesTemp = [];
                Object.entries(this.import).forEach(([key, value]) => {
                    importIndicesTemp.push(key);
                });
                this.setState({importIndices : importIndicesTemp})

                this.export = this.state.file["export"];
                var exportIndicesTemp = [];
                Object.entries(this.export).forEach(([key, value]) => {
                    exportIndicesTemp.push(key);
                });
                this.setState({exportIndices : exportIndicesTemp})
            }
        });
    }

    createListOfInnerElements(index, innerElements) {
        let listOfFunc = [];
        for(let i = 0; i < innerElements[index].length; i++) {
            listOfFunc.push(
                <p key={i}>{i + 1} {innerElements[index][i]}</p>
            );
        }
        return listOfFunc;
    }

    createListOfIndices(indices, innerElements) {
        let listOfFunc = [];
        for (let i = 0; i < indices.length; i++) {
            listOfFunc.push(
                <div key={i}>{indices[i]}
                    <br/>
                    {
                        this.createListOfInnerElements(indices[i], innerElements)
                    }
                </div>
            );
        }
        return listOfFunc;
    }

    render() {
        return(
            <div>
            MNEMONIC: {this.state.mnemonicIndices == null ? <br/> : this.createListOfIndices(this.state.mnemonicIndices, this.mnemonics)}
            <br/>
            STRING: {this.state.stringIndices == null ? <br/> : this.createListOfIndices(this.state.stringIndices, this.string)}
            <br/>
            IMPORT: {this.state.importIndices == null ? <br/> : this.createListOfIndices(this.state.importIndices, this.import)}
            <br/>
            EXPORT: {this.state.exportIndices == null ? <br/> : this.createListOfIndices(this.state.exportIndices, this.export)}
            </div>
        );
    }
}


export default Inspect;