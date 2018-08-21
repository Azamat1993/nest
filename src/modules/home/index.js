import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import { setDevices } from './actions';
import { setHistory } from '../history/actions';
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
    const thermostats = prevProps.devices.thermostats;
    for (var id in thermostats) {
      for (var prop in thermostats[id]) {
        if (thermostats[id][prop] !== devices.thermostats[id][prop]) {
          setHistory({
            prevValue: thermostats[id][prop],
            nextValue: devices.thermostats[id][prop],
            type: prop,
            device_id: id
          });
        }
      }
    }
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
  setHistory
})(Home));
