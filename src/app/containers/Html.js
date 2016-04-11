import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';

export default function Html({ component, store = {}, isomorphic }) {
  const polyfills = `<!--[if lte IE 8]>
<script src="//pitzcarraldo.github.io/react-polyfill/react-polyfill.min.js" charSet="UTF-8">
</script>
<![endif]-->`;
  const state = store && store.getState && store.getState();
  const assets = isomorphic.assets();
  const content = component ? ReactDOM.renderToString(component) : '';
  return (
    <html>
    <head>
      <title>Reduxible Example</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
      {assets.styles.app && <link href={assets.styles.app} rel="stylesheet" charSet="UTF-8" />}
      <meta name="polyfills" dangerouslySetInnerHTML={{ __html: polyfills }} />
      <link rel="shortcut icon" href="/favicon.ico" />
    </head>
    <body>
    <div id="content" dangerouslySetInnerHTML={{ __html: content }}></div>
    <script
      dangerouslySetInnerHTML={{ __html: `window.__state=${serialize(state)};` }}
      charSet="UTF-8"
    ></script>
    {assets.javascript.app && <script src={assets.javascript.app} charSet="UTF-8"></script>}
    </body>
    </html>
  );
}

Html.propTypes = {
  component: PropTypes.node,
  store: PropTypes.object,
  isomorphic: PropTypes.object
};
