import React from 'react';
import { Router, RoutingContext, match } from 'react-router'
import { Provider } from 'react-redux';
import { syncReduxAndRouter } from 'redux-simple-router';
import DevTools from './DevTools';

export default class ReduxibleRouter {
  constructor(routes, store, history) {
    this.routes = routes;
    this.store = store;
    this.history = history;
    syncReduxAndRouter(this.history, this.store);
  }

  createRouter() {
    return <Router history={this.history} routes={this.routes}/>;
  }

  render() {
    return this.getComponent(this.createRouter());
  }

  renderDevTools() {
    const router = this.createRouter();
    return this.getComponent(
      <div>
        {router}
        <DevTools/>
      </div>
    );
  }

  route(location, callback) {
    match({routes: this.routes, location}, (error, redirectLocation, renderProps) => {
      if (error) {
        return callback(error);
      } else if (redirectLocation) {
        return callback(null, redirectLocation);
      } else if (renderProps) {
        return callback(null, null, this.getComponent(<RoutingContext {...renderProps} />));
      } else {
        return callback();
      }
    });
  }

  getComponent(children) {
    return (
      <Provider store={this.store} key="provider">
        {children}
      </Provider>
    )
  }
}
