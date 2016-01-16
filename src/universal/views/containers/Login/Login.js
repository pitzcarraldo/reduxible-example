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
    pushPath
  }
)
export default class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired
  };

  state = {
    username: ''
  };

  componentWillMount() {
    this.handleAuth(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.handleAuth(nextProps);
  }

  handleAuth(props) {
    const { user, pushPath } = props;
    if (user) {
      pushPath(`/profile`);
    }
  }

  handleUserName = ({ target: { value: username } }) => {
    this.setState({username});
  };

  handleLogin = (e) => {
    const { login } = this.props;
    login(this.state.username);
  };

  render() {
    const { username } = this.state;
    return (
      <div className="content">
        <div className='pure-g-valign-fix'>
          <h2 className="content-subhead">Login</h2>
          <div className="pure-form">
            <input type="text" className="pure-input-rounded" placeholder="User Name Here" value={username}
                   onChange={this.handleUserName}/>
            <button className="pure-button-primary" onClick={this.handleLogin}>Login</button>
          </div>
        </div>
      </div>
    );
  }
}
