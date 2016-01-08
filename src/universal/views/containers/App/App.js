import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Header, Footer, Nav } from '../../components/index';
import { action } from '../../../services/menu';

@connect(
  state =>
    ({
      path: state.routing.path,
      menuOpen: state.menu.menuOpen
    }),
  {
    toggleMenu: action('TOGGLE_MENU')
  }
)
export default class App extends Component {
  static propTypes = {
    menuOpen: PropTypes.bool,
    toggleMenu: PropTypes.func
  };

  toggleMenu(e) {
    e.preventDefault();
    this.props.toggleMenu(!this.props.menuOpen);
  }

  render() {
    const { menuOpen } = this.props;
    const active = menuOpen ? 'active' : '';
    return (
      <div id="layout" className={active}>
        <Nav active={active} toggleMenu={::this.toggleMenu} />
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
