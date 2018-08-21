import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { connect } from 'react-redux';
import Counter from './Counter';
import History from '../../history';

const OuterFiller = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,.4);
`;

const Container = styled.div`
  height: auto;
  width: 70%;
  background-color: #fff;
  padding: 3rem;
`;

const H1 = styled.h1`
  padding: 1rem 0;
  text-align: center;
  font-size: 2rem;
`

class CardInfo extends Component {
  onClose = (e) => {
    if (e.target === e.currentTarget) {
      this.props.history.push('/home');
    }
  }

  onChange = (e) => {
    axios.put(`/devices/thermostats/4dBoOXRpX_akxgWM4eCHDj3m708tVO-i`, {
      target_temperature_f: 70
    });
  }

  render() {
    const { device } = this.props;
    return (
      <OuterFiller onClick={this.onClose}>
        <Container>
          {device &&
          <div>
            <H1>{device.name}</H1>
            <Counter value={device.target_temperature_f}/>
            <Counter value={device.humidity} />
          </div>}
        </Container>

                  <History />
      </OuterFiller>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { match: { params: {device_type, device_id}}} = ownProps;
  const { devices } = state;
  let device = null;
  if (devices.devices) {
    const device_types = devices.devices[device_type];
    if (device_types) {
      device = device_types[device_id];
    }
  }

  return {
    device
  }
}

export default connect(mapStateToProps)(CardInfo);
