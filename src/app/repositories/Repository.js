import config from '../../config/index';
import HttpProvider from '../providers/HttpProvider';

export default class Repository {
  constructor(options = {}) {
    this.protocol = config.server.current ? 'http:' : '';
    this.port = config.api.port ? ':' + config.api.port : '';
    this.apiServer = config.server.current ? `${this.protocol}//${config.api.host}${this.port}` : '';
    this.client = options.client || HttpProvider.CLIENT_INSTANCE;
  }

  with(client) {
    if (this.client !== client) {
      this.client = client;
    }
    return this;
  }

  api() {
    return `${this.apiServer}/api/${this.namespace}`;
  }
}
