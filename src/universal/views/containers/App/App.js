import React, { Component } from 'react';
import { connect } from 'react-redux';
//import normalize from 'normalize.css';
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Nav />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}