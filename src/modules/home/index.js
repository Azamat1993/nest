import React, {Component} from 'react';
import AuthHOC from '../auth/HOC/AuthHOC';

class Home extends Component {
  render(){
    return (
      <div>Home</div>
    )
  }
}

export default AuthHOC({
  redirectUrl: '/auth',
  shouldRedirect: (loggedIn) => !loggedIn
})(Home);
