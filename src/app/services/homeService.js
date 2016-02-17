import { createReducer, createAction } from 'reduxible';
import HomeRepository from '../repositories/HomeRepository';

const homeRepository = new HomeRepository();

export const action = createAction({
  LOAD_CONTENT: () => {
    return {
      thunk: async(dispatch, getState, { $http }) => {
        const { data: content } = await homeRepository.with($http).findAll();
        return dispatch(action('SET_CONTENT')(content));
      }
    };
  },
  SET_CONTENT: content => ({ payload: { content } })
});

const initialState = {
  content: []
};

export default createReducer(initialState, [
  {
    types: [ 'SET_CONTENT' ],
    reduce: ({ payload: { content } }, state) => ({ ...state, content })
  }
]);
