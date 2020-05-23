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
import Overview from './Overview/Overview';


class Inspect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file : null,
            initialized : false
        }
        this.showMeta = this.showMeta.bind(this);
        this.showSameFile = this.showSameFile.bind(this);
        this.createList = this.createList.bind(this);
        this.createListValues = this.createListValues.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
        this.initLists = this.initLists.bind(this);
        this.createMnemonicOverview=this.createMnemonicOverview.bind(this);

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
                //filename:"fd63829b39eb6a034b609e4e25ee8d22.pickle.txt"
                filename: this.props.match.params.id
            }
        }).then((response) => {
            if (response.data == "error") {
                window.localStorage.setItem('error_message', "File not found error");
                window.location = "/error";
            } else {
                this.setState({ file: response.data });
                this.meta = this.state.file["meta"];
                this.samefile = this.state.file["samefile"];
                this.mnemonic_samefiles=this.state.file["mnemonic_samefiles"];
                this.initLists("mal_functions");
                this.initLists("string");
                this.initLists("import");
                this.initLists("export");
                this.setState({initialized : true});
               
            }
        });
    }
    createMnemonicOverview()
    { 
        let list=[];
        Object.entries(this.mnemonic_samefiles).forEach(([key, value]) => {
       list.push(<Overview data={this.mnemonic_samefiles} md5={key}/>);
       

    }); 
     return list;

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
                this.mnemonicKeys = tempKeys;
                this.mnemonicValues = tempValues;
                break;
            case "string":
                this.stringKeys = tempKeys;
                this.stringValues = tempValues;
                break;
            case "import":
                this.importKeys = tempKeys;
                this.importValues = tempValues;
                break;
            case "export":
                this.exportKeys = tempKeys;
                this.exportValues = tempValues;
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
        let list = [];
        if(index == null) {
            for (let i = 0; i < array.length; i++) {
                list.push(
                    <p key={i}>{array[i]} </p>
                );
            }
            return list;
        } else {
            for (let i = 0; i < array[index].length; i++) {
                list.push(
                    <p key={i}>{array[index][i]} </p>
                );
            }
            return list;
        }
    }

    createListValues(keyArray, valueArray) {
        let list = [];
        for(var i = 0; i < keyArray.length; ++i) {
            for(var j = 0; j < valueArray[i].length; ++j) {
                list.push(
                    <p key={i * keyArray.length + j}>{valueArray[i][j]} </p>
                );
            }
            list.push(<br/>);
        }
        return list;
    }


    render() {
        return(
          <div>
              {
                  this.state.initialized?
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
                                <li className="file_md5"> md5 : 	55cb06fc7ddebaf8c87df15c3681a1fd</li>
                                <li className="file_sha256"> sha256 : 	b384422960a820e3091e011d1a74d6cb5f5fb9f98a67e88233c7da1e3f91e778 </li>
                                <li className="file_size"> file size : 440.92 KB</li>
                            </div>
                        </div>
                    </div>
                    <hr className="under_line"></hr>
                    <div className="mnemonic">
                        <div className="contents_title">Mnimonic</div>
                        <div id="accordion">
                            
                           

                            <div className="card full_accordion">
                                <div className="accordion-header" id="headingOne">
                                    <div className="mb-0 each_function">
                                        <div className="function_hash col-10">
                                            55cb06fc7ddebaf8c87df15c3681a1fd
                                        </div>
                                        <div className="result-button-contain col-2">
                                            <div className="result-button" data-toggle="collapse"
                                                    data-target="#collapseOne" aria-expanded="true"
                                                    aria-controls="collapseOne">
                                                유사도 검사
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="collapseOne" className="collapse" aria-labelledby="headingOne"
                                     data-parent="#accordion">
                                    <div className="card-body">
                                        <div className="progress-contain">
                                            <div className="progress">
                                                <div className="progress-bar bg-success"
                                                     role="progressbar" aria-valuenow="75" aria-valuemin="0"
                                                     aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <table className="table table-striped">
                                                <thead>
                                                <tr>
                                                    <th scope="col">md5</th>
                                                    <th scope="col">Cosine</th>
                                                    <th scope="col">Edit</th>
                                                    <th scope="col">Details</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <th scope="row">55cb06fc7ddebaf8c87df15c3681a1fd</th>
                                                    <td>0.00</td>
                                                    <td>0.00</td>
                                                    <td>
                                                        <button type="button" className=""
                                                                data-toggle="modal" data-target="#exampleModalCenter">
                                                            <span className="material-icons">zoom_in</span>
                                                        </button>

                                                        <div className="modal fade" id="exampleModalCenter"
                                                             tabIndex="-1" role="dialog"
                                                             aria-labelledby="exampleModalCenterTitle"
                                                             aria-hidden="true">
                                                            <div className="modal-dialog modal-dialog-centered"
                                                                 role="document">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <h5 className="modal-title"
                                                                            id="exampleModalCenterTitle">Modal
                                                                            title</h5>
                                                                        <button type="button" className="close"
                                                                                data-dismiss="modal" aria-label="Close">
                                                                            <span aria-hidden="true">&times;</span>
                                                                        </button>
                                                                    </div>
                                                                    <div className="modal-body">
                                                                        ...
                                                                    </div>
                                                                    <div className="modal-footer">
                                                                        <button type="button"
                                                                                className="btn btn-secondary"
                                                                                data-dismiss="modal">Close
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {this.createMnemonicOverview()}
                                               
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card full_accordion">
                                <div className="accordion-header" id="headingTwo">
                                    <div className="mb-0 each_function">
                                        <div className="function_hash col-10">
                                            55cb06fc7ddebaf8c87df15c3681a1fd
                                        </div>
                                        <div className="result-button-contain col-2">
                                            <div className="result-button" data-toggle="collapse"
                                                    data-target="#collapseTwo" aria-expanded="true"
                                                    aria-controls="collapseTwo">
                                                유사도 검사
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo"
                                     data-parent="#accordion">
                                    <div className="card-body">
                                        <div>
                                            progress bar
                                        </div>
                                        <div>
                                            유사한 md5   cosine   edit   보기
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card full_accordion">
                                <div className="accordion-header" id="headingThree">
                                    <div className="mb-0 each_function">
                                        <div className="function_hash col-10">
                                            55cb06fc7ddebaf8c87df15c3681a1fd
                                        </div>
                                        <div className="result-button-contain col-2">
                                            <div className="result-button" data-toggle="collapse"
                                                    data-target="#collapseThree" aria-expanded="true"
                                                    aria-controls="collapseThree">
                                                유사도 검사
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="collapseThree" className="collapse" aria-labelledby="headingThree"
                                     data-parent="#accordion">
                                    <div className="card-body">
                                        <div>
                                            progress bar
                                        </div>
                                        <div>
                                            유사한 md5   cosine   edit   보기
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="string">
                        <div className="contents_title">String</div>
                        <div id="accordion">
                            <div className="card full_accordion">
                                <div className="accordion-header" id="stringOne">
                                    <div className="mb-0 each_function">
                                        <div className="function_hash col-10">
                                            55cb06fc7ddebaf8c87df15c3681a1fd
                                        </div>
                                        <div className="result-button-contain col-2">
                                            <div className="result-button" data-toggle="collapse"
                                                 data-target="#collapseStringOne" aria-expanded="true"
                                                 aria-controls="collapseStringOne">
                                                유사도 검사
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="collapseStringOne" className="collapse" aria-labelledby="stringOne"
                                     data-parent="#accordion">
                                    <div className="card-body">
                                        <div className="progress-contain">
                                            <div className="progress">
                                                <div className="progress-bar bg-success"
                                                     role="progressbar" aria-valuenow="75" aria-valuemin="0"
                                                     aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <table className="table table-striped">
                                                <thead>
                                                <tr>
                                                    <th scope="col">md5</th>
                                                    <th scope="col">Cosine</th>
                                                    <th scope="col">Edit</th>
                                                    <th scope="col">Details</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <th scope="row">55cb06fc7ddebaf8c87df15c3681a1fd</th>
                                                    <td>0.00</td>
                                                    <td>0.00</td>
                                                    <td>
                                                        button
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>Jacob</td>
                                                    <td>Thornton</td>
                                                    <td>@fat</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td>Larry</td>
                                                    <td>the Bird</td>
                                                    <td>@twitter</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card full_accordion">
                                <div className="accordion-header" id="stringTwo">
                                    <div className="mb-0 each_function">
                                        <div className="function_hash col-10">
                                            55cb06fc7ddebaf8c87df15c3681a1fd
                                        </div>
                                        <div className="result-button-contain col-2">
                                            <div className="result-button" data-toggle="collapse"
                                                 data-target="#collapseStringTwo" aria-expanded="true"
                                                 aria-controls="collapseStringTwo">
                                                유사도 검사
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="collapseStringTwo" className="collapse" aria-labelledby="stringTwo"
                                     data-parent="#accordion">
                                    <div className="card-body">
                                        <div>
                                            progress bar
                                        </div>
                                        <div>
                                            유사한 md5   cosine   edit   보기
                                        </div>
                                    </div>
                                </div>
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
                                    {this.state.initialized ?
                                        <div>
                                            {this.createListValues(this.importKeys, this.importValues)}
                                        </div>
                                        :
                                        <br/>
                                    }
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
                                    {this.state.initialized ?
                                        <div>
                                            {this.createListValues(this.exportKeys, this.exportValues)}
                                        </div>
                                        :
                                        <br/>
                                    }
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
                </div>
                :
                <br/>
              }
          </div>
        );
    }
}


export default Inspect;