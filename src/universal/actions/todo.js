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
  REMOVE_TODO: (index) => {
    return (dispatch, getState, helper) => {
      const { http } = helper;
      http.delete('http://localhost:8000/todos/' + index)
        .then((res)=> {
          const todos = res.data;
          return dispatch(action('UPDATE_TODOS')(todos));
        })
        .catch((res)=> {
          console.log(res);
          return;
        });
    };
  },
  UPDATE_TODOS: (todos) => {
    return {
      payload: {
        todos
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
  }
]);
