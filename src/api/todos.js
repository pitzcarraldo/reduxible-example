import Express from 'express';

const router = Express.Router(); //eslint-disable-line

const todos = {};

router.get('/', (req, res) => {
  res.send(todos);
});

router.post('/', (req, res) => {
  if (req.body && req.body.todos) {
    Object.keys(req.body.todos).forEach((id) => {
      todos[id] = { ...todos[id], ...req.body.todos[id] };
    });
  }
  res.send(todos);
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  if (todos[id]) {
    todos[id] = undefined;
  }
  res.send(todos);
});

export default router;
