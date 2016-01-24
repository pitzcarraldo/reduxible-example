import { createReducer } from 'reduxible';
import { UPDATE_PATH } from 'redux-simple-router';
import ga from 'react-ga';

ga.initialize(process.env.GA_TRACKING_ID || '');

export default createReducer({}, [
  {
    types: [UPDATE_PATH],
    reduce: ({ payload : { path } }, state) => {
      ga.pageview(path);
      return state;
    }
  }
]);
