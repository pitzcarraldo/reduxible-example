import { createReducer, createAction } from 'reduxible';

export const action = createAction('counter', {
  INCREMENT: {}
});

const initialState = {
  count: 0
};

export default createReducer(initialState, [
  {
    types: [action.type('INCREMENT')],
    reduce: ({ payload }, state) => ({ ...state, count: state.count + 1 })
  }
]);
