import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class History extends Component {
  render() {
    const { items } = this.props;
    return (
      <div>
        {items && items.map((item, i) => {
          return <div key={i}>
            <p><span>Type of value changed: {item.type}</span></p>
          </div>
        })}
      </div>
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
