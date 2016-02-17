import CookieDough from 'cookie-dough';

export default class CookieClient {
  constructor(req) {
    if (req) {
      return new CookieDough(req);
    }
    /* eslint-disable new-cap */
    return CookieDough();
  }
}
