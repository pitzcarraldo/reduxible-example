import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Header, Footer, Nav } from '../../components/index';
import { action as menuAction } from '../../../services/menuService';
import { action as authAction } from '../../../services/authService';

@connect(
  state =>
    ({
      path: state.routing.path,
      menuOpen: state.menu.menuOpen
    }),
  {
    loadAuth: authAction('LOAD_AUTH'),
    toggleMenu: menuAction('TOGGLE_MENU')
  }
)
export default class Layout extends Component {
  static propTypes = {
    menuOpen: PropTypes.bool,
    toggleMenu: PropTypes.func
  };

  componentDidMount() {
    const { loadAuth } = this.props;
    loadAuth();
  }

  toggleMenu = (e) => {
    e.preventDefault();
    this.props.toggleMenu(!this.props.menuOpen);
  };

  render() {
    const { menuOpen } = this.props;
    const active = menuOpen ? 'active' : '';
    return (
      <div id="layout" className={active}>
        <Nav active={active} toggleMenu={this.toggleMenu} />
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
