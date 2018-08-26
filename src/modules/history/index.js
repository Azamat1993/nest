import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';
import InfoItemMapper from '../devices/containers/InfoItemMapper';

const Container = styled.div`
  padding: 1rem;
  overflow: hidden;
`;

const Item = styled.div`
  &:not(:last-child) {
    margin-bottom: .5rem;
  }
  
  &.animated {
    color:red;
  }
`;


class History extends Component {
    shouldAnimate = false;
    render() {
        const {items} = this.props;
        return (
            <Container>
                {items && items.map((item, i) => {
                    item.shouldAnimate = this.shouldAnimate;
                    return <Item className={item.shouldAnimate && 'animated'} key={item.createdAt}>
                        <p>
                            <span>{InfoItemMapper[item.type].title}</span>
                            <span> changed from {item.prevValue}</span>
                            <span> to: {item.nextValue}</span>
                        </p>
                    </Item>
                })}
                {!this.shouldAnimate && (this.shouldAnimate = true)}
            </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {device_id}}} = ownProps;
    return {
        items: state.history.items[device_id]
    }
}

export default withRouter(connect(mapStateToProps)(History));
