export default class CookieClient {
  constructor(req) {
    if (req) {
      const CookieDough = require('cookie-dough/index');
      return new CookieDough(req);
    }
    const CookieDough = require('cookie-dough/browser');
    return CookieDough();
  }
}
