import React, { Component, PropTypes } from 'react';
import { TodoList } from '../../components/index';
import connector from './Todo.connector';

@connector
export default class Todo extends Component {
  static propTypes = {
    todos: PropTypes.object,
    user: PropTypes.object,
    addTodo: PropTypes.func.isRequired,
    getTodo: PropTypes.func.isRequired
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

  handleChange = ({ target: todoItem }) => {
    this.setState({ todo: todoItem.value });
  };

  render() {
    const styles = require('./Todo.scss');
    const { todos } = this.props;
    const { todo } = this.state;
    return (
      <div className="content">
        <div className="pure-g-valign-fix">
          <h3>Todo List</h3>
          <div className={styles['todo-list']}>
            <div className="pure-form">
              <input
                type="text"
                className="pure-input-rounded"
                placeholder="Add Todo Here"
                value={todo}
                onChange={this.handleChange}
              />
              <button className="pure-button-primary" onClick={this.addTodo}>Add</button>
              <TodoList {...this.props} todos={todos} styles={styles} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
