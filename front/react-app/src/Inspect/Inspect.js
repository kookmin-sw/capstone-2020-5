import React, { Component } from 'react';
import Nav from "../Nav/Nav";
import "./Inspect.css";
import "./sample.css";
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
            mnemonicKeys : null,
            mnemonicValues: null,
            stringKeys : null,
            stringValues : null,
            importKeys : null,
            importValues : null,
            exportKeys : null,
            exportValues : null,
            meta : null,
            samefile : null
        }
        this.showMeta = this.showMeta.bind(this);
        this.showSameFile = this.showSameFile.bind(this);
        this.createList = this.createList.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
        this.initLists = this.initLists.bind(this);
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

                this.setState({meta: this.state.file["meta"]});
                this.setState({samefile: this.state.file["samefile"]});

                this.initLists("mal_functions");
                this.initLists("string");
                this.initLists("import");
                this.initLists("export");
            }
        });
    }

    initLists(name) {
        var tempKeys = [];
        var tempValues = [];
        Object.entries(this.state.file[name]).forEach(([key, value]) => {
            tempKeys.push(key);
        }); 
        for(let i = 0; i < tempKeys.length; i++) {
            var tempValuesValuse = []
            Object.entries(this.state.file[name][tempKeys[i]]).forEach(([key, value]) => {
                tempValuesValuse.push(value);
            }); 
            tempValues.push(tempValuesValuse);
        }
        switch(name) {
            case "mal_functions":
                this.setState({mnemonicKeys : tempKeys});
                this.setState({mnemonicValues : tempValues});                        
                break;
            case "string":
                this.setState({stringValues : tempKeys});
                this.setState({stringValues : tempValues});                        
                break;
            case "import":
                this.setState({importKeys : tempKeys});
                this.setState({importValues : tempValues});                        
                break;
            case "export":
                this.setState({exportKeys : tempKeys});
                this.setState({exportValues : tempValues});                        
                break;
        }


    }

    showSameFile() {
        return(
            <div>
                <p>MAL HITS {this.state.samefile["mal"]["hits"]}</p>
                <p>MAL SCORE {this.state.samefile["mal"]["score"]}</p>
                <p>BEN HITS {this.state.samefile["ben"]["hits"]}</p>
                <p>BEN SCORE {this.state.samefile["ben"]["score"]}</p>
            </div>
        );
    }

    showMeta() {
        return(
            <div>
                <p>MD5 {this.state.meta["md5"]}</p>
                <p>SHA256 {this.state.meta["sha256"]}</p>
            </div>
        );
    }

    createList(array, index) {
        let listOfFunc = [];
        if(index == null) {
            for (let i = 0; i < array.length; i++) {
                listOfFunc.push(
                    <p key={i}>{array[i]} </p>
                );
            }
            return listOfFunc;
        } else {
            for (let i = 0; i < array[index].length; i++) {
                listOfFunc.push(
                    <p key={i}>{array[index][i]} </p>
                );
            }
            return listOfFunc;
        }
    }

    // for(let i = 0; i < this.state.mnemonicKeys.length; i++) {
    //     for(let j = 0; j < this.state.mnemonicValues[i].length; ++j) {
    //         this.state.mnemonicValues[i][j];
    //     }
    // }

    render() {
        return(
            <div>
                {this.state.mnemonicKeys == null ? <br/> : this.createList(this.state.mnemonicKeys, null)}
                {this.state.mnemonicValues == null ? <br/> : this.createList(this.state.mnemonicValues, 0)}
                {this.state.stringKeys == null ? <br/> : this.createList(this.state.stringKeys, null)}
                {this.state.stringValues == null ? <br/> : this.createList(this.state.stringValues, 0)}
                {this.state.importKeys == null ? <br/> : this.createList(this.state.importKeys, null)}
                {this.state.importValues == null ? <br/> : this.createList(this.state.importValues, 0)}
                {this.state.exportKeys == null ? <br/> : this.createList(this.state.exportKeys, null)}
                {this.state.exportValues == null ? <br/> : this.createList(this.state.exportValues, 0)}
                <h1>META:</h1> {this.state.meta == null ? <br/> : this.showMeta()}
                <br/>
                <h1>SAMEFILE:</h1> {this.state.samefile == null ? <br/> : this.showSameFile()}
            </div>
        );
    }
}


export default Inspect;