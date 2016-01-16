import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { action } from '../../../services/todo';


export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    toggleTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired
  };

  render() {
    const { id, todo, toggleTodo, removeTodo } = this.props;
    const cx = classNames.bind(require('./TodoList.scss'));
    return (
      <li className={cx('todo-item', {'todo-item-complete': todo.complete})}>
        <span data-id={id} onClick={toggleTodo}>{todo.text}</span>
        <button className={cx('todo-item-remove', 'pure-button')}
                data-id={id} onClick={removeTodo}>X
        </button>
      </li>
    );
  }
}
