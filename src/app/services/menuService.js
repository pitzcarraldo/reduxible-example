import { createReducer, createAction } from 'reduxible';

export const action = createAction('menu', {
  TOGGLE_MENU: menuOpen => ({ payload: { menuOpen } })
});

const initialState = {
  menuOpen: false
};

export default createReducer(initialState, [
  {
    types: [action.type('TOGGLE_MENU')],
    reduce: ({ payload: { menuOpen } }, state) => ({ ...state, menuOpen })
  }
]);
