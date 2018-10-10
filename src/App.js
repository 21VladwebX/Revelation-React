import React, { Component } from 'react';
import Currency from './components/Currency/Currency';
import Form from './components/Form/Form';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Form />
        <Currency />
      </div>
    );
  }
}

export default App;
