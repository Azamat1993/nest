import React, {Component} from 'react';
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
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
    const { devices } = this.props;
    return (
      <Container>
        <div>
          {devices && Object.keys(devices).map((deviceName, i) => {
            const device = devices[deviceName];
            return Object.keys(device).map((deviceKey, deviceIndex) => {
              return <Card item={device[deviceKey]} itemType={deviceName} key={deviceKey} />
            });
          })}
        </div>
        <Route path="/devices/:device_type/:device_id" component={CardInfo} />
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
