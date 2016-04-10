import { connect } from 'react-redux';
import { logout } from '../../services/authService';

export default connect(
  state =>
    ({
      user: state.auth.user
    }),
  {
    logout
  }
);
