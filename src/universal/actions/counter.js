import { createReducer, createAction } from 'reduxible';

const actions = {
  INCREMENT: {}
};

const reducers = [
  {
    types: ['INCREMENT'],
    reduce: (payload, state) => {
      const { count } = state;
      return {
        count: count + 1
      };
    }
  }
];

export default createReducer({count: 0}, reducers);
export const action = createAction(actions);
