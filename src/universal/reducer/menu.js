import { createReducer, createAction } from 'reduxible';
const actions = {
  TOGGLE_MENU: {
    creator: (payload) => {
      return {
        payload
      };
    },
    reducer: (payload) => {
      return {
        menuOpen: payload
      };
    }
  }
};
export default createReducer({ menuOpen: false }, actions);
export const action = createAction(actions);
