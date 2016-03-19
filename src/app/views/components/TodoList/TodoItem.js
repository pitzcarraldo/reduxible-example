import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';

export default class TodoItem extends Component {
  static propTypes = {
    id: PropTypes.string,
    todo: PropTypes.object.isRequired,
    user: PropTypes.object,
    toggleTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired
  };

  self(user, todoUser) {
    if ((!user || !user.auth) && (!todoUser || !todoUser.auth)) {
      return true;
    }
    return (user && user.auth) === (todoUser && todoUser.auth);
  }

  render() {
    const { id, todo, user, toggleTodo, removeTodo } = this.props;
    const cx = classNames.bind(require('./TodoList.scss'));
    const self = this.self(user, todo.user);
    return (
      <li className={cx('todo-item', { 'todo-item-complete': todo.complete })}>
        <span data-id={id} onClick={self && toggleTodo}>
          {`${todo.user.username || 'Anonymous'}: ${todo.text}`}
        </span>
        {self &&
        <button className={cx('todo-item-remove', 'pure-button')}
          data-id={id} onClick={removeTodo}
        >X</button>
        }
      </li>
    );
  }
}
