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
            mnemonicIndices : null,
            stringIndices : null,
            importIndices : null,
            exportIndices : null,
            meta: null,
            samefile: null
        }
        this.showMeta = this.showMeta.bind(this);
        this.showSameFile = this.showSameFile.bind(this);
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

                this.setState({meta: this.state.file["meta"]});
                this.setState({samefile: this.state.file["samefile"]});

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
                <div key={i}><h2>{indices[i]}</h2>
                    <br/>
                    {
                        this.createListOfInnerElements(indices[i], innerElements)
                    }
                </div>
            );
        }
        return listOfFunc;
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

    render() {
        return(
            <div className="sample_container">
                <Nav />
                <div className="sample_body">
                    <div className="file_info">
                        <div className="donut_chart">
                            <div className="white_donut">
                                <div className="chart_contents"> 80% </div>
                            </div>
                        </div>
                        <div className="file_contents">
                            <div className="file_name"> file name</div>
                            <div className="file_meta">
                                {this.state.meta == null ? <br/> : this.showMeta()}
                                <li className="file_md5"> md5 : 	55cb06fc7ddebaf8c87df15c3681a1fd</li>
                                <li className="file_sha256"> sha256 : 	b384422960a820e3091e011d1a74d6cb5f5fb9f98a67e88233c7da1e3f91e778 </li>
                                <li className="file_size"> file size : 440.92 KB</li>
                            </div>
                        </div>
                    </div>
                    <hr className="under_line"></hr>
                    <div className="mnemonic">
                        <div className="contents_title">Mnimonic</div>
                        <ul className="nav nav-tabs data_tabs">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="#30">30</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#30">30</a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane tab_contents fade show active" id="qwe">
                                <p>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                </p>
                            </div>
                            <div className="tab-pane tab_contents fade" id="asd">
                                <p>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="string">
                        <div className="contents_title">String</div>
                        <ul className="nav nav-tabs data_tabs">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="#30">30</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#30">30</a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane tab_contents fade show active" id="qwe">
                                <p>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                </p>
                            </div>
                            <div className="tab-pane tab_contents fade" id="asd">
                                <p>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="import">
                        <div className="contents_title">Import</div>
                        <ul className="nav nav-tabs data_tabs">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="#30">30</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#30">30</a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane tab_contents fade show active" id="qwe">
                                <p>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                </p>
                            </div>
                            <div className="tab-pane tab_contents fade" id="asd">
                                <p>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="Export">
                        <div className="contents_title">Export</div>
                        <ul className="nav nav-tabs data_tabs">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="#30">30</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#30">30</a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane tab_contents fade show active" id="qwe">
                                <p>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                </p>
                            </div>
                            <div className="tab-pane tab_contents fade" id="asd">
                                <p>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                    add<br></br>
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/*<div>
                    <h1>META:</h1> {this.state.meta == null ? <br/> : this.showMeta()}
                    <br/>
                    <h1>SAMEFILE:</h1> {this.state.samefile == null ? <br/> : this.showSameFile()}
                    <br/>
                    <h1>MNEMONIC:</h1> {this.state.mnemonicIndices == null ? <br/> : this.createListOfIndices(this.state.mnemonicIndices, this.mnemonics)}
                    <br/>
                    <h1>STRING:</h1> {this.state.stringIndices == null ? <br/> : this.createListOfIndices(this.state.stringIndices, this.string)}
                    <br/>
                    <h1>IMPORT:</h1> {this.state.importIndices == null ? <br/> : this.createListOfIndices(this.state.importIndices, this.import)}
                    <br/>
                    <h1>EXPORT:</h1> {this.state.exportIndices == null ? <br/> : this.createListOfIndices(this.state.exportIndices, this.export)}
                </div>*/}

            </div>

        );
    }
}


export default Inspect;