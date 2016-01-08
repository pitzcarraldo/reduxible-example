import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { action } from '../../../services/home';

@connect(state => ({
  content: state.home.content
}), {
  loadContent: action('LOAD_CONTENT')
})
export default class Home extends Component {
  static propTypes = {
    content: PropTypes.object,
    loadContent: PropTypes.func
  };

  componentWillMount() {
    const { loadContent } = this.props;
    loadContent();
  }

  render() {
    const { content } = this.props;
    const lake = require('./imgs/lake.jpg');
    const mountain = require('./imgs/mountain.jpg');
    const tshirts = require('./imgs/t-shirt.jpg');
    const train = require('./imgs/train.jpg');
    return (
      <div className="content">
        <h2 className="content-subhead">{content.title}</h2>
        <p>{content.description}</p>

        <h2 className="content-subhead">Loot at this first</h2>
        <ul>
          <li>
            <a href="https://facebook.github.io/react">React</a>
          </li>
          <li>
            <a href="https://github.com/rackt/react-router">React-Router</a>
          </li>
          <li>
            <a href="https://github.com/rackt/redux">Redux</a>
          </li>
          <li>
            <a href="https://github.com/rackt/react-redux">React-Redux</a>
          </li>
          <li>
            <a href="https://github.com/rackt/redux-simple-router">Redux-Simple-Router</a>
          </li>
          <li>
            <a href="https://github.com/gaearon/redux-devtools">Redux-DevTools</a>
          </li>
        </ul>

        <h2 className="content-subhead">Webpack Isomorphic Image Loader Samples</h2>
        <div className="pure-g">
          <div className="pure-u-1-4">
            <img className="pure-img-responsive" src={lake} alt="Peyto Lake"/>
          </div>
          <div className="pure-u-1-4">
            <img className="pure-img-responsive" src={train} alt="Train"/>
          </div>
          <div className="pure-u-1-4">
            <img className="pure-img-responsive" src={tshirts} alt="T-Shirt Store"/>
          </div>
          <div className="pure-u-1-4">
            <img className="pure-img-responsive" src={mountain} alt="Mountain"/>
          </div>
        </div>
      </div>);
  }
}
