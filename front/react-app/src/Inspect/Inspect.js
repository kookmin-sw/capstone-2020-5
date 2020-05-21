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
        super(props)
        this.state = {
            isMnemonicsOpened: false,
            isStringsOpened: false,
            isImportOpened: false,
            isExportOpened: false,
            file: null
        }
        this.onMnemonicsClick = this.onMnemonicsClick.bind(this);
        this.onStringsClick = this.onStringsClick.bind(this);
        this.onImportClick = this.onImportClick.bind(this);
        this.onExportClick = this.onExportClick.bind(this);
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
                this.setState({ file: response.data })
            }
        });
    }

    onMnemonicsClick() {
        this.setState({ isMnemonicsOpened: !this.state.isMnemonicsOpened });

    }
    onStringsClick() {
        this.setState({ isStringsOpened: !this.state.isStringsOpened });
    }
    onImportClick() {
        this.setState({ isImportOpened: !this.state.isImportOpened });

    }
    onExportClick() {
        this.setState({ isExportOpened: !this.state.isExportOpened });

    }

    render() {

        return (
            <div>
                <Nav />
                {
                    this.state.file == null ?
                        <div><Spinner /></div>
                        :
                        <div className="container center">
                            <nav className="menu">
                                <h1 className="menu__logo">Epic Co.</h1>

                                <div className="menu__right">
                                    <ul className="menu__list">
                                        <li className="menu__list-item"><a className="menu__link menu__link--active" href="#" onClick={this.onMnemonicsClick}>Mnemonics</a></li>
                                        <li className="menu__list-item"><a className="menu__link menu__link--active" href="#" onClick={this.onStringsClick}>Strings</a></li>
                                        <li className="menu__list-item"><a className="menu__link menu__link--active" href="#" onClick={this.onImportClick}>Import</a></li>
                                        <li className="menu__list-item"><a className="menu__link menu__link--active" href="#" onClick={this.onExportClick}>Export</a></li>
                                        <li className="menu__list-item"><a className="menu__link" href="#" onClick={this.downloadFile}>Download</a></li>
                                    </ul>

                                    <button className="menu__search-button"></button>

                                    <form className="menu__search-form hide" method="POST">
                                        <input className="menu__search-input" placeholder="Type and hit enter" />
                                    </form>
                                </div>
                            </nav>

                            <Balloon file={this.state.file} />

                            {
                                this.state.isMnemonicsOpened ?
                                    <Mnemonic file={this.state.file} onClose={(e) => this.setState({ isMnemonicsOpened: false })} />
                                    :
                                    <div></div>

                            }
                            {
                                this.state.isStringsOpened ?
                                    <String file={this.state.file} onClose={(e) => this.setState({ isStringsOpened: false })} />
                                    :
                                    <div></div>

                            }
                            {
                                this.state.isImportOpened ?
                                    <Import file={this.state.file} onClose={(e) => this.setState({ isImportOpened: false })} />
                                    :
                                    <div></div>

                            }
                            {
                                this.state.isExportOpened ?
                                    <Import file={this.state.file} onClose={(e) => this.setState({ isExportOpened: false })} />
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