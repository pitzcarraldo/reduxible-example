import React, { Component } from 'react';
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

export default class App extends Component {
  render() {
    require('../../../../styles/global.scss');
    return (
      <div id="layout">
        <Nav />
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
