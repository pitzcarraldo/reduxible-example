import { createReducer, createAction } from 'reduxible';
import AuthRepository from '../repositories/AuthRepository';

const authRepository = new AuthRepository();

export const action = createAction({
  LOAD_AUTH: () => {
    return {
      thunk: async(dispatch, getState, { $http, $cookies }) => {
        const auth = $cookies.get('auth');
        if (auth) {
          const { data: username } = await authRepository.with($http).findUserByAuth(auth);
          return dispatch(action('UPDATE_USER')({ username, auth }));
        }
        return dispatch(action('REMOVE_USER')());
      }
    };
  },
  LOGIN: (username) => {
    return {
      thunk: async(dispatch, getState, { $http, $cookies }) => {
        try {
          const { data: auth } = await authRepository.with($http).login(username);
          const user = {
            username,
            auth
          };
          $cookies.set('auth', auth);
          return dispatch(action('UPDATE_USER')(user));
        } catch (error) {
          console.log(error);
        }
      }
    };
  },
  LOGOUT: () => {
    return {
      thunk: async(dispatch, getState, { $http, $cookies }) => {
        try {
          const auth = $cookies.get('auth');
          const { data: username } = await authRepository.with($http).logout(auth);
          if (username) {
            $cookies.remove('auth');
            return dispatch(action('REMOVE_USER')());
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
  },
  UPDATE_USER: user => ({ payload: { user } }),
  REMOVE_USER: () => ({ payload: { user: null } })
});

const initialState = {
  user: null
};

export default createReducer(initialState, [
  {
    types: [ 'UPDATE_USER', 'REMOVE_USER' ],
    reduce: ({ payload: { user } }, state) => ({ ...state, user })
  }
]);
