import providers from '../providers/index';
import providerMiddleware from './providerMiddleware';

export default [
  providerMiddleware(...providers)
];
