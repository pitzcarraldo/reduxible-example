import { createReducer, createAction } from 'reduxible';
import TodoRepository from '../repositories/TodoRepository';

export const action = createAction({
  GET_TODO: () => {
    return {
      thunk: async (dispatch, getState, helpers) => {
        const { http }  = helpers;
        const { data: todos } = await TodoRepository(http).findAll();
        return dispatch(action('UPDATE_TODOS')(todos));
      }
    }
  },
  ADD_TODO: (text) => {
    const todo = {};
    todo[new Date().getTime()] = {
      text,
      complete: false
    };
    return {
      thunk: async (dispatch, getState, helpers) => {
        const { http }  = helpers;
        const { data: todos } = await TodoRepository(http).save(todo);
        return dispatch(action('UPDATE_TODOS')(todos));
      }
    }
  },
  TOGGLE_TODO: (id) => {
    return {
      thunk: async (dispatch, getState, helpers) => {
        const todo = {};
        todo[id] = { complete: !getState().todo.todos[id].complete };
        const { http }  = helpers;
        const { data: todos } = await TodoRepository(http).save(todo);
        return dispatch(action('UPDATE_TODOS')(todos));
      }
    }
  },
  REMOVE_TODO: (id) => {
    return {
      thunk: async (dispatch, getState, helpers) => {
        const { http } = helpers;
        const { data: todos } = await TodoRepository(http).remove(id);
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

export default createReducer({todos: {}}, [
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
