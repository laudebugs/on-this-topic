import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./css/App.css";

// import components
import HomePage from "./pages/HomePage";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={HomePage} exact />
      </Router>
    );
  }
}
export default App;
