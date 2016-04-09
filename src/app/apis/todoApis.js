export default {
  findAll: () => ({
    url: '/todos'
  }),
  save: todos => ({
    url: '/todos',
    method: 'post',
    data: { todos }
  }),
  remove: id => ({
    url: `/todos/${id}`,
    method: 'delete'
  })
};

