import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class History extends Component {
  render() {
    const { items, match: {params: {device_id}} } = this.props;
    return (
      <div>
        {items[device_id] && items[device_id].map((item, i) => {
          return <div key={i}>
            <p><span>Type of value changed: {item.type}</span></p>
          </div>
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  items: state.history.items
})

export default withRouter(connect(mapStateToProps)(History));
