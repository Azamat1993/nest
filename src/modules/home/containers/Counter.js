import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  color: ${props => props.updating && 'red' };
`

class Counter extends Component {
  constructor() {
    super();
    this.element = React.createRef();
  }

  runCounter(prev, next) {
    const currentElement = this.element.current;
    this.animation = setTimeout(() => {
      if (prev !== next) {
        const nextPrev = prev < next ? prev + 1 : prev - 1;
        currentElement.innerHTML = nextPrev;
        currentElement.style = 'color: red';
        this.runCounter(nextPrev, next);
      } else {
        currentElement.style = 'color: inherit;';
      }
    }, 60);
  }

  componentDidMount() {
    this.element.current.innerHTML = this.props.value;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value === undefined) {
        this.element.current.innerHTML = this.props.value;
    } else if (prevProps.value !== this.props.value) {
      if (this.animation) {
        clearTimeout(this.animation);
      }
      this.runCounter(prevProps.value, this.props.value);
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.value !== this.props.value;
  }

  componentWillUnmount() {
    if (this.animation) {
      clearTimeout(this.animation);
    }
  }

  render() {
    return (
      <Container>
        <div ref={this.element}></div>
      </Container>
    )
  }
}

export default Counter;
