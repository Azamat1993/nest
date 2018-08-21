import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import { setDevices } from './actions';
import { setHistory } from '../history/actions';
import { logout } from '../auth/actions';
import AuthHOC from '../auth/HOC/AuthHOC';
import Card from './containers/Card';
import CardInfo from './containers/CardInfo';
import Axios from '../utils/Axios';

const Container = styled.div`
  background-image: linear-gradient(180deg,#3272cf 0,#589dc7 50%,#8ab7cb);
  background-color: #8ab7cb;
  height: 100vh;
`

class Home extends Component {
  componentDidMount() {
    const { setDevices } = this.props;

    this.subscription = Axios.eventStream.subscribe((data) => {
      setDevices(data);
    });
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  componentDidUpdate(prevProps) {
    const { devices, setHistory } = this.props;
    const prevDevices = prevProps.devices;
    for (var device_type in devices) {
      if (devices.hasOwnProperty(device_type) && prevDevices.hasOwnProperty(device_type)) {
        var devices_group = devices[device_type];
        var prev_devices_group = prevDevices[device_type];
        for (var id in devices_group) {
          var device = devices_group[id];
          var prevDevice = prev_devices_group[id];
          if (device && prevDevice) {
            for (var prop in device) {
              if (device[prop] !== prevDevice[prop]) {
                setHistory({
                  prevValue: prevDevice[prop],
                  nextValue: devices[prop],
                  type: prop,
                  device_id: id
                });
              }
            }
          }
        }
      }
    }
  }

  onLogout = () => {
    this.props.logout();
  }

  render(){
    const { devices } = this.props;
    return (
      <Container>
        {devices && Object.keys(devices).map((deviceName, i) => {
          const device = devices[deviceName];
          return Object.keys(device).map((deviceKey, deviceIndex) => {
            return <Card item={device[deviceKey]} itemType={deviceName} key={deviceKey} />
          });
        })}
        <button onClick={this.onLogout}>Log out</button>
        <Route path="/home/:device_type/:device_id" component={CardInfo} />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  devices: state.devices.devices
})

export default AuthHOC({
  redirectUrl: '/auth',
  shouldRedirect: (loggedIn) => !loggedIn
})(connect(mapStateToProps, {
  setDevices,
  setHistory,
  logout
})(Home));
