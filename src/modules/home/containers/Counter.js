import React, { Component } from 'react';

class Counter extends Component {
  constructor() {
    super();
    this.element = React.createRef();
  }

  runCounter(prev, next) {
    this.animation = setTimeout(() => {
      if (prev !== next) {
        const nextPrev = prev < next ? prev + 1 : prev - 1;
        this.element.current.innerHTML = nextPrev;
        this.runCounter(nextPrev, next);
      }
    }, 60);
  }

  componentDidMount() {
    this.element.current.innerHTML = this.props.value;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
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
      <div ref={this.element}></div>
    )
  }
}

export default Counter;
