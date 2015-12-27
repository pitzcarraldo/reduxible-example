import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';

export default class Nav extends Component {
  static propTypes = {
    active: PropTypes.string,
    toggleMenu: PropTypes.func
  };

  render() {
    const { active, toggleMenu } = this.props;
    return (
      <div>
        <a href="#menu" id="menuLink" className={`menu-link ${active}`} onClick={toggleMenu}>
          <span></span>
        </a>
        <div id="menu" className={active}>
          <div className="pure-menu">
            <IndexLink className="pure-menu-heading" to="/">Reduxible</IndexLink>
            <ul className="pure-menu-list">
              <li>
                <IndexLink className="pure-menu-item pure-menu-link" activeClassName="pure-menu-selected" to="/">
                  Home
                </IndexLink>
              </li>
              <li>
                <Link className="pure-menu-item pure-menu-link" activeClassName="pure-menu-selected" to="counter">
                  Counter
                </Link>
              </li>
              <li>
                <Link className="pure-menu-item pure-menu-link" activeClassName="pure-menu-selected" to="about">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
