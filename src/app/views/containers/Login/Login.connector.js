import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { action } from '../../../services/authService';

export default connect(
  state => ({
    user: state.auth.user
  }),
  {
    loadAuth: action('LOAD_AUTH'),
    login: action('LOGIN'),
    push
  }
);
