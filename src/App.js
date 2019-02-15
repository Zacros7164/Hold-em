import React, { Component } from 'react';
// eslint-disable-next-line
import logo from './logo.svg';
import './App.css';
import PokerTable from './components/PokerTable';

class App extends Component {
  render() {
    return(
      <div className="container">
        <PokerTable />
      </div>
    )
  }
}

export default App;
