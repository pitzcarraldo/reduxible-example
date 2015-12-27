/**
 * @method
 * @param {Object} initialState - initial state for reducer
 * @param {Object} actions - list of action
 * @returns {Function} reducer - reducer
 */
export default function reducer(initialState = {}, actions) {
  /**
   * @method
   * @param {Object} state - exist state
   * @param {Object} dispatched - dispatched action
   * @returns {Object} state - reduced state
   */
  return (state = initialState, dispatched) => {
    const action = actions[dispatched.type];
    if (action) {
      return { ...state, ...action.reduce(dispatched.value) };
    }
    return state;
  };
}
