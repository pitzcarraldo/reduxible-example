import React, { Component } from 'react';
import { GithubButton } from '../../components/index';

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1>Reduxible</h1>
        <h2>The LTS Universal Framework for React + Redux</h2>
      </header>
    );
  }
}
