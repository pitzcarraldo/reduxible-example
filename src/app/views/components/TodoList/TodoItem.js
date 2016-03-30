import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

export default function TodoItem({ user, todo, toggleTodo, removeTodo, styles }) {
  const auth = user && user.auth;
  const todoAuth = todo && todo.user && todo.user.auth;
  const isCurrentUser = !!auth === !!todoAuth;
  const cx = classNames.bind(styles);
  return (
    <li className={cx('todo-item', { 'todo-item-complete': todo.complete })}>
        <span onClick={isCurrentUser && toggleTodo}>
          {`${todo.user.username || 'Anonymous'}: ${todo.text}`}
        </span>
      {isCurrentUser &&
      <button
        className={cx('todo-item-remove', 'pure-button')}
        onClick={removeTodo}
      >X</button>
      }
    </li>
  );
}

TodoItem.propTypes = {
  styles: PropTypes.object,
  user: PropTypes.object,
  todo: PropTypes.object.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired
};
