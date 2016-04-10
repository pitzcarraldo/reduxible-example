import React, { Component } from 'react';
import { CounterButton } from '../../components/index';
import connector from './Counter.connector';

@connector
export default class Counter extends Component { // eslint-disable-line
  render() {
    const { props } = this;
    return (
      <div className="content">
        <div className="pure-g-valign-fix">
          <p>
            <CounterButton {...props} />
          </p>
        </div>
      </div>
    );
  }
}
