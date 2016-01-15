import React, { Component, PropTypes } from 'react';
import requireAuth from '../../decorators/requireAuth';
import { connect } from 'react-redux';
import { action as authAction } from '../../../services/auth';


@connect(
  state =>
    ({
      user: state.auth.user
    }),
  {
    logout: authAction('LOGOUT')
  }
)
@requireAuth
export default class Profile extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  handleLogout = (e) => {
    this.props.logout();
  };

  render() {
    const { user } = this.props;
    const username = (user && user.username) || '';
    return (
      <div className="content">
        <h1>Profile</h1>
        <h2>Hi {username}!</h2>
        <div className="pure-form">
          <button className="pure-button-primary" onClick={this.handleLogout}>Logout</button>
        </div>
      </div>
    );
  }
}
