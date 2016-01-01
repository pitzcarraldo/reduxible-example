import React, { Component } from 'react';
import { CounterButton } from '../../components/index';

export default class Counter extends Component {
  render() {
    const styles = require('./Counter.scss');
    return (
      <div className={styles['pure-g-valign-fix']}>
        <p>
          <CounterButton />
        </p>
      </div>
    );
  }
}
