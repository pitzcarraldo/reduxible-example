import { connect } from 'react-redux';
import { initialActions } from 'reduxible';
import { toggleMenu } from '../../services/menuService';
import { loadAuth } from '../../services/authService';

export const initializer = initialActions(loadAuth());
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
