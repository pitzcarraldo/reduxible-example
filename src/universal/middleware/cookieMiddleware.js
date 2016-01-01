export default function cookieMiddleware(cookieManager) {
  return ({ dispatch, getState }) => {
    return (next) => (action) => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }
      if (!action.cookie) {
        return next(action);
      }

      if (action.cookie.value || action.cookie.options) {
        cookieManager.set(action.cookie.name, action.cookie.value, action.cookie.options);
        return next(action);
      }

      action.cookie = cookieManager.get(action.cookie.name);
      return next(action);
    };
  };
}
