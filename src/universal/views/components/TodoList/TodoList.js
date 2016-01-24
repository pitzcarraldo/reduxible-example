import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { action } from '../../../services/todoService';
import TodoItem from './TodoItem';

@connect(
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
)
export default class TodoList extends Component {
  static propTypes = {
    todos: PropTypes.object,
    user: PropTypes.object,
    addTodo: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired
  };

  state = {
    todo: ''
  };

  componentWillMount() {
    this.props.getTodo();
  }

  addTodo = () => {
    this.props.addTodo(this.state.todo);
    this.setState({ todo: '' });
  };

  toggleTodo = ({ target : { dataset: { id } } }) => {
    this.props.toggleTodo(id);
  };

  removeTodo = ({ target : { dataset: { id } } }) => {
    this.props.removeTodo(id);
  };

  handleChange = ({ target: todoItem }) => {
    this.setState({ todo: todoItem.value });
  };

  render() {
    const styles = require('./TodoList.scss');
    const { todos, user } = this.props;
    const { todo } = this.state;
    return (
      <div className={styles['todo-list']}>
        <div className="pure-form">
          <input type="text" className="pure-input-rounded" placeholder="Add Todo Here"
                 value={todo} onChange={this.handleChange}/>
          <button className="pure-button-primary" onClick={this.addTodo}>Add</button>

          <ul>
            {Object.keys(todos).map(
              (id, key) =>
                <TodoItem key={key} id={id} todo={todos[id]}
                          user={user}
                          removeTodo={this.removeTodo}
                          toggleTodo={this.toggleTodo}
                />
            )}
          </ul>
        </div>
      </div>
    );
  }
}
