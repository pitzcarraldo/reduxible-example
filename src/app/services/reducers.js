import { combineReduxibleReducers } from 'reduxible';
import auth from './authService';
import counter from './counterService';
import todo from './todoService';
import menu from './menuService';
import home from './homeService';
import ga from './gaService';

export default combineReduxibleReducers({
  auth,
  counter,
  todo,
  menu,
  home,
  ga
});
