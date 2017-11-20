import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <section className='section'>
      <div className="App">
      <NavBar />
      </div>
      </section>
      </BrowserRouter>
    );
  }
}

export default App;
