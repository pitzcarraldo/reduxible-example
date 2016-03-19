import React from 'react';
import { CounterButton } from '../../components/index';

export default function Counter() {
  return (
    <div className="content">
      <div className="pure-g-valign-fix">
        <p>
          <CounterButton />
        </p>
      </div>
    </div>
  );
}
