import Express from 'express';
import { encrypt, decrypt } from './crypto';

const router = Express.Router(); //eslint-disable-line

router.post('/user', (req, res) => {
  const auth = req.body.auth;
  const user = decrypt(auth);
  res.send(user);
});

router.post('/login', (req, res) => {
  const username = req.body.username;
  res.send(encrypt(username));
});

router.post('/logout', (req, res) => {
  const auth = req.body.auth;
  res.send(decrypt(auth));
});

export default router;
