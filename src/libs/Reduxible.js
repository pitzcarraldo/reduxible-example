import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import ReduxibleRouter from './ReduxibleRouter';
import StoreFactory from './StoreFactory';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import createMemoryHistory from 'history/lib/createMemoryHistory';

export default class Reduxible {
  constructor(options = {}) {
    this.config = options.config;
    this.container = options.container;
    this.routes = options.routes;
    this.storeFactory = new StoreFactory({...options});
  }

  server() {
    const store = this.storeFactory.createStore();
    const history = createMemoryHistory();
    const router = new ReduxibleRouter(this.routes, store, history);
    return (req, res) => {
      router.route(req.originalUrl, (error, redirectLocation, component)=> {
        if (error) {
          return res.status(500).end();
        } else if (redirectLocation) {
          return res.redirect(redirectLocation.pathname);
        } else {
          return res.send(this.render(component, store));
        }
      });
    };
  }

  render(component, store) {
    const Html = this.container;
    return '<!doctype html>\n' + ReactDOMServer.renderToString(<Html component={component} store={store}/>);
  }

  client(dest) {
    const store = this.storeFactory.createStore(window.__state);
    const history = createBrowserHistory();
    const router = new ReduxibleRouter(this.routes, store, history).createRouter();

    ReactDOM.render(router, dest);
  }
}
