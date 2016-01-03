import { createReducer, createAction } from 'reduxible';

const actions = {
  ADD_TODO: (todo) => {
    return {
      payload: {
        todo
      },
      helper: true
    };
  },
  REMOVE_TODO: (index) => {
    return {
      payload: {
        index
      },
      helper: true
    };
  }
};

const reducers = [
  {
    types: ['ADD_TODO'],
    reduce: (payload, state) => {
      const { todo } = payload;
      const todos = [...state.todos, todo];
      return {
        todos
      };
    }
  },
  {
    types: ['REMOVE_TODO'],
    reduce: (payload, state) => {
      const { index } = payload;
      const todos = [...state.todos];
      if (index > -1) {
        todos.splice(index, 1);
      }
      return {
        todos
      };
    }
  }
];

export default createReducer({todos: []}, reducers);
export const action = createAction(actions);
