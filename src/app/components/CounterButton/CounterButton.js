import React, { PropTypes } from 'react';

export default function CounterButton({ count, increment }) {
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
