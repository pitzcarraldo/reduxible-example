import { Provider } from 'reduxible';

export default class CookieProvider extends Provider {
  static CLIENT_INSTANCE = require('cookie-dough')();

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
    return CookieProvider.CLIENT_INSTANCE;
  }
}
