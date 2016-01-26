import development from './development';
import production from './production';
import heroku from './heroku';
const configs = {
  development,
  production,
  heroku
};
const env = process.env.NODE_ENV || 'development';
export default Object.assign({ env }, configs[env]);
