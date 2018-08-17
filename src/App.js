import React, { Component } from 'react';

import { Route } from 'react-router-dom';

import Auth from './modules/auth';
import Home from './modules/home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/auth" component={Auth} />
        <Route path="/home" component={Home} />
      </div>
    );
  }
}

export default App;
