import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar'
import NewsList from './NewsList'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <section className='section'>
      <div className="App">
      <NavBar />
      <Switch>
        <Route 
                exact path="/"
                component={NewsList}
        />
        <Route
                exact path="/popular"
                component={NewsList}
              />
        <Route
                exact path="/topics/:topic"
                component={NewsList}
              />
      </Switch>
      </div>
      </section>
      </BrowserRouter>
    );
  }
}

export default App;
