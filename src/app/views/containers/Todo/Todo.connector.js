import { connect } from 'react-redux';
import { action } from '../../../services/todoService';

export default connect(
  state => ({
    todos: state.todo.todos,
    user: state.auth.user
  }),
  {
    getTodo: action('GET_TODO'),
    addTodo: action('ADD_TODO'),
    toggleTodo: action('TOGGLE_TODO'),
    removeTodo: action('REMOVE_TODO')
  }
);
