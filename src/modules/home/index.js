import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import { setDevices } from './actions';
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

  render(){
    return (
      <Container>
        {Object.keys(this.props.devices).map((deviceName, i) => {
          const device = this.props.devices[deviceName];
          return Object.keys(device).map((deviceKey, deviceIndex) => {
            return <Card item={device[deviceKey]} itemType={deviceName} key={deviceKey} />
          });
        })}
        <Route path="/home/:device_type/:device_id" component={(props) => {
          const { match: { params: {device_type, device_id}}} = props;
          const device_types = this.props.devices[device_type];
          let device = null;
          if (device_types) {
            device = device_types[device_id];
          }
          return <CardInfo device={device} {...props}/>
        }}/>
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
  setDevices
})(Home));
