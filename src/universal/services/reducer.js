import { combineRouteReducers }  from 'reduxible';
import counter from './counter';
import todo from './todo';
import menu from './menu';
import home from './home';

export default combineRouteReducers({
  counter,
  todo,
  menu,
  home
});
