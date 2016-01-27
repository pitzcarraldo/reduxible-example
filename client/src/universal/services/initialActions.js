import { action as homeAction } from './homeService';
import { action as authAction } from './authService';
export default [homeAction('LOAD_CONTENT')(), authAction('LOAD_AUTH')()];
