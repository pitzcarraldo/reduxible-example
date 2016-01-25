import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';

export default class Html extends Component {
  static propTypes = {
    component: PropTypes.node,
    store: PropTypes.object,
    isomorphic: PropTypes.object
  };

  polyfills = (assets) => {
    return `
    <!--[if lte IE 8]>
    <script src="${assets.javascript.polyfills}" charSet="UTF-8"></script>
    <![endif]-->
    `.trim();
  };

  render() {
    const { component, store, isomorphic } = this.props;
    const state = store && store.getState() || {};
    const assets = isomorphic.assets();
    const content = component ? ReactDOM.renderToString(component) : '';
    return (
      <html>
      <head>
        <title>Reduxible Example</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
        {assets.styles.app && <link href={assets.styles.app} rel="stylesheet" charSet="UTF-8"/>}
        <meta name="polyfills" dangerouslySetInnerHTML={{ __html: this.polyfills(assets) }} />
        <link rel="shortcut icon" href="/favicon.ico"/>
      </head>
      <body>
      <div id="content" dangerouslySetInnerHTML={{ __html: content }}></div>
      <script dangerouslySetInnerHTML={{  __html: `window.__state=${ serialize(state) };` }} charSet="UTF-8">
      </script>
      {assets.javascript.app && <script src={assets.javascript.app} charSet="UTF-8"></script>}
      </body>
      </html>
    );
  }
}
