import { LOCATION_CHANGE } from 'react-router-redux';
import config from '../../config/index';

let reducer = (state = {}) => state;

try {
  const ga = require('react-ga');
  ga.initialize(config.ga.id);
  reducer = (state = {}, { type, payload }) => {
    switch (type) {
      case LOCATION_CHANGE :
        ga.pageview(payload.pathname);
        return state;
      default:
        return state;
    }
  };
} catch (error) {
  console.log(error);
}

export default reducer;
