import api from '../apis/authApis';

export const UPDATE_USER = 'auth/UPDATE_USER';
export const REMOVE_USER = 'auth/REMOVE_USER';

function updateUser(username, auth) {
  return {
    type: UPDATE_USER,
    payload: { user: { username, auth } }
  };
}

function removeUser() {
  return {
    type: REMOVE_USER,
    payload: { user: null }
  };
}

export function loadAuth() {
  return async ({ $http, $cookie }) => {
    try {
      const auth = $cookie.get('auth');
      if (auth) {
        const { data: username } = await $http.request(api.findUserByAuth(auth));
        return updateUser(username, auth);
      }
      return removeUser();
    } catch (error) {
      console.log(error);
      return removeUser();
    }
  };
}

export function login(username) {
  return async({ $http, $cookie }) => {
    try {
      const { data: auth } = await $http.request(api.login(username));
      $cookie.set('auth', auth);
      return updateUser(username, auth);
    } catch (error) {
      console.log(error);
      return removeUser();
    }
  };
}

export function logout() {
  return async({ $http, $cookie }) => {
    try {
      const auth = $cookie.get('auth');
      const { data: username } = await $http.request(api.logout(auth));
      if (username) {
        $cookie.remove('auth');
      }
      return removeUser();
    } catch (error) {
      console.log(error);
      return removeUser();
    }
  };
}


const initialState = {
  user: null
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case UPDATE_USER :
    case REMOVE_USER :
      return { ...state, user: payload.user };
    default :
      return state;
  }
}
