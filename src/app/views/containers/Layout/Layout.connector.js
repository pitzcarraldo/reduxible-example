import { connect } from 'react-redux';
import { toggleMenu } from '../../../services/menuService';
import { loadAuth } from '../../../services/authService';

export default connect(
  state =>
    ({
      path: state.routing.path,
      menuOpen: state.menu.menuOpen,
      user: state.auth.user
    }),
  {
    loadAuth,
    toggleMenu
  }
);
