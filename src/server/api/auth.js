import Express from 'express';

const router = Express.Router();

router.post('/login', function (req, res) {
  const user = {
    name: req.body.username
  };
  res.send(user);
});

router.post('/logout', function (req, res) {
  res.send(req.body.username);
});

export default router;
