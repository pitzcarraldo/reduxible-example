import { createReducer, createAction } from 'reduxible';

export const action = createAction({
  ADD_TODO: (todo) => {
    return (dispatch, getState, helper) => {
      const { http } = helper;
      http.post('http://localhost:8000/todos', {
        data: { todo }
      })
        .then((res)=> {
          const todos = res.data;
          return dispatch(action('UPDATE_TODOS')(todos));
        })
        .catch((res)=> {
          console.log(res);
          return;
        });
    }
  },
  UPDATE_TODOS: (todos) => {
    return {
      payload: {
        todos
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
    types: ['UPDATE_TODOS'],
    reduce: (payload, state) => {
      const { todos } = payload;
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
