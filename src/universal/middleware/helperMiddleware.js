export default function helperMiddleware(...helpers) {
  return ({ dispatch, getState }) => {
    return (next) => (action) => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }
      return next({...action, helpers: {...helpers}});
    };
  };
}
