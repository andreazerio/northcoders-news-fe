import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import NewsList from './NewsList';
import Article from './Article';

const App = () => (
  <BrowserRouter>
    <section className='section' style={{ padding: '0' }}>
      <div className="App">
        <NavBar style={{ position: 'fixed', marginTop: '0px' }} />
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
)
export default App;
