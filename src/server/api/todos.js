import Express from 'express';

const router = Express.Router();

const todos = [];

router.get('/', function (req, res) {
  res.send(todos);
});

router.post('/', function (req, res) {
  if (req.body && req.body.todo) {
    todos.push(req.body.todo);
  }
  res.send(todos);
});

router.delete('/:index', function (req, res) {
  const deleteIndex = req.params.index;
  if (deleteIndex > -1) {
    todos.splice(deleteIndex, 1);
  }
  res.send(todos);
});

export default router;
