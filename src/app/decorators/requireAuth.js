import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export default function requireAuth(ComposedComponent) {
  class AuthComponent extends Component {
    static propTypes = {
      user: PropTypes.object,
      location: PropTypes.object,
      push: PropTypes.func.isRequired
    };

    componentDidMount() {
      this.handleAuth(this.props);
    }

    componentWillReceiveProps(nextProps) {
      this.handleAuth(nextProps);
    }

    handleAuth(props) {
      if (!props.user) {
        props.push(`/login?next=${this.props.location.pathname}`);
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }
  return connect(state => ({ user: state.auth.user }), { push })(AuthComponent);
}
