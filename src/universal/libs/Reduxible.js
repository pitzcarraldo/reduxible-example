import React from 'react';
import Location from 'react-router/lib/Location';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import ReduxibleRouter from './ReduxibleRouter';
import StoreFactory from './StoreFactory';

export default class Reduxible {
  constructor(options = {}) {
    this.config = options.config;
    this.contanier = options.contanier;
    this.routes = options.routes;
    this.storeFactory = new StoreFactory({
      config: this.config,
      apiHost: options.apiHost
    });
  }

  serverRender(req, res) {
    const location = new Location(req.path, req.query);
    const store = this.storeFactory.getStore(req);
    const routes = this.routes(store);
    const router = new ReduxibleRouter(routes);
    const Html = this.baseMarkup;

    if (this.isDevelopment) {
      // Do not cache webpack stats: the script file would change since
      // hot module replacement is enabled in the development env
      webpackIsomorphicTools.refresh();
    }

    if (this.disableSSR) {
      const html = React.renderToString(
        <Html assets={webpackIsomorphicTools.assets()} component={<div/>} store={store}/>);
      res.send('<!doctype html>\n' + html);
      return;
    }

    router.route(location, undefined, store)
      .then(({component, transition, isRedirect}) => {
        if (isRedirect) {
          res.redirect(transition.redirectInfo.pathname);
          return;
        }
        const html = React.renderToString(
          <Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>);
        res.send('<!doctype html>\n' + html);
      })
      .catch((error) => {
        if (error.redirect) {
          res.redirect(error.redirect);
          return;
        }
        console.error('ROUTER ERROR:', error.stack);
        res.status(500).send({error: error.stack});
      });
  }

  clientRender(path, query, dest) {
    const location = new Location(path, query);
    const history = new BrowserHistory();
    const store = this.storeFactory.getStore(null, window.__data);
    const routes = this.routes(store);
    const router = new ReduxibleRouter(routes);

    router.route(location, history, store)
      .then(({component}) => {
        const renderTargetComponent =
          this.useDevTools ? this.attachDevTools(component, store) : component;

        React.render(renderTargetComponent, dest);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  attachDevTools(component, store) {
    const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
    console.info(`You will see a "Warning: React attempted to reuse markup in a container but the checksum was invalid." message. That's because the redux-devtools are enabled.`);
    return (
      <div>
        {component} <DebugPanel top right bottom key="debugPanel"> <DevTools store={store} monitor={LogMonitor}/>
      </DebugPanel>
      </div>
    );
  }
}
