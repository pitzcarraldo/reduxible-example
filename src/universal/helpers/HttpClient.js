import 'universal-fetch';

export default class HttpClient {
  constructor(req) {
    ['get', 'post', 'put', 'patch', 'delete'].forEach(
      (method) => {
        this[method] = (url, options) => {
          const request = {};

          request.method = method;
          request.timeout = 5000;

          if (options && options.headers) {
            request.headers = {...options.headers};
          }

          if (req && req.get('cookie')) {
            request.headers = request.headers || {};
            request.headers.cookie = req.get('cookie');
          }

          if (options && options.data) {
            request.headers = {
              ...request.headers,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            };
            request.body = JSON.stringify(options.data);
          }

          return fetch(url, request);
        };
      });
  }
}
