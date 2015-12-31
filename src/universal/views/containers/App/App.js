import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import { action } from '../../../reducer/menu';

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
    require('../../../../styles/global.scss');
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
