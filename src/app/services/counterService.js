import { createReducer, createAction } from 'reduxible';

export const action = createAction('COUNTER', {
  INCREMENT: {}
});

const initailState = {
  count: 0
};

export default createReducer(initailState, [
  {
    types: [action.type('INCREMENT')],
    reduce: ({ payload }, state) => ({ ...state, count: state.count + 1 })
  }
]);
