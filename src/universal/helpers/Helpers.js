import HttpClient from './HttpClient';
import CookieClient from './CookieClient';

export default class Helpers {
  static INSTANCES = {
    http: new HttpClient(),
    cookie: new CookieClient()
  };

  static getInstances(req) {
    return {
      http: new HttpClient(req),
      cookie: new CookieClient(req)
    }
  }

  static getHelpers(req) {
    if (req) {
      return Helpers.getInstances(req);
    }
    return Helpers.INSTANCES;
  }
}