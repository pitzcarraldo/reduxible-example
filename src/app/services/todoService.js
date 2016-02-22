import { createReducer, createAction } from 'reduxible';
import { todoRepository } from '../repositories/TodoRepository';

export const action = createAction('todo', {
  GET_TODO: () => ({
    thunk: async(dispatch, getState, { $http }) => {
        const { data: todos } = await todoRepository.withClient($http).findAll();
        return dispatch(action('UPDATE_TODOS')(todos));
      }
  }),
  ADD_TODO: text => ({
    thunk: async(dispatch, getState, { $http }) => {
        const user = getState().auth.user || {};
        const todo = {};
        todo[new Date().getTime()] = {
          user,
          text,
          complete: false
        };
        const { data: todos } = await todoRepository.withClient($http).save(todo);
        return dispatch(action('UPDATE_TODOS')(todos));
      }
  }),
  TOGGLE_TODO: id => ({
    thunk: async(dispatch, getState, { $http }) => {
        const todo = {};
        const currentTodo = getState().todo.todos[id];
        todo[id] = { complete: !currentTodo.complete };
        const { data: todos } = await todoRepository.withClient($http).save(todo);
        return dispatch(action('UPDATE_TODOS')(todos));
      }
  }),
  REMOVE_TODO: id => ({
    thunk: async(dispatch, getState, { $http }) => {
        const { data: todos } = await todoRepository.withClient($http).remove(id);
        return dispatch(action('UPDATE_TODOS')(todos));
      }
  }),
  UPDATE_TODOS: todos => ({ payload: { todos } })
}
);

const initialState = {
  todos: {}
};

export default createReducer(initialState, [
  {
    types: [action.type('UPDATE_TODOS')],
    reduce: ({ payload: { todos } }, state) => ({ ...state, todos })
  }
]);
