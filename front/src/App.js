import React from "react";
import Nav from "./Nav/Nav";
import Upload from "./Upload/Upload";
import TestModule from "./TestModule/TestModule"
import Intro from "./Intro/Intro"
import Contents from "./Contents/Contents";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav /> 
        <Switch>
          <Route path="/" exact component={Upload}/>
          <Route path="/test" exact component={TestModule}/>
          <Route path="/intro" exact component={Intro}/>
          <Route path="/contents" exact component={Contents}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
