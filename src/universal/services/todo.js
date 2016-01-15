import { createReducer, createAction } from 'reduxible';
import TodoRepository from '../repositories/TodoRepository';

export const action = createAction({
  ADD_TODO: (todo) => {
    return {
      thunk: async (dispatch, getState, helpers) => {
        const { http }  = helpers;
        const { data: todos } = await TodoRepository(http).save(todo);
        return dispatch(action('UPDATE_TODOS')(todos));
      }
    }
  },
  REMOVE_TODO: (index) => {
    return {
      thunk: async (dispatch, getState, helpers) => {
        const { http } = helpers;
        const { data: todos } = await TodoRepository(http).remove(index);
        return dispatch(action('UPDATE_TODOS')(todos));
      }
    };
  },
  UPDATE_TODOS: (todos) => {
    return {
      payload: {
        todos
      }
    };
  }
});

export default createReducer({todos: []}, [
  {
    types: ['UPDATE_TODOS'],
    reduce: ({ payload }, state) => {
      const { todos } = payload;
      return {
        ...state,
        todos
      };
    }
  }
]);
