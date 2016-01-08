import Helpers from '../helpers/Helpers'

export default function helpersMiddleware({ dispatch, getState }) {
  return next => action => {
    const req = (server => server.req)(action.server || {});
    const helpers = new Helpers(req);

    if (action.thunk) {
      return action.thunk(dispatch, getState, helpers);
    }

    action.helpers = helpers;
    return next(action);
  };
}
