import { createReducer } from 'reduxible';
import { LOCATION_CHANGE } from 'react-router-redux';
import config from '../../config/index';
let reducer = createReducer({}, []);

try {
  const ga = require('react-ga');
  ga.initialize(config.ga.id);
  reducer = createReducer({}, [
    {
      types: [LOCATION_CHANGE],
      reduce: ({ payload: { path } }, state) => {
        ga.pageview(path);
        return state;
      }
    }
  ]);
} catch (error) {
  console.log(error);
}

export default reducer;
