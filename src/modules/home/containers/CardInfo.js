import React, { Component } from 'react';
import styled from 'styled-components';

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

  render() {
    const { device } = this.props;
    return (
      <OuterFiller onClick={this.onClose}>
        <Container>
          {device && device.humidity}
        </Container>
      </OuterFiller>
    )
  }
}

export default CardInfo;
