import { createReducer, createAction } from 'reduxible';
import AuthRepository from '../repositories/AuthRepository';


export const action = createAction({
  LOAD_AUTH: () => {
    return {
      thunk: async (dispatch, getState, helpers) => {
        const { http, cookie } = helpers;
        const auth = cookie.get('auth');
        if (auth) {
          const { data : username } = await AuthRepository(http).findUserByAuth(auth);
          return dispatch(action('UPDATE_USER')({username, auth}));
        } else {
          return dispatch(action('REMOVE_USER')());
        }
      }
    };
  },
  LOGIN: (username) => {
    return {
      thunk: async (dispatch, getState, helpers) => {
        try {
          const { http, cookie } = helpers;
          const { data : auth } = await AuthRepository(http).login(username);
          const user = {
            username,
            auth
          };
          cookie.set('auth', auth);
          return dispatch(action('UPDATE_USER')(user));
        } catch (error) {
          console.log(error);
        }
      }
    };
  },
  LOGOUT: () => {
    return {
      thunk: async (dispatch, getState, helpers) => {
        try {
          const { http, cookie } = helpers;
          const auth = cookie.get('auth');
          const { data : username } = await AuthRepository(http).logout(auth);
          if (username) {
            cookie.remove('auth');
            return dispatch(action('REMOVE_USER')());
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
  },
  UPDATE_USER: (user) => {
    return {
      payload: {
        user
      }
    };
  },
  REMOVE_USER: () => {
    return {
      payload: {
        user: null
      }
    };
  }
});

const initialState = {
  user: null
};

export default createReducer(initialState, [
  {
    types: ['UPDATE_USER', 'REMOVE_USER'],
    reduce: ({ payload }, state) => {
      const { user } = payload;
      return {
        ...state,
        user
      };
    }
  }
]);
