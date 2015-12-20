import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';

export default class Html extends Component {
  static propTypes = {
    component: PropTypes.node,
    store: PropTypes.object,
    isomorphic: PropTypes.object
  };

  render() {
    const { component, store, isomorphic } = this.props;
    const assets = isomorphic.assets();
    const content = component ? ReactDOM.renderToString(component) : '';
    return (
      <html lang="en-us">
        <head>
          <link rel="shortcut icon" href="/favicon.ico"/>
          {
            Object.keys(assets.styles).map((style, key) =>
              <link href={assets.styles[style]} key={ key } media="screen, projection" rel="stylesheet" type="text/css" charSet="UTF-8"/>)
          }
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{ __html: content }}/>
          <script dangerouslySetInnerHTML={{  __html: `window.__state=${ serialize(store.getState()) };` }} charSet="UTF-8"/>
          <script src={ assets.javascript.main } charSet="UTF-8"/>
        </body>
      </html>
    );
  }
}
