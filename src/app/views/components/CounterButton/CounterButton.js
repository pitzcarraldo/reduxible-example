import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { action } from '../../../services/counterService';

function CounterButton({ count, increment }) {
  return (
    <button className="pure-button" onClick={increment}>
      You have clicked me {count} time{count === 1 ? '' : 's'}.
    </button>
  );
}

CounterButton.propTypes = {
  count: PropTypes.number,
  increment: PropTypes.func.isRequired
};

export default connect(
  state => ({ count: state.counter.count }),
  { increment: action('INCREMENT') }
)(CounterButton);
