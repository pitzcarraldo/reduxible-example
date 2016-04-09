export default {
  name: '$cookie',
  $get({ getState }) {
    const { context: { req } } = getState();
    if (req) {
      const Cookies = require('cookie-dough');
      return new Cookies(req);
    }
    return require('cookie-dough')();
  }
};
