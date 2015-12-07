import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="legal pure-g">
          <div className="pure-u-1 u-sm-1-2">
            <p className="legal-license">
              This site is built with using Reduxible
              <br/>
              All code on this site is licensed under the
              <a href="https://raw.githubusercontent.com/Pitzcarraldo/reduxible/master/LICENSE">MIT License</a>
              unless otherwise stated.
            </p>
          </div>

          <div className="pure-u-1 u-sm-1-2">
            <a href="https://github.com/Pitzcarraldo/reduxible-example">GitHub Project</a>
            <p className="legal-copyright">
              © 2015 Minkyu Cho. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  }
}
