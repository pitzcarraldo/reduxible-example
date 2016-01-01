import Express from 'express';
import bodyParser from 'body-parser';
import config from '../../../config/index';
import todo from './todo';

const api = new Express();

api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());
api.use('/todo', todo);

const server = api.listen(config.api.port, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log('API listening at http://%s:%s', host, port);
});
