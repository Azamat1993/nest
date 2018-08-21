import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import InfoItemMapper from '../home/containers/InfoItemMapper';

const Container = styled.div`
  padding: 1rem;
  overflow: hidden;
`;

const Item = styled.div`
  &:not(:last-child) {
    margin-bottom: .5rem;
  }
`;


class History extends Component {
  render() {
    const { items } = this.props;
    return (
      <Container>
        {items && items.map((item, i) => {
          return <Item key={i}>
            <p>
              <span>{InfoItemMapper[item.type].title}</span>
              <span> changed from {item.prevValue}</span>
              <span> to: {item.nextValue}</span>
            </p>
          </Item>
        })}
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { match: {params: {device_id}} } = ownProps;
  return {
    items: state.history.items[device_id]
  }
}

export default withRouter(connect(mapStateToProps)(History));
