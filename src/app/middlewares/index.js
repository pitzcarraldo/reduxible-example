import providerMiddleware from 'redux-provider-middleware';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import providers from '../providers/index';

export default [
  providerMiddleware(...providers),
  thunk,
  promiseMiddleware()
];
