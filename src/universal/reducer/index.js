import auth from './auth';
import info from './info';
import widgets from './widgets';

export default {
  auth,
  info,
  widgets
};

export function getPath() {
  return __dirname;
}