import Repository from './Repository';
class TodoRepository extends Repository {
  constructor(options) {
    super(options);
    this.namespace = 'todos';
  }

  save(...todos) {
    return this.client.post(this.api(), {
      data: {todos}
    });
  }

  remove(index) {
    return this.client.delete(this.api() + `/${index}`);
  }
}
export default Repository.getInstance(TodoRepository);