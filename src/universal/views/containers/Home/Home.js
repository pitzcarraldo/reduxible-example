import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    const lake = require('./imgs/lake.jpg');
    const mountain = require('./imgs/mountain.jpg');
    const tshirts = require('./imgs/t-shirt.jpg');
    const train = require('./imgs/train.jpg');
    return (
      <div className="content">
        <h2 className="content-subhead">How to Reduxible</h2>
        <p>
          Blah Blah
        </p>

        <h2 className="content-subhead">What is the React?</h2>
          <p>
            React is Awesome!
          </p>

          <div className="pure-g">
            <div className="pure-u-1-4">
              <img className="pure-img-responsive" src={lake} alt="Peyto Lake" />
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
          <h2 className="content-subhead">Redux?</h2>
          <p>Redux is awesome too!</p>
      </div>);
  }
}
