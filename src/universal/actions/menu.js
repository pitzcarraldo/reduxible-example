import { createReducer, createAction } from 'reduxible';

const actions = {
  TOGGLE_MENU: (menuOpen) => {
    return {
      payload: {
        menuOpen
      }
    }
  }
};

const reducers = [
  {
    types: ['TOGGLE_MENU'],
    reduce: (payload) => {
      const { menuOpen } = payload;
      return {
        menuOpen
      };
    }
  }
];

export default createReducer({menuOpen: false}, reducers);
export const action = createAction(actions);
