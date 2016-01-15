import { createReducer, createAction } from 'reduxible';
import HomeRepository from '../repositories/HomeRepository';

export const action = createAction({
  LOAD_CONTENT: () => {
    return {
      thunk: async (dispatch, getState, helpers) => {
        const { http } = helpers;
        const { data: content } = await HomeRepository(http).findAll();
        return dispatch(action('SET_CONTENT')(content));
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
