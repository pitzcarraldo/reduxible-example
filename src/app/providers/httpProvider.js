import axios from 'axios';
import config from '../../config/index';

function getBaseUrl() {
  const protocol = config.server.current ? 'http:' : '';
  const port = config.api.port ? `:${config.api.port}` : '';
  const apiServer = config.server.current ? `${protocol}//${config.api.host}${port}` : '';
  return `${apiServer}/api`;
}

const BASE_URL = getBaseUrl();

export class HttpClient {
  constructor(req) {
    this.defaultConfig = {};
    this.defaultConfig.baseURL = BASE_URL;
    if (req && req.get && req.get('cookie')) {
      this.defaultConfig.headers = {};
      this.defaultConfig.headers.cookie = req.get('cookie');
    }
  }
  request(requestConfig) {
    return axios({ ...this.defaultConfig, ...requestConfig });
  }
}

const HTTP_CLIENT = new HttpClient();

export default {
  name: '$http',
  $get({ getState }) {
    const { context: { req } } = getState();
    return req ? new HttpClient(req) : HTTP_CLIENT;
  }
};
