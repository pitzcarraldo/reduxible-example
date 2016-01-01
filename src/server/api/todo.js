import Express from 'express';

const router = Express.Router();

const todo = [];

router.get('/', function (req, res) {
  res.send(todo);
});

router.post('/', function (req, res) {
  if (req.body) {
    todo.push(req.body);
  }
  res.send(todo);
});

router.delete('/:index', function (req, res) {
  const deleteIndex = req.params.index;
  if (deleteIndex > -1) {
    todo.splice(deleteIndex, 1);
  }
  res.send(todo);
});

export default router;
