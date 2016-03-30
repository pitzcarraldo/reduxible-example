import React, { PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';

export default function Nav({ active, toggleMenu, user }) {
  return (
    <div>
      <a href="#menu" id="menuLink" className={`menu-link ${active}`} onClick={toggleMenu}>
        <span />
      </a>
      <div id="menu" className={active}>
        <div className="pure-menu">
          <IndexLink className="pure-menu-heading" to="/">Reduxible</IndexLink>
          <ul className="pure-menu-list">
            {!user &&
            <li>
              <Link className="pure-menu-item pure-menu-link" to="login">
                Login
              </Link>
            </li>
            }
            {user &&
            <li>
              <Link className="pure-menu-item pure-menu-link" to="profile">
                Profile
              </Link>
            </li>
            }
            <li>
              <Link className="pure-menu-item pure-menu-link" to="todo">
                Todo
              </Link>
            </li>
            <li>
              <Link className="pure-menu-item pure-menu-link" to="counter">
                Counter
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

Nav.propTypes = {
  active: PropTypes.string,
  toggleMenu: PropTypes.func,
  user: PropTypes.object
};
