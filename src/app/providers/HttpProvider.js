import axios from 'axios';
import { Provider } from 'reduxible';

export class HttpClient {
  constructor(req) {
    ['get', 'post', 'put', 'patch', 'delete'].forEach(
      method => this[method] = (url, config = {}) => {
        config.method = method;
        if (req && req.get && req.get('cookie')) {
          config.headers = config.headers || {};
          config.headers.cookie = req.get('cookie');
        }
        return axios(url, config);
      }
    );
  }
}

export default class HttpProvider extends Provider {
  static CLIENT_INSTANCE = new HttpClient();

  constructor() {
    super();
    this.name = '$http';
  }

  $get(context = {}) {
    const { req } = context;
    if (req) {
      return new HttpClient(req);
    }
    return HttpProvider.CLIENT_INSTANCE;
  }
}
