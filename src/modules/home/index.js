import React, {Component} from 'react';
import axios from 'axios';

import AuthHOC from '../auth/HOC/AuthHOC';

class Home extends Component {
  componentDidMount() {
    axios.get('/')
          .then((data) => {
            console.log(data);
          })
  }

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
