import { createReducer, createAction } from 'reduxible';

export const action = createAction({
  LOAD_CONTENT: () => {
    return {
      thunk: (dispatch, getState, helpers) => {
        const { http } = helpers;
        http.get('http://localhost:8000/home')
          .then(({ data })=> {
            return dispatch(action('SET_CONTENT')(data));
          })
      }
    }
  },
  SET_CONTENT: (content) => {
    return {
      payload: {
        content
      }
    }
  }
});

export default createReducer({content: {}}, [
  {
    types: ['SET_CONTENT'],
    reduce: ({ payload }, state) => {
      const { content } = payload;
      return {
        ...state,
        content
      };
    }
  }
]);
