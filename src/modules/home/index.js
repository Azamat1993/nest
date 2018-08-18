import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { requestDevices } from './actions';
import AuthHOC from '../auth/HOC/AuthHOC';

class Home extends Component {
  componentDidMount() {
    this.props.requestDevices();
  }

  render(){
    return (
      <div>
        {Object.keys(this.props.devices).map(item => {
          return <div>{item}</div>
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  devices: state.data.devices
})

export default AuthHOC({
  redirectUrl: '/auth',
  shouldRedirect: (loggedIn) => !loggedIn
})(connect(mapStateToProps, {
  requestDevices
})(Home));
