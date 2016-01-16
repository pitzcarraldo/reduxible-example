import Express from 'express';

const router = Express.Router();

const todos = {};

router.get('/', function (req, res) {
  res.send(todos);
});

router.post('/', function (req, res) {
  if (req.body && req.body.todos) {
    Object.keys(req.body.todos).forEach((id)=> {
      todos[id] = { ...todos[id], ...req.body.todos[id] };
    })
  }
  res.send(todos);
});

router.delete('/:id', function (req, res) {
  const id = req.params.id;
  if (todos[id]) {
    todos[id] = undefined;
  }
  res.send(todos);
});

export default router;
