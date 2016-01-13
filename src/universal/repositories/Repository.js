import config from './../../../config/index';

export default class Repository {
  constructor(options) {
    this.api = `${config.api.host}:${config.api.port}`;
    this.http = options.http;
  }

  getApi() {
    return 'http://' + this.api;
  }

  getSecureApi() {
    return 'https://' + this.api;
  }
}