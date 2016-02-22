import { createReducer } from 'reduxible';
import { UPDATE_PATH } from 'redux-simple-router';
import config from '../../config/index';
let reducer = reducer = createReducer({}, []);

try {
  const ga = require('react-ga');
  ga.initialize(config.ga.id);
  reducer = createReducer({}, [
    {
      types: [UPDATE_PATH],
      reduce: ({ payload: { path } }, state) => {
        ga.pageview(path);
        return state;
      }
    }
  ]);
} catch (error) {
}

export default reducer;
