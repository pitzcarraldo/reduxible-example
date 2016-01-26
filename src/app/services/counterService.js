import { createReducer, createAction } from 'reduxible';

export const action = createAction({
  INCREMENT: {}
});

const initailState = {
  count: 0
};

export default createReducer(initailState, [
  {
    types: [ 'INCREMENT' ],
    reduce: ({ payload }, state) => {
      const { count } = state;
      return {
        ...state,
        count: count + 1
      };
    }
  }
]);
