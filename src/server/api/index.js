import Express from 'express';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import cookieParser  from 'cookie-parser';
import auth from './auth';
import home from './home';
import todos from './todos';

const api = Express.Router();

api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());
api.use(cookieParser());
api.use(cookieSession({
  keys: ['key']
}));
api.use((req, res, next)=> {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

api.use('/auth', auth);
api.use('/home', home);
api.use('/todos', todos);

export default api;