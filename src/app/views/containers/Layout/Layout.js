import React, { Component, PropTypes } from 'react';
import { Header, Footer, Nav } from '../../components/index';
import connector, { initializer } from './Layout.connector';

@initializer
@connector
export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.object,
    path: PropTypes.string,
    menuOpen: PropTypes.bool,
    user: PropTypes.object,
    loadAuth: PropTypes.func,
    toggleMenu: PropTypes.func
  };

  componentDidMount() {
    const { loadAuth } = this.props;
    loadAuth();
  }

  toggleMenu = (event) => {
    event.preventDefault();
    this.props.toggleMenu(!this.props.menuOpen);
  };

  render() {
    const { menuOpen, user } = this.props;
    const active = menuOpen ? 'active' : '';
    return (
      <div id="layout!" className={active}>
        <Nav active={active} toggleMenu={this.toggleMenu} user={user} />
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
