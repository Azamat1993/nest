import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
          {device && device.target_temperature_f}
        </Container>

        <input type="text" onClick={this.onChange} defaultValue={device.target_temperature_f}/>
      </OuterFiller>
    )
  }
}

export default CardInfo;
