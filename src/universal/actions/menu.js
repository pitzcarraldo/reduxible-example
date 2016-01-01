import { createReducer, createAction } from 'reduxible';
const actions = {
  TOGGLE_MENU: {
    creator: (menuOpen) => {
      return {
        payload: {
          menuOpen
        }
      };
    },
    reducer: (payload) => {
      const { menuOpen } = payload;
      return {
        menuOpen
      };
    }
  }
};
export default createReducer({ menuOpen: false }, actions);
export const action = createAction(actions);
