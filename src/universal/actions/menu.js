import { createReducer, createAction } from 'reduxible';

export const action = createAction({
  TOGGLE_MENU: (menuOpen) => {
    return {
      payload: {
        menuOpen
      }
    }
  }
});

export default createReducer({menuOpen: false}, [
  {
    types: ['TOGGLE_MENU'],
    reduce: (payload) => {
      const { menuOpen } = payload;
      return {
        menuOpen
      };
    }
  }
]);
