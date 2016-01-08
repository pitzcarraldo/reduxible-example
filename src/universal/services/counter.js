import { createReducer, createAction } from 'reduxible';

export const action = createAction({
  INCREMENT: {}
});

export default createReducer({count: 0}, [
  {
    types: ['INCREMENT'],
    reduce: ({ payload }, state) => {
      const { count } = state;
      return {
        ...state,
        count: count + 1
      };
    }
  }
]);
