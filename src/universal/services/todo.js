import { createReducer, createAction } from 'reduxible';

export const action = createAction({
  ADD_TODO: (todo) => {
    return {
      thunk: (dispatch, getState, helper) => {
        const http = helper.get('http');
        http.post('http://localhost:8000/todos', {
            data: {todo}
          })
          .then((res)=> {
            const todos = res.data;
            return dispatch(action('UPDATE_TODOS')(todos));
          })
          .catch((res)=> {
            console.log(res);
          });
      }
    }
  },
  REMOVE_TODO: (index) => {
    return {
      thunk: (dispatch, getState, helper) => {
        const http = helper.get('http');
        http.delete('http://localhost:8000/todos/' + index)
          .then((res)=> {
            const todos = res.data;
            return dispatch(action('UPDATE_TODOS')(todos));
          })
          .catch((res)=> {
            console.log(res);
          });
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
