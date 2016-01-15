import Express from 'express';
import { encrypt, decrypt } from './crypto';

const router = Express.Router();

router.post('/user', function (req, res) {
  const auth = req.body.auth;
  res.send(decrypt(auth));
});

router.post('/login', function (req, res) {
  const username = req.body.username;
  res.send(encrypt(username));
});

router.post('/logout', function (req, res) {
  const auth = req.body.auth;
  res.send(decrypt(auth));
});

export default router;
