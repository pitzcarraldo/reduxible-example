import todoApi from '../apis/todoApis';

export const UPDATE_TODOS = 'todo/UPDATE_TODOS';

function updateTodo(todos) {
  return {
    type: UPDATE_TODOS,
    payload: { todos }
  };
}

const initialState = {
  todos: {}
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case UPDATE_TODOS:
      return { ...state, todos: payload.todos };
    default:
      return state;
  }
}

export function getTodo() {
  return async({ $http }) => {
    const { data: todos } = await $http.request(todoApi.findAll());
    return updateTodo(todos);
  };
}

export function addTodo(text) {
  return ({ $http }) => async(dispatch, getState) => {
    const user = getState().auth.user || {};
    const todo = {};
    todo[new Date().getTime()] = {
      user,
      text,
      complete: false
    };
    const { data: todos } = await $http.request(todoApi.save(todo));
    return dispatch(updateTodo(todos));
  };
}

export function toggleTodo(id) {
  return ({ $http }) => async(dispatch, getState) => {
    const todo = {};
    const currentTodo = getState().todo.todos[id];
    todo[id] = { complete: !currentTodo.complete };
    const { data: todos } = await $http.request(todoApi.save(todo));
    return dispatch(updateTodo(todos));
  };
}

export function removeTodo(id) {
  return async({ $http }) => {
    const { data: todos } = await $http.request(todoApi.remove(id));
    return updateTodo(todos);
  };
}
