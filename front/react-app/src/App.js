import React from "react";
import Nav from "./Nav/Nav";
import Upload from "./Upload/Upload";
import TestModule from "./TestModule/TestModule"
import Intro from "./Intro/Intro"
import Contents from "./Contents/Contents";
import ContentElement from "./Contents/ContentElement";
import loading_bar from "./loading_bar/loading_bar";
import Spinner from "./Spinner/Spinner";
import Inspect from "./Inspect/Inspect";
import Error from "./Error/Error";
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
          <Route path="/loading_bar" exact component={loading_bar}/>
          <Route path="/Spinner" exact component={Spinner}/>
          <Route path="/contents/:id" component={Inspect}/>
          <Route path="/error" exact component={Error}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
