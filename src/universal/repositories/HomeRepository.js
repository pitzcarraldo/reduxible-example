import Repository from './Repository';

class HomeRepository extends Repository {
  constructor(options) {
    super(options);
    this.namespace = 'home';
  }

  findAll() {
    return this.client.get(this.api());
  }
}
export default Repository.getInstance(HomeRepository);