import React from 'react';
import logo from './logo.svg';
import './App.css';

import MultiplierComponent  from "../src/pages/Dimensions";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          React Multiplier Dimensions
        </p>
        <div>
          <MultiplierComponent multiplier={3} onNewTotal={total => 0}  />
        </div>
      </header>

    </div>
  );
}

export default App;
