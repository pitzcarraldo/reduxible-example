import { createReducer, createAction } from 'reduxible';

const actions = {
  //If you want to create action what has only type, don't need to make creator.
  INCREMENT: {
    reducer: (payload, state) => {
      const { count } = state;
      return {
        count: count + 1
      };
    }
  }
};

export default createReducer({ count: 0 }, actions);
export const action = createAction(actions);
