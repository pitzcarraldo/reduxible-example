import CookieDough from 'cookie-dough';

export default class CookieClient {
  constructor(req) {
    if(req) {
      return new CookieDough(req);
    }
    return CookieDough();
  }
}
