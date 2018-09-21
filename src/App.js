import React, { Component } from "react";
import { Box } from "./Box";
import "./App.css";

class App extends Component {
  componentDidMount() {
    Box();
  }
  render() {
    return <div ref="content" />;
  }
}

export default App;
