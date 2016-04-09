import { connect } from 'react-redux';
import { getTodo, addTodo, toggleTodo, removeTodo } from '../../../services/todoService';

export default connect(
  state => ({
    todos: state.todo.todos,
    user: state.auth.user
  }),
  {
    getTodo,
    addTodo,
    toggleTodo,
    removeTodo
  }
);
