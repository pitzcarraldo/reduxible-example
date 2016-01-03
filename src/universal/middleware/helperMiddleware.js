import helpers from '../helpers/index'

export default function helperMiddleware() {
  return ({ dispatch, getState }) => {
    return (next) => (action) => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      if (!action.helper) {
        return next(action);
      }

      let req;
      if (action.payload && action.payload.server) {
        req =  action.payload.server.req;
      }

      action.payload.helper = { ...helpers(req) };
      return next(action);
    };
  };
}
