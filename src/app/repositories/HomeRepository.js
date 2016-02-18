import Repository from './Repository';

export default class HomeRepository extends Repository {
  constructor(options) {
    super(options);
    this.namespace = 'home';
  }

  findAll() {
    return this.client.get(this.api());
  }
}

export const homeRepository = new HomeRepository();
