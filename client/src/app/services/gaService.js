import { createReducer, createAction } from 'reduxible';
import { UPDATE_PATH } from 'redux-simple-router';
import config from "../../config/index";
import ga from "react-ga";

ga.initialize(config.ga.id);

export default createReducer({}, [{
  types: [UPDATE_PATH],
  reduce: ({payload : {path}}, state) => {
    ga.pageview(path);
    return state;
  }
}]);
