import Provider from './Provider';

export default class CookieProvider extends Provider {
  constructor() {
    super();
    this.name = '$cookies';
  }

  $get(context = {}) {
    const {req} = context;
    if (req) {
      const Cookies = require('cookie-dough');
      return new Cookies(req);
    }
    return require('cookie-dough')();
  }
}
