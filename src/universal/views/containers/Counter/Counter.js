import React, { Component } from 'react';
import { CounterButton } from '../../components/index';

export default class Counter extends Component {
  render() {
    return (
      <div className="content">
        <div className='pure-g-valign-fix'>
          <p>
            <CounterButton />
          </p>
        </div>
      </div>
    );
  }
}
