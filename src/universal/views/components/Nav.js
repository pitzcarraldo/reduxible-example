import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Nav extends Component {
  toggleMenu() {
    //(function (window, document) {
    //
    //  var layout   = document.getElementById('layout'),
    //    menu     = document.getElementById('menu'),
    //    menuLink = document.getElementById('menuLink');
    //
    //  function toggleClass(element, className) {
    //    var classes = element.className.split(/\s+/),
    //      length = classes.length,
    //      i = 0;
    //
    //    for(; i < length; i++) {
    //      if (classes[i] === className) {
    //        classes.splice(i, 1);
    //        break;
    //      }
    //    }
    //    // The className is not found
    //    if (length === classes.length) {
    //      classes.push(className);
    //    }
    //
    //    element.className = classes.join(' ');
    //  }
    //
    //  menuLink.onclick = function (e) {
    //    var active = 'active';
    //
    //    e.preventDefault();
    //    toggleClass(layout, active);
    //    toggleClass(menu, active);
    //    toggleClass(menuLink, active);
    //  };
    //
    //}(this, this.document));
  }


  render() {
    return (
      <div>
        <a href="#menu" id="menuLink" className="menu-link">
          <span></span>
        </a>
        <div id="menu">
          <div className="pure-menu">
            <Link className="pure-menu-heading" to="/">Reduxible</Link>
            <ul className="pure-menu-list">
              <li className="pure-menu-item">
                <Link className="pure-menu-link" to="/">Home</Link>
              </li>
              <li className="pure-menu-item menu-item-divided pure-menu-selected">
                <Link className="pure-menu-link" to="counter">Counter</Link>
              </li>
              <li className="pure-menu-item">
                <Link className="pure-menu-link" to="about">About</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
