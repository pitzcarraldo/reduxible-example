import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Nav extends Component {
  render() {
    return (
      <div>
        <Link to="home">Home</Link>
        <Link to="counter">Counter</Link>
        <Link to="about">About</Link>
      </div>
    );
  }
}
