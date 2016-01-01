import { combineRouteReducers }  from 'reduxible';
import counter from './counter';
import todo from './todo';
import menu from './menu';

export default combineRouteReducers({
  counter,
  todo,
  menu
});
