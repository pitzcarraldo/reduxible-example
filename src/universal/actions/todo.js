import { createReducer, createAction } from 'reduxible';

const actions = {
  ADD_TODO: {
    creator: (todo) => {
      return {
        payload: {
          todo
        }
      };
    },
    reducer: (payload, state) => {
      const { todo } = payload;
      const todos = [ ...state.todos, todo ];
      return {
        todos
      };
    }
  },
  REMOVE_TODO: {
    creator: (index) => {
      return {
        payload: {
          index
        }
      };
    },
    reducer: (payload, state) => {
      const { index } = payload;
      const todos = [ ...state.todos ];
      if (index > -1) {
        todos.splice(index, 1);
      }
      return {
        todos
      };
    }
  }
};

export default createReducer({ todos: [] }, actions);
export const action = createAction(actions);
