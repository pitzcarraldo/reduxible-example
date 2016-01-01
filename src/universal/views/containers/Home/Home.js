import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    const lake = require('./imgs/lake.jpg');
    const mountain = require('./imgs/mountain.jpg');
    const tshirts = require('./imgs/t-shirt.jpg');
    const train = require('./imgs/train.jpg');
    return (
      <div className="content">
        <h2 className="content-subhead">Why Reduxible?</h2>
        <p>
          React, Redux and other related things are already good enough to use directly. But some people (like me) only want to focus to application codes and don't want to spend time for make and sustain project base. So I wrapped base elements for React + Redux Application. If you use Reduxible, you only have to make and set Router, Middleware, Reducers and React Components to Reduxible. When then, you can run React + Redux App immediately. Also, it can be Universal App or Single Page App by config.
        </p>

        <h2 className="content-subhead">Loot at this first</h2>
        <ul>
          <li><a href="https://facebook.github.io/react">React</a></li>
          <li><a href="https://github.com/rackt/react-router">React-Router</a></li>
          <li><a href="https://github.com/rackt/redux">Redux</a></li>
          <li><a href="https://github.com/rackt/react-redux">React-Redux</a></li>
          <li><a href="https://github.com/rackt/redux-simple-router">Redux-Simple-Router</a></li>
          <li><a href="https://github.com/gaearon/redux-devtools">Redux-DevTools</a></li>
        </ul>

        <h2 className="content-subhead">Webpack Isomorphic Image Loader Samples</h2>
        <div className="pure-g">
          <div className="pure-u-1-4">
            <img className="pure-img-responsive" src={lake} alt="Peyto Lake"/>
          </div>
          <div className="pure-u-1-4">
            <img className="pure-img-responsive" src={train} alt="Train"/>
          </div>
          <div className="pure-u-1-4">
            <img className="pure-img-responsive" src={tshirts} alt="T-Shirt Store"/>
          </div>
          <div className="pure-u-1-4">
            <img className="pure-img-responsive" src={mountain} alt="Mountain"/>
          </div>
        </div>
      </div>);
  }
}
