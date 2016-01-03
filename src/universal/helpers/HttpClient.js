const axios = require('axios');

export default class HttpClient {
  constructor(req) {
    ['get', 'post', 'put', 'patch', 'delete'].forEach(
      (method) => {
        this[method] = (url, options) => {
          const request = {};

          request.url = url;
          request.method = method;

          if (options && options.data) {
            request.data = options.data;
          }

          if (options && options.params) {
            request.params = options.params;
          }

          if (options && options.headers) {
            request.headers = { ...options.headers };
          }

          if (req && req.get('cookie')) {
            request.headers = request.headers || {};
            request.headers.cookie = req.get('cookie');
          }

          return axios(request);
        };
      });
  }
}
