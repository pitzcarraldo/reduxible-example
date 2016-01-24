import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router';


export default function requireAuth(ComposedComponent) {
  class AuthComponent extends Component {
    static propTypes = {
      user: PropTypes.object,
      location: PropTypes.object,
      pushPath: PropTypes.func.isRequired
    };

    constructor(props) {
      super(props);
    }

    componentWillMount() {
      this.handleAuth(this.props);
    }

    componentWillReceiveProps(nextProps) {
      this.handleAuth(nextProps);
    }

    handleAuth(props) {
      const { user, pushPath } = props;
      if (!user) {
        pushPath(`/login?next=${this.props.location.pathname}`);
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }
  return connect(state =>({ user: state.auth.user }), { pushPath })(AuthComponent);
}
