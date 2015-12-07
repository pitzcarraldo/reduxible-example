import React, { Component } from 'react';

export default class Home extends Component {
  render() {
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
              <img className="pure-img-responsive" src="http://farm3.staticflickr.com/2875/9069037713_1752f5daeb.jpg" alt="Peyto Lake" />
            </div>
            <div className="pure-u-1-4">
              <img className="pure-img-responsive" src="http://farm3.staticflickr.com/2813/9069585985_80da8db54f.jpg" alt="Train"/>
            </div>
            <div className="pure-u-1-4">
              <img className="pure-img-responsive" src="http://farm6.staticflickr.com/5456/9121446012_c1640e42d0.jpg" alt="T-Shirt Store"/>
            </div>
            <div className="pure-u-1-4">
              <img className="pure-img-responsive" src="http://farm8.staticflickr.com/7357/9086701425_fda3024927.jpg" alt="Mountain"/>
            </div>
          </div>
          <h2 className="content-subhead">Redux?</h2>
          <p>Redux is awesome too!</p>
      </div>);
  }
}
