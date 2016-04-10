import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { loadAuth, login } from '../../services/authService';

export default connect(
  state => ({
    user: state.auth.user
  }),
  {
    loadAuth,
    login,
    push
  }
);
