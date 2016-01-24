import React, { Component } from 'react';
import { TodoList } from '../../components/index';

export default class Todo extends Component {
  render() {
    return (
      <div className="content">
        <div className="pure-g-valign-fix">
          <h3>Todo List</h3>
          <TodoList />
        </div>
      </div>
    );
  }
}
