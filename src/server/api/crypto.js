import crypto from 'crypto';
const ALGORITHM = 'aes-256-ctr';
const PASSWORD = 'd6F3Efeq';

export function encrypt(text) {
  const cipher = crypto.createCipher(ALGORITHM, PASSWORD);
  return cipher.update(text,'utf8','hex') + cipher.final('hex');
}

export function decrypt(text) {
  const decipher = crypto.createDecipher(ALGORITHM, PASSWORD);
  return decipher.update(text,'hex','utf8') + decipher.final('utf8');
}