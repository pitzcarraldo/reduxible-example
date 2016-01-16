import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { action } from '../../../services/todo';


export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    user: PropTypes.object,
    toggleTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired
  };

  render() {
    const { id, todo, user, toggleTodo, removeTodo } = this.props;
    const cx = classNames.bind(require('./TodoList.scss'));
    const self = (user && user.auth) == (todo.user && todo.user.auth);
    return (
      <li className={cx('todo-item', {'todo-item-complete': todo.complete})}>
        <span data-id={id} onClick={self && toggleTodo}>{`${todo.user.username || 'Anonymous'}: ${todo.text}`}</span>
        {self &&
        <button className={cx('todo-item-remove', 'pure-button')}
                data-id={id} onClick={removeTodo}>X
        </button>
        }
      </li>
    );
  }
}
