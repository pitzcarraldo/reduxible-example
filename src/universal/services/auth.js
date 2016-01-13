import { createReducer, createAction } from 'reduxible';

export const action = createAction({
  LOAD_AUTH: () => {
    return {
      thunk: (dispatch, getState, helpers) => {
        const { cookie } = helpers;
        const userCookie = cookie.get('user') || null;
        if(userCookie) {
          const user = JSON.parse(cookie.get('user'));
          return dispatch(action('UPDATE_USER')(user));
        } else {
          return dispatch(action('REMOVE_USER')());
        }
      }
    }
  },
  LOGIN: (username) => {
    return {
      thunk: (dispatch, getState, helpers) => {
        const { http, cookie } = helpers;
        http.post('http://localhost:8000/auth/login', {
            data: { username }
          })
          .then(({data})=> {
            cookie.set('user', JSON.stringify(data));
            return dispatch(action('UPDATE_USER')(data));
          })
          .catch((res)=> {
            console.log(res);
          });
      }
    }
  },
  LOGOUT: () => {
    return {
      thunk: (dispatch, getState, helpers) => {
        const { http, cookie } = helpers;
        const { username } = cookie.get('auth');
        http.post('http://localhost:8000/auth/logout', {
            data: { username }
          })
          .then(()=> {
            cookie.remove('user');
            return dispatch(action('REMOVE_USER')());
          })
          .catch((res)=> {
            console.log(res);
          });
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
        user: {}
      }
    };
  }
});

export default createReducer({user: {}}, [
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
