import { connect } from 'react-redux';
import { action as menuAction } from '../../../services/menuService';
import { action as authAction } from '../../../services/authService';

export default connect(
  state =>
    ({
      path: state.routing.path,
      menuOpen: state.menu.menuOpen,
      user: state.auth.user
    }),
  {
    loadAuth: authAction('LOAD_AUTH'),
    toggleMenu: menuAction('TOGGLE_MENU')
  }
);
