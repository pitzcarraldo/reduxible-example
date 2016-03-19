import React from 'react';
import { TodoList } from '../../components/index';

export default function Todo() {
  return (
    <div className="content">
      <div className="pure-g-valign-fix">
        <h3>Todo List</h3>
        <TodoList />
      </div>
    </div>
  );
}
