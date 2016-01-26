import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { action } from '../../../services/counterService';

@connect(
  state => ({ count: state.counter.count }),
  { increment: action('INCREMENT') }
)
export default class CounterButton extends Component {
  static propTypes = {
    count: PropTypes.number,
    increment: PropTypes.func.isRequired
  };

  render() {
    const { count, increment } = this.props; // eslint-disable-line no-shadow
    return (
      <button className="pure-button" onClick={increment}>
        You have clicked me {count} time{count === 1 ? '' : 's'}.
      </button>
    );
  }
}

