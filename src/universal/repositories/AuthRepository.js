import Repository from './Repository';

class AuthRepository extends Repository {
  constructor(options) {
    super(options);
    this.namespace = 'auth';
  }

  login(username) {
    return this.client.post(this.api() + '/login', { data: { username } });
  }

  logout(auth) {
    return this.client.delete(this.api() + '/logout', { data: auth });
  }
}
export default Repository.getInstance(AuthRepository);