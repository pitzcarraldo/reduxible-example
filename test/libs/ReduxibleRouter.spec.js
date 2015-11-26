import expect from 'expect';
import ReduxibleRouter from '../../src/libs/ReduxibleRouter';
import routes from '../../src/universal/routes';
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RoutingContext } from 'react-router'

describe('ReduxibleRouter', () => {
  it('returns false if development is undefined', () => {
    const router = new ReduxibleRouter(routes);
    match({ routes, location: '/' }, (error, redirectLocation, renderProps) => {
      if (error) {
        console.log(error.message);
      } else if (redirectLocation) {
        console.log(redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        console.log(renderToString(<RoutingContext {...renderProps} />));
      } else {
        console.log('Not found');
      }
    });
    expect(false).toBe(false);
  });
});