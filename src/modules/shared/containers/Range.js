import React, {PureComponent} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Input = styled.input`
  &[type=range] {
    -webkit-appearance: none;
    width: 100%;
    margin: 6.95px 0;
    }
    &[type=range]:focus {
    outline: none;
  }
  &[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 1.1px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: #3071a9;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }
  &[type=range]::-webkit-slider-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 15px;
    width: 15px;
    border-radius: 50px;
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -7.15px;
  }
  &[type=range]:focus::-webkit-slider-runnable-track {
    background: #367ebd;
  }
  &[type=range]::-moz-range-track {
    width: 100%;
    height: 1.1px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: #3071a9;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }
  &[type=range]::-moz-range-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 15px;
    width: 15px;
    border-radius: 50px;
    background: #ffffff;
    cursor: pointer;
  }
  &[type=range]::-ms-track {
    width: 100%;
    height: 1.1px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  &[type=range]::-ms-fill-lower {
    background: #2a6495;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  &[type=range]::-ms-fill-upper {
    background: #3071a9;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  &[type=range]::-ms-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 15px;
    width: 15px;
    border-radius: 50px;
    background: #ffffff;
    cursor: pointer;
    height: 1.1px;
  }
  &[type=range]:focus::-ms-fill-lower {
    background: #3071a9;
  }
  &[type=range]:focus::-ms-fill-upper {
    background: #367ebd;
  }
`

class Range extends PureComponent {
    render() {
        const {onChange, max, min, name, defaultValue} = this.props;
        return (
            <Input type="range" name={name} onChange={onChange} max={max} min={min} defaultValue={defaultValue}/>
        )
    }
}

Range.defaultProps = {
    max: 100,
    min: 0,
    defaultValue: 50
}

Range.propTypes = {
    onChange: PropTypes.func,
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    defaultValue: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
}

export default Range;
