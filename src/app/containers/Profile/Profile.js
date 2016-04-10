import React, { Component, PropTypes } from 'react';
import connector from './Profile.connector';
import requireAuth from '../../decorators/requireAuth';

@connector
@requireAuth
export default class Profile extends Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func.isRequired
  };

  handleLogout = () => {
    this.props.logout();
  };

  render() {
    const { user } = this.props;
    const username = (user && user.username) || '';
    return (
      <div className="content">
        <div className="pure-g-valign-fix">
          <h1>Profile</h1>
          <h2>Hi {username}!</h2>
          <div className="pure-form">
            <button className="pure-button-primary" onClick={this.handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    );
  }
}
