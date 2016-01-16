import Repository from './Repository';
class TodoRepository extends Repository {
  constructor(options) {
    super(options);
    this.namespace = 'todos';
  }

  findAll() {
    return this.client.get(this.api());
  }

  save(todos) {
    return this.client.post(this.api(), {
      data: {todos}
    });
  }

  remove(id) {
    return this.client.delete(this.api() + `/${id}`);
  }
}
export default Repository.getInstance(TodoRepository);