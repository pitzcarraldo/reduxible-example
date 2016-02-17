import config from '../../config/index';

export default class Repository {
  constructor(options) {
    this.protocol = config.server.current ? 'http:' : '';
    this.port = config.api.port ? ':' + config.api.port : '';
    this.apiServer = config.server.current ? `${this.protocol}//${config.api.host}${this.port}` : '';
    this.client = options.client;
  }

  withClient(client) {
    if (this.client !== client) {
      this.client = client;
    }
    return this;
  }

  api() {
    return `${this.apiServer}/api/${this.namespace}`;
  }

  /* eslint-disable no-shadow */
  static getInstance = Repository => client => {
    if (!Repository.INSTANCE) {
      Repository.INSTANCE = new Repository({ client });
    }
    return Repository.INSTANCE.withClient(client);
  };
}
