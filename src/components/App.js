import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import NewsList from './NewsList';
import Article from './Article';
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
        <Route
                exact path='/articles/:id'
                component={Article}
              />
      </Switch>
      </div>
      </section>
      </BrowserRouter>
    );
  }
}

export default App;
