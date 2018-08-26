import React, {PureComponent} from 'react';
import styled from 'styled-components';
import InfoItemMapper from './InfoItemMapper';
import Counter from './Counter';
import {connect} from 'react-redux';
import {setDeviceProp} from '../actions';

import Range from '../../shared/containers/Range';

const Container = styled.div`
  display: flex;
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

    render() {
        const {item} = this.props;
        return (<Container>
            {Object.keys(item).map((key) => {
                if (InfoItemMapper.hasOwnProperty(key)) {
                    return (
                        <div key={key}>
                            <div>{InfoItemMapper[key].title}:</div>
                            {InfoItemMapper[key].withCounter && <Counter value={item[key]}/>}
                            {!InfoItemMapper[key].withCounter && <div>{item[key]}</div>}
                            {InfoItemMapper[key].changeable &&
                            <Range name={key} onChange={this.onChange} max={InfoItemMapper[key].upperLimit}
                                   min={InfoItemMapper[key].lowerLimit} defaultValue={item[key]}/>
                            }
                        </div>
                    )
                }
            })}
        </Container>)
    }
}

export default connect(null, {
    setDeviceProp
})(InfoItem);
