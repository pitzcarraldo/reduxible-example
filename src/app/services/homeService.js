import { createReducer, createAction } from 'reduxible';
import { homeRepository } from '../repositories/HomeRepository';

export const action = createAction('home', {
  LOAD_CONTENT: () => ({
    thunk: async(dispatch, getState, { $http }) => {
      const { data: content } = await homeRepository.withClient($http).findAll();
      return dispatch(action('SET_CONTENT')(content));
    }
  }),
  SET_CONTENT: content => ({ payload: { content } })
});

const initialState = {
  content: []
};

export default createReducer(initialState, [
  {
    types: [action.type('SET_CONTENT')],
    reduce: ({ payload: { content } }, state) => ({ ...state, content })
  }
]);
