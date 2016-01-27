import axios from 'axios';

export default class HttpClient {
  constructor(req) {
    ['get', 'post', 'put', 'patch', 'delete'].forEach(
      (method) => {
        this[method] = (url, options) => {
          const request = {};

          request.url = url;
          request.method = method;
          request.timeout = 1000;

          if (options && options.headers) {
            request.headers = {...options.headers};
          }

          if (req && req.get('cookie')) {
            request.headers = request.headers || {};
            request.headers.cookie = req.get('cookie');
          }

          if (options && options.data) {
            request.data = options.data;
          }

          return axios(request);
        };
      });
  }
}
