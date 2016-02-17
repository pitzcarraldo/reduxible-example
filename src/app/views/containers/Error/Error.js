import React, { Component, PropTypes } from 'react';
import { Header, Footer } from '../../components/index';

export default class Error extends Component {
  static propTypes = {
    error: PropTypes.object,
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
    const { error, isomorphic } = this.props;
    const assets = isomorphic.assets();
    return (
      <html>
      <head>
        <title>Reduxible Example</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=Edge"/>
        {assets.styles.app && <link href={assets.styles.app} rel="stylesheet" charSet="UTF-8"/>}
        <meta name="polyfills" dangerouslySetInnerHTML={{ __html: this.polyfills(assets) }}/>
        <link rel="shortcut icon" href="/favicon.ico"/>
      </head>
      <body>
      <Header />
      <div>{error.stack}</div>
      <div id="content"></div>
      <Footer />
      {assets.javascript.app && <script src={assets.javascript.app} charSet="UTF-8"></script>}
      </body>
      </html>
    );
  }
}
