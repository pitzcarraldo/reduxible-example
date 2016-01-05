import cookie from 'component-cookie';

export default class CookieManager {
  constructor(req) {
    if (req && req.cookies) {
      this.cookies = req.cookies;
      this.cookie = req.res.cookie;
    } else {
      this.cookie = cookie;
    }
  }

  get(name) {
    if (this.cookies) {
      return this.cookies[name];
    }
    return this.cookie(name);
  }

  set(name, value, option) {
    return this.cookie(name, value, option);
  }

  static INSTANCE;

  static getInstance(req){
    if(!CookieManager.INSTANCE) {
      CookieManager.INSTANCE = new CookieManager(req);
    }
    return CookieManager.INSTANCE;
  }
}
