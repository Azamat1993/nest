import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { requestDevice } from '../actions';

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
  onClose = () => {
    this.props.history.push('/home');
  }

  componentDidMount() {
    const  { match: {params: {device_type, device_id}}, requestDevice } = this.props;
    console.log(requestDevice);
    requestDevice(device_type, device_id);
  }

  render() {
    return (
      <OuterFiller onClick={this.onClose}>
        <Container>
          sadf
        </Container>
      </OuterFiller>
    )
  }
}

export default connect(null, {
  requestDevice
})(CardInfo);
