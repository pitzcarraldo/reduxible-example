import { createReducer, createAction } from 'reduxible';

export const action = createAction({
  INCREMENT: {}
});

const initailState = {
  count: 0
};

export default createReducer(initailState, [
  {
    types: ['INCREMENT'],
    reduce: ({ payload }, state) => ({ ...state, count: state.count + 1 })
  }
]);
