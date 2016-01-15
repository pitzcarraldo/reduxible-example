import config from './../../../config/index';

export default class Repository {
  constructor(options) {
    this.apiServer = `${config.api.host}:${config.api.port}`;
    this.client = options.client;
  }

  withClient(client) {
    if (this.client !== client) {
      this.client = client;
    }
    return this;
  };

  api() {
    return `http://${this.apiServer}/api/${this.namespace}`;
  }

  secureApi() {
    return `https://${this.apiServer}/api/${this.namespace}`;
  }

  static getInstance = Repository => client => {
    if (!Repository.INSTANCE) {
      Repository.INSTANCE = new Repository({ client });
    }
    return Repository.INSTANCE.withClient(client);
  };
}