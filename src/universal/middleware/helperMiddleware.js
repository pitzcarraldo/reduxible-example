import helpers from '../helpers/index'

export default function helperMiddleware() {
  return ({ dispatch, getState }) => {
    return next => action => {
      let req;
      if (action.payload && action.payload.server) {
        req = action.payload.server.req;
      }

      const helper = helpers(req);

      if (typeof action === 'function') {
        return action(dispatch, getState, helper);
      }

      if (!action.helper) {
        return next(action);
      }

      action.payload.helper = helper;

      return next(action);
    };
  };
}
