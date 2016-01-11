import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { action } from '../../../services/auth';

@connect(state=>({
  user: state.auth.user
}), {
  logout: action('LOGOUT')
})
export default class Logout extends Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func.isRequired
  };

  handleLogout(e) {
    const { logout } = this.props;
    logout();
  }

  render() {
    const { user } = this.props;
    return (
      <div className="content">
        <h2 className="content-subhead">Logout</h2>
        <div className="pure-form">
          <h3>Hi {user.username}</h3>
          <button className="pure-button-primary" onClick={::this.handleLogout}>Logout</button>
        </div>
      </div>
    );
  }
}
