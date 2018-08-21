import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 1rem;
  overflow: hidden;
`;

const Item = styled.div`
  &:not(:last-child) {
    margin-bottom: .5rem;
  }
`

class History extends Component {
  render() {
    const { items } = this.props;
    return (
      <Container>
        {items && items.map((item, i) => {
          return <Item key={i}>
            <p><span>Type of value changed: {item.type}</span></p>
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
