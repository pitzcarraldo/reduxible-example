import { createReducer, createAction } from 'reduxible';

export const action = createAction({
  TOGGLE_MENU: (menuOpen) => {
    return {
      payload: {
        menuOpen
      }
    };
  }
});

const initialState = {
  menuOpen: false
};

export default createReducer(initialState, [
  {
    types: [ 'TOGGLE_MENU' ],
    reduce: ({ payload }, state) => {
      const { menuOpen } = payload;
      return {
        ...state,
        menuOpen
      };
    }
  }
]);
