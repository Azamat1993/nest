import React, { Component } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

import Auth from './modules/auth';
import Home from './modules/home';
import Header from './modules/shared/header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/home" component={Home} />
          <Redirect to="/home"/>
        </Switch>
      </div>
    );
  }
}

export default App;
