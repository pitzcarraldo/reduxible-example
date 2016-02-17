import { createReducer, createAction } from 'reduxible';
import HomeRepository from '../repositories/HomeRepository';

export const action = createAction({
  LOAD_CONTENT: () => {
    return {
      thunk: async (dispatch, getState, helpers) => {
        const { http } = helpers;
        /* eslint-disable new-cap */
        const content = await (await HomeRepository(http).findAll()).json();
        return dispatch(action('SET_CONTENT')(content));
      }
    };
  },
  SET_CONTENT: (content) => {
    return {
      payload: {
        content
      }
    };
  }
});

const initialState = {
  content: []
};

export default createReducer(initialState, [
  {
    types: [ 'SET_CONTENT' ],
    reduce: ({ payload }, state) => {
      const { content } = payload;
      return {
        ...state,
        content
      };
    }
  }
]);
