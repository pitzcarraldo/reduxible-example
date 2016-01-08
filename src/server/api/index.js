import Express from 'express';
import bodyParser from 'body-parser';
import cookieParser  from 'cookie-parser';
import config from '../../../config/index';
import home from './home';
import todos from './todos';

const api = new Express();

api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());
api.use(cookieParser());
api.use((req, res, next)=> {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

api.use('/home', home);
api.use('/todos', todos);

const server = api.listen(config.api.port, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log('API listening at http://%s:%s', host, port);
});
