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

const ModalContainer = styled.div`
  height: auto;
  width: 70%;
  background-color: #fff;
  padding: 3rem;
`;

const H1 = styled.h1`
  padding: 1rem 0;
  text-align: center;
  font-size: 2rem;
`;

const HistoryContainer = styled.div`
  max-height: 50vh;
  overflow: auto;
  flex: 1;
  border-left: 1px solid black;
`;

const InfoContainer = styled.div`
  flex: 2;
`;

const Container = styled.div`
  display: flex;
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

  componentDidUpdate(prevProps) {
    const { device, history } = this.props;
    if (device === null) {
      history.push('/home');
    }
  }

  render() {
    const { device } = this.props;
    return (
      <OuterFiller onClick={this.onClose}>
        <ModalContainer>
          {device &&
            <div>
              <H1>{device.name}</H1>
              <Container>
                <InfoContainer>
                  <Counter value={device.target_temperature_f}/>
                  <Counter value={device.humidity} />
                </InfoContainer>
                <HistoryContainer>
                  <History />
                </HistoryContainer>
              </Container>
            </div>
          }
        </ModalContainer>
      </OuterFiller>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let device = null;
  const { match: { params: {device_type, device_id}}} = ownProps;
  const device_types = state.devices.devices[device_type];
  if (device_types) {
    device = device_types[device_id];
  }

  return {
    device
  }
}

export default connect(mapStateToProps)(CardInfo);
