import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router';

export default function requireAuth(ComposedComponent) {
  class AuthComponent extends Component {
    static propTypes = {
      user: PropTypes.object,
      location: PropTypes.object,
      push: PropTypes.func.isRequired
    };

    componentWillMount() {
      this.handleAuth(this.props);
    }

    componentWillReceiveProps(nextProps) {
      this.handleAuth(nextProps);
    }

    handleAuth(props) {
      const { user, push } = props;
      if (!user) {
        push(`/login?next=${this.props.location.pathname}`);
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }
  return connect(state => ({ user: state.auth.user }), { push: pushPath })(AuthComponent);
}
