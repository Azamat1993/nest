import React, { Component } from 'react';
import qs from 'query-string';
import { connect } from 'react-redux';
import AuthHOC from './HOC/AuthHOC';

import { login } from './actions';

class Auth extends Component {
  onLogin = () => {
    window.location.href = 'https://home.nest.com/login/oauth2?client_id=82e718d1-1c2c-4dba-9499-ba67eb3bcae5&state=STATE';
  }

  componentDidMount() {
    const parsed = qs.parse(window.location.search) || {};
    if (parsed.code) {
      this.props.login(parsed.code);
    }
  }

  render() {
    return (
      <button onClick={this.onLogin}>
        Sign in
      </button>
    )
  }
}

export default AuthHOC({
    redirectUrl: '/home',
    shouldRedirect: (loggedIn) => loggedIn
  })(
  connect(null, {
    login
  })(Auth));
