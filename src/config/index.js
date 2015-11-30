import development from './development';
import production from './production';
const configs = {
  development,
  production
};
const env = process.NODE_ENV || 'development';
export default Object.assign({env}, configs[env]);