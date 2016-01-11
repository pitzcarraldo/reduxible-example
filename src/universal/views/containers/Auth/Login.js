import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { action } from '../../../services/auth';
import { pushPath } from 'redux-simple-router';

@connect(
  state => ({
    user: state.auth.user
  }),
  {
    loadAuth: action('LOAD_AUTH'),
    login: action('LOGIN'),
    pushPath: pushPath
  })
export default class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired
  };

  state = {
    username: ''
  };

  componentWillMount() {
    const { user } = this.props;
    if (user) {
      pushPath('/logout');
    }
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    console.log(user);
    if (user) {
      pushPath('/logout');
    }
  }

  handleUserName(e) {
    this.setState({username: e.target.value});
  }

  handleLogin(e) {
    const { login } = this.props;
    login(this.state.username);
  }

  render() {
    const { username } = this.state;
    return (
      <div className="content">
        <h2 className="content-subhead">Login</h2>
        <div className="pure-form">
          <input type="text" className="pure-input-rounded" placeholder="User Name Here" value={username}
                 onChange={::this.handleUserName}/>
          <button className="pure-button-primary" onClick={::this.handleLogin}>Login</button>
        </div>
      </div>
    );
  }
}
