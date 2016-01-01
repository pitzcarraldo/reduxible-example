import React, { Component } from 'react';
import { GithubButton } from '../../components/index';

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1>Reduxible</h1>
        <h2>Make React Redux Application Simpler</h2>
        <div>
          <GithubButton user="Pitzcarraldo"
                        repo="reduxible"
                        type="star"
                        width={130}
                        height={30}
                        count large/>
          <GithubButton user="Pitzcarraldo"
                        repo="reduxible"
                        type="fork"
                        width={130}
                        height={30}
                        count large/>
        </div>
      </header>
    );
  }
}
