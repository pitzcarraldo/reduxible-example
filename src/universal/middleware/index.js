import thunk from 'redux-thunk';
import helperMiddleware from './helperMiddleware';

export default [
  thunk,
  helperMiddleware()
];
