import providers from '../providers/index';
import { providerMiddleware } from 'reduxible';

export default [
  providerMiddleware(...providers)
];
