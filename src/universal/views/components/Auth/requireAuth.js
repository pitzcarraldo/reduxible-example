import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updatePath } from 'redux-simple-router';


export default function requireAuth(ComposedComponent) {
  class AuthComponent extends Component {
    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      user: PropTypes.object,
      location: PropTypes.object
    };

    constructor(props) {
      super(props);
    }

    componentWillMount() {
      const { user, dispatch } = this.props;
      if (!user) {
        dispatch(updatePath(`/login?next=${this.props.location.pathname}`));
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }
  return connect(state =>({
    user: state.auth.user
  }))(AuthComponent);
}