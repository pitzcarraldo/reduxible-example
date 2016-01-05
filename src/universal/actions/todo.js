import { createReducer, createAction } from 'reduxible';

export const action = createAction({
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
});

export default createReducer({todos: []}, [
  {
    types: ['ADD_TODO'],
    reduce: (payload, state) => {
      const { todo } = payload;
      const todos = [...state.todos, todo];
      return {
        ...state,
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
        ...state,
        todos
      };
    }
  }
]);
