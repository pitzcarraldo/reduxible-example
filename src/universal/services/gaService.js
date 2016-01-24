import { createReducer } from 'reduxible';
import { UPDATE_PATH } from 'redux-simple-router';
import config from '../../config/index';
import ga from 'react-ga';

let reducer;

if (config.server.current) {
  reducer = createReducer({}, []);
} else {
  ga.initialize(process.env.GA_TRACKING_ID || '');
  reducer = createReducer({}, [
    {
      types: [UPDATE_PATH],
      reduce: ({ payload : { path } }, state) => {
        ga.pageview(path);
        return state;
      }
    }
  ]);
}

export default reducer;