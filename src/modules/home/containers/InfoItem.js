import React, { PureComponent } from 'react';
import styled from 'styled-components';
import InfoItemMapper from './InfoItemMapper';

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
  render(){
    const { item } = this.props;
    return (<Container>
      {Object.keys(item).map((key) => {
        if (InfoItemMapper.hasOwnProperty(key)) {
          return (
            <Item>
              <Name>{InfoItemMapper[key].title}:</Name>
              <Value>{item[key]}</Value>
            </Item>
          )
        }
      })}
    </Container>)
  }
}

export default InfoItem;
