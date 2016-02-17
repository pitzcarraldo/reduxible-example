import { createReducer, createAction } from 'reduxible';
import TodoRepository from '../repositories/TodoRepository';

const todoRepository = new TodoRepository();

export const action = createAction({
  GET_TODO: () => {
    return {
      thunk: async(dispatch, getState, { $http }) => {
        const { data: todos } = await todoRepository.with($http).findAll();
        return dispatch(action('UPDATE_TODOS')(todos));
      }
    };
  },
  ADD_TODO: text => {
    return {
      thunk: async(dispatch, getState, { $http }) => {
        const user = getState().auth.user || {};
        const todo = {};
        todo[ new Date().getTime() ] = {
          user,
          text,
          complete: false
        };
        const { data: todos } = await todoRepository.with($http).save(todo);
        return dispatch(action('UPDATE_TODOS')(todos));
      }
    };
  },
  TOGGLE_TODO: id => {
    return {
      thunk: async(dispatch, getState, { $http }) => {
        const todo = {};
        const currentTodo = getState().todo.todos[ id ];
        todo[ id ] = { complete: !currentTodo.complete };
        const { data: todos } = await todoRepository.with($http).save(todo);
        return dispatch(action('UPDATE_TODOS')(todos));
      }
    };
  },
  REMOVE_TODO: id => {
    return {
      thunk: async(dispatch, getState, { $http }) => {
        const { data: todos } = await todoRepository.with($http).remove(id);
        return dispatch(action('UPDATE_TODOS')(todos));
      }
    };
  },
  UPDATE_TODOS: todos => ({ payload: { todos } })
}
);

const initialState = {
  todos: {}
};

export default createReducer(initialState, [
  {
    types: [ 'UPDATE_TODOS' ],
    reduce: ({ payload: { todos } }, state) => ({ ...state, todos })
  }
]);
