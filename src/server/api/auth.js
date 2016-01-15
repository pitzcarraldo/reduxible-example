import Express from 'express';
import { encrypt, decrypt } from './crypto';

const router = Express.Router();

const userAuth = {};

router.post('/login', function (req, res) {
  const user = req.body.username;
  const auth = encrypt(user);
  if(userAuth[auth]) {
    throw new Error('Already Exist User');
  }
  userAuth[auth] = user;
  res.send(auth);
});

router.delete('/logout', function (req, res) {
  const auth = req.body.auth;
  const user = userAuth[auth];
  if (user) {
    res.send(user);
    userAuth[auth] = null;
  } else {
    res.send(null);
  }
});

export default router;
