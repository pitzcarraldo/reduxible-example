import Repository from './Repository';

class AuthRepository extends Repository {
  constructor(options) {
    super(options);
    this.namespace = 'auth';
  }

  findUserByAuth(auth) {
    return this.client.post(this.api() + '/user', { data: { auth } });
  }

  login(username) {
    return this.client.post(this.api() + '/login', { data: { username } });
  }

  logout(auth) {
    return this.client.post(this.api() + '/logout', { data: { auth } });
  }
}
export default Repository.getInstance(AuthRepository);
