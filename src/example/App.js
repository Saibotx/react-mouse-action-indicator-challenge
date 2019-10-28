//TODO:
// seperate style into css file.
// write tests maybe?
// release as package
// test mobile for multitouch
// test reject simulated events
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MouseActionIndicator from '../lib';

function App() {
  return (
    <MouseActionIndicator className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload..
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </MouseActionIndicator>
  );
}

export default App;
