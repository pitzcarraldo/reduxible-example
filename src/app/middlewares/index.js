import providers from '../providers/index';
import providerMiddleware from 'redux-provider-middleware';

export default [
  providerMiddleware(...providers)
];
