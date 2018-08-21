import React, { PureComponent } from 'react';
import styled from 'styled-components';
import InfoItemMapper from './InfoItemMapper';
import axios from 'axios';
import { connect } from 'react-redux';
import { setDeviceProp } from '../actions';

import Range from '../../shared/containers/Range';

const Container = styled.div`
  display: flex;
`;

const Item = styled.div`

`;

const Name = styled.div`

`;

const Value = styled.div`

`;

class InfoItem extends PureComponent {
  onChange = (e) => {
    this.props.setDeviceProp({
      device_id: this.props.item.device_id,
      putObj: {
        [e.target.name]: Number(e.target.value)
      }
    })
  }

  render(){
    const { item } = this.props;
    return (<Container>
      {Object.keys(item).map((key) => {
        if (InfoItemMapper.hasOwnProperty(key)) {
          return (
            <Item>
              <Name>{InfoItemMapper[key].title}:</Name>
              <Value>{item[key]}</Value>
              {InfoItemMapper[key].changeable &&
              <Range name={key} onChange={this.onChange} max={InfoItemMapper[key].upperLimit} min={InfoItemMapper[key].lowerLimit} defaultValue={item[key]} />
              }
            </Item>
          )
        }
      })}
    </Container>)
  }
}

export default connect(null, {
  setDeviceProp
})(InfoItem);
