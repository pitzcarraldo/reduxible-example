import React, { PropTypes } from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ todos, user, toggleTodo, removeTodo, styles }) {
  return (
    <ul>
      {Object.keys(todos).map(
        (id, key) =>
          <TodoItem
            key={key}
            todo={todos[id]}
            user={user}
            removeTodo={() => removeTodo(id)}
            toggleTodo={() => toggleTodo(id)}
            styles={styles}
          />
      )}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.object,
  user: PropTypes.object,
  toggleTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  styles: PropTypes.object
};
