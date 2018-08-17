import React, { Component } from 'react';

import { Route } from 'react-router-dom';

import Auth from './modules/auth';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/auth" component={Auth} />
      </div>
    );
  }
}

export default App;
