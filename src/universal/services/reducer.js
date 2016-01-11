import { combineRouteReducers }  from 'reduxible';
import auth from './auth';
import counter from './counter';
import todo from './todo';
import menu from './menu';
import home from './home';

export default combineRouteReducers({
  auth,
  counter,
  todo,
  menu,
  home
});
