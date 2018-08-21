import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.button`
  display: inline-block;
  border:1px solid #C9AE34;
  color: #705D07;
  border-radius: .3rem
  width: auto;
  height: auto;
  font-size: 1.6rem;
  padding: 1rem 4rem;
  box-shadow: inset 0 1px 0 0 #FFF6CE,inset 0 -1px 0 0 #E3C852,inset 0 0 0 1px #FCE88D,0 2px 4px 0 #D4D4D4;
  text-shadow: 0 1px 0 #FFFFFF;
  background-image: linear-gradient(to top, #FCAAA1, #FCD514);
  background-color: #5E552B;
  cursor: pointer;
  font-weight: bold;

  &:focus {
    outline: none;
  }

  &:hover {
    border:1px solid #967D09;
    color: #705D07;
    box-shadow: inset 0 1px 0 0 #FFF6CE,inset 0 -1px 0 0 #E3C852,inset 0 0 0 1px #FCE88D;
    background-color: #FCDF5B;
  }
`;

const Button = (props) => (<Container onClick={props.onClick}>
    {props.children}
  </Container>)

Button.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func
}

export default Button;
