import { connect } from 'react-redux';
import { action as authAction } from '../../../services/authService';


export default connect(
  state =>
    ({
      user: state.auth.user
    }),
  {
    logout: authAction('LOGOUT')
  }
);
