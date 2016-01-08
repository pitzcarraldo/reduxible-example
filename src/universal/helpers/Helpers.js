import HttpClient from './HttpClient';
import CookieClient from './CookieClient';

export default class Helpers {
  constructor(req) {
    if(req) {
      this.req = req;
    }
  }

  static helpers = {
    http: HttpClient,
    cookie: CookieClient
  };

  get(name) {
    return new Helpers.helpers[name](this.req);
  }
}